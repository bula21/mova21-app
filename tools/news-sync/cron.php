<?php

include('vendor/autoload.php');
include('secret.php');

use League\HTMLToMarkdown\HtmlConverter;

// Config
const MOVA_WP_URL = 'https://www.mova.ch/wp-json/wp/v2/posts';
const DIRECTUS_URL = 'https://app-backend.mova.ch';

$log = [];

function logAction($action) {
	global $log;
	$log[] = $action;
}

function http_get_json($url) {
	$client = new GuzzleHttp\Client();
	$res = $client->request('GET', $url);
	if ($res->getStatusCode() !== 200) {
		throw new Exception('Invalid Response from Wordpress: '. $res->getStatusCode() . ' ' . $res->getBody());
	}
	return json_decode($res->getBody(), true);
}

function html2markdown($html) {
	$converter = new HtmlConverter();
	$converter->getConfig()->setOption('strip_tags', true);
	return $converter->convert($html);
}

function update_news_in_directus($news_id, $data) {
	logAction('updating news '.$news_id);
	$client = new GuzzleHttp\Client();
	$res = $client->patch(DIRECTUS_URL . '/items/news/'.$news_id.'?access_token=' . DIRECTUS_API_TOKEN, [GuzzleHttp\RequestOptions::JSON => $data]);
	if ($res->getStatusCode() !== 200) {
		throw new Exception('Update News: Invalid Response from Directus: '. $res->getStatusCode() . ' ' . $res->getBody());
	}
}

function create_news_in_directus($data) {
	logAction('creating news');
	$client = new GuzzleHttp\Client();
	$res = $client->post(DIRECTUS_URL . '/items/news?access_token=' . DIRECTUS_API_TOKEN, [GuzzleHttp\RequestOptions::JSON => $data]);
	if ($res->getStatusCode() !== 200) {
		throw new Exception('Create News: Invalid Response from Directus: '. $res->getStatusCode() . ' ' . $res->getBody());
	}
}

function archive_news_in_directus($news_id) {
	logAction('archiving news: ' . $news_id);
	$client = new GuzzleHttp\Client();
	$res = $client->patch(DIRECTUS_URL . '/items/news/'.$news_id.'?access_token=' . DIRECTUS_API_TOKEN, [GuzzleHttp\RequestOptions::JSON => ['status' => 'archived']]);
	if ($res->getStatusCode() !== 200) {
		throw new Exception('Archive News: Invalid Response from Directus: '. $res->getStatusCode() . ' ' . $res->getBody());
	}
}

function import_image($url, $wp_image_id) {
	logAction('importing image: '.$url);
	$client = new GuzzleHttp\Client();
	$data = [
		'url' => $url,
		'data' => [
			'folder' => 'c65cdabf-b37f-45db-bf17-25a8c8f102bf',
			'title' => 'WP Image ' . $wp_image_id
		]
	];
	$res = $client->post(DIRECTUS_URL . '/files/import?access_token=' . DIRECTUS_API_TOKEN, [GuzzleHttp\RequestOptions::JSON => $data]);
	if ($res->getStatusCode() !== 200) {
		throw new Exception('Image Import: Invalid Response from Directus: '. $res->getStatusCode() . ' ' . $res->getBody());
	}
	$response = json_decode((string)$res->getBody(), true);
	return $response['data']['id'];
}


$languages = ['de', 'fr', 'it', 'en'];

$total_posts = 0;
$created_count = 0;
$updated_count = 0;
$archived_count = 0;

foreach ($languages as $lang) {
	$data = http_get_json(MOVA_WP_URL . '?_embed=true&lang=' . $lang);
	$directus_posts_response = http_get_json(DIRECTUS_URL . '/items/news?access_token=' . DIRECTUS_API_TOKEN . '&filter[language][_eq]=' .$lang);
	$existing_posts = $directus_posts_response['data'];
	$all_wp_post_ids = [];
	if (count($data)) {
		foreach ($data as $entry) {
			$total_posts++;
			$all_wp_post_ids[] = $entry['id'];
			$existingPost = null;
			foreach ($existing_posts as $ep) {
				if ($ep['wp_post_id'] && $ep['wp_post_id'] == $entry['id']) {
					$existingPost = $ep;
				}
			}
			if ($existingPost) {
				// update if needed
				$newContent = html2markdown($entry['content']['rendered']);
				$newExcerpt = html2markdown($entry['excerpt']['rendered']);
				if (
					$existingPost['language'] !== $lang or
					$existingPost['title'] !== html_entity_decode($entry['title']['rendered']) or
					$existingPost['content'] !== $newContent or
					$existingPost['excerpt'] !== $newExcerpt or
					$existingPost['date'] !== date('Y-m-d\TH:i:s', strtotime($entry['date'])) or
					$existingPost['image_wp_id'] !== $entry['featured_media'] or
					$existingPost['status'] === 'archived'
				) {
					// update post
					$data = [
						"status" => 'published',
						"date" => date('Y-m-d\TH:i:s', strtotime($entry['date'])),
						"wp_post_id" => $entry['id'],
						"language" => $lang,
						"title" => html_entity_decode($entry['title']['rendered']),
						"content" => $newContent,
						"excerpt" => $newExcerpt,
						"image_wp_id" => $entry['featured_media'],
						"image" => null
					];

					// only update image if needed
					if ($existingPost['image_wp_id'] !== $entry['featured_media'] || ($entry['featured_media'] && !$existingPost['image_wp_id'])) {
						$file = null;
						if (isset($entry['_embedded']['wp:featuredmedia'][0]['source_url'])) {
							$image_url = $entry['_embedded']['wp:featuredmedia'][0]['source_url'];
							$fileId = import_image($image_url, $entry['featured_media']);
							$data['image_wp_id'] = $entry['featured_media'];
							$data['image'] = $fileId;
						} else {
							$data['image_wp_id'] = $entry['featured_media'];
							$data['image'] = null;
						}
					}
					update_news_in_directus($existingPost['id'], $data);
					$updated_count++;
				}
			} else {
				$data = [
					"status" => "published",
					"date" => date('Y-m-d\TH:i:s', strtotime($entry['date'])),
					"wp_post_id" => $entry['id'],
					"language" => $lang,
					"title" => html_entity_decode($entry['title']['rendered']),
					"content" => html2markdown($entry['content']['rendered']),
					"excerpt" => html2markdown($entry['excerpt']['rendered']),
				];

				// load first featured media image
				if (isset($entry['_embedded']['wp:featuredmedia'][0]['source_url'])) {
					$image_url = $entry['_embedded']['wp:featuredmedia'][0]['source_url'];
					$fileId = import_image($image_url, $entry['featured_media']);
					$data['image'] = $fileId;
					$data['image_wp_id'] = $entry['featured_media'];
				}

				create_news_in_directus($data);
				$created_count++;
			}
		}
	}

	// set deleted posts as archived
	foreach ($existing_posts as $ep) {
		if (
			$ep['wp_post_id'] &&
			$ep['status'] === 'published' &&
			!in_array(intval($ep['wp_post_id']), $all_wp_post_ids)
		) {
			archive_news_in_directus($ep['id']);
			$archived_count++;
		}
	}
}

// return stats
echo json_encode(['posts' => $total_posts, 'created' => $created_count, 'updated' => $updated_count, 'archived' => $archived_count]);

echo "\n";
echo implode("\n", $log);
