<?php

$method = $_SERVER['REQUEST_METHOD'];

$headers = getallheaders();
$contentType = $headers['Content-Type'] ?? 'Content-Type not set';


$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

var_dump($method);
var_dump($contentType);
var_dump($data);
