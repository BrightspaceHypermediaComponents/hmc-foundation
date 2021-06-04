import { handleDiscoverRequests } from './features/discover/demo/discover-api.mjs';
import http from 'http';
import proxy from 'koa-proxies';

const server = http.createServer((request, response) => {
	handleDiscoverRequests(request, response);
});

server.listen(9000);

export default {
	port: 8000,
	middleware: [
		proxy('/api/', {
			target: 'http://localhost:9000/',
		}),
	],
};
