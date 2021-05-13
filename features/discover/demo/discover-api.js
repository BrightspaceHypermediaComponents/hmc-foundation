const fs = require('fs');

module.exports.handleRequest = function(request, response){
	if (request.url === '/api/match-count') {
		response.writeHead(200, {
			'Content-Type': 'application/json'
		});

		fs.readFile('features/discover/demo/match-count.json', function(err, content){
			response.write(content);
			response.end();
		});
	}
}

