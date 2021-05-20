import handleRequestDiscover from './features/discover/demo/discover-api.js';
import http from 'http';
import proxy from 'koa-proxies';

const server = http.createServer((request, response) => {
	handleRequestDiscover(request, response);
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
