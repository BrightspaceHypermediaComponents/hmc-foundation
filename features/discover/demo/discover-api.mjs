import fs from 'fs';

export const handleDiscoverRequests = function(request, response) {

	// Emulates the discover-search match count changing via basing it on the length of the request body.
	// This isn't a perfect 1:1 as conditions would decrease, not increase, when added, but simulates the user experience.
	if (request.url === '/api/match-count') {
		response.writeHead(200, {
			'Content-Type': 'application/json'
		});

		let requestBody = '';
		request.on('readable', () => {
			requestBody += request.read();
		});
		request.on('end', () => {
			fs.readFile('features/discover/demo/match-count.json', 'utf8', (err, content) => {
				content = content.replace('_countValue', requestBody.length.toString());
				response.write(content);
				response.end();
			});
		});
	}
};
