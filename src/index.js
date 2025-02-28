/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Authenticate } from "./auth";
import { renderHTML } from "./html";
import { repos } from "./projects";


const moduleVersionRegex = /^\/([a-zA-Z0-9./\-_!@]+)\/@v\/([a-zA-Z0-9.\-+]+)\.(info|mod|zip)$/;
const moduleListRegex = /^\/([a-zA-Z0-9./\-_!@]+)\/@v\/list$/;
const GoProxyServer = "https://proxy.golang.org";

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const domainName = url.host;
		const path = url.pathname;
		if (path === "/") {
			return renderHTML("home");
		}
		const repoInfo = repos[path];
		if (repoInfo === undefined) {
			const targetURL = url.pathname.substring(1);

			if (moduleVersionRegex.test(path) === false && moduleListRegex.test(path) === false) {
				const out = {
					url
				}
				return renderHTML("404");;
			}

			const proxy = `${GoProxyServer}/${targetURL}`;
			const response = await fetch(proxy, {
				method: request.method,
				headers: request.headers, // Forward all headers
				body: request.body,       // Forward the request body (if any)
				redirect: 'follow', // Important: Follow redirects
			});

			// Create a new response, copying headers from the target response
			const modifiedResponse = new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
			});
			modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

			return modifiedResponse;
		}

		// Check if repo need to authenticate
		if (repoInfo.hasAuth === true) {
			const authHeader = request.headers.get('Authorization');
			if (!authHeader || !Authenticate(authHeader, repoInfo.auth)) {
				return new Response('Unauthorized', {
					status: 401,
					headers: {
						'WWW-Authenticate': 'Basic realm="GoProxy-CFworker Realm"',
					},
				});
			}
		}

		const vcs = repoInfo["vcs"];
		const repo = repoInfo["repo"];
		const goImportMetaTag = `<meta name="go-import" content="${domainName}${path} ${vcs} ${repo}">`;
		const html = `<!DOCTYPE html><html><head>${goImportMetaTag}</head><body>go-import for ${domainName}${path}</body></html>`;
		return new Response(html, {
			headers: {
				'Content-Type': 'text/html',
			},
		});
	},
};
