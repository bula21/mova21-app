import React, {useState} from 'react';
import WebView, {WebViewNavigation} from "react-native-webview";

export default function MovaWebView({ html }: { html: string}) {

	const [height, setHeight] = useState<number>(200);

	// listen for height changes
	function onNavigationChange(event: WebViewNavigation) {
		if (event.title) {
			setHeight(Number(event.title)); //convert to number
		}
	}

	function wrapHtml(html: string): string {
		let wrapped: string = `
		<html>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
			<style>
			@font-face {
				font-family: MessinaSansWeb-Bold;
				src: url(https://www.mova.ch/wp-content/themes/bula21/fonts/MessinaSansWeb-Bold.woff2);
			}
			body, html {
				margin: 0;
				padding: 0;
				font-family: "MessinaSansWeb-Bold",sans-serif;
				font-size: 14px;
			}
			#height-calculator {
				margin: 0;
				padding: 0;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
			}
			h1 {
				font-size: 38px;
			}
			</style>
		</head>
		<body>
			${html}
			<script>
				// workaround for auto height
				var hash = 1;
				function updateHeight() {
					var body = document.body;
					var html = document.documentElement;
					var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
					document.title = String(height);
					window.location.hash = String(hash++);
				}
				updateHeight();
			</script>
		</body>
		</html>
		`;
		return wrapped;
	}

	return <WebView
		originWhitelist={['*']}
		source={{ html: wrapHtml(html) }}
		style={{height: height}}
		javaScriptEnabled={true}
		onNavigationStateChange={onNavigationChange}
	/>
}
