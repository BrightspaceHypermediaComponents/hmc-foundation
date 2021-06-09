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
			const body = request.read();
			if (body != null)  {
				requestBody += body;
			}
		});
		request.on('end', () => {
			let requestObj = JSON.parse(requestBody.toString());
			let responseFile;
			let countValue;
			if (requestObj.includeUsers) {
				responseFile = 'features/discover/demo/match-count-users.json'
				countValue = requestBody.length - 30; //Remove the length variation between the two files
			} else {
				responseFile = 'features/discover/demo/match-count.json'
				countValue = requestBody.length;
			}

			fs.readFile(responseFile, 'utf8', (err, content) => {
				content = content.replace('_countValue', countValue.toString());
				response.write(content);
				response.end();
			});
		});
	}
};

