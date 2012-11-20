var http = require("http");

module.exports = (function (api_key, options) {

	if (typeof api_key == undefined)  {
		throw("You must provide your yardstick API key");
	}
	if (typeof options === 'undefined')  { options = {}; }
	if (options.ssl && options.ssl !== true) { options.ssl = false; }

	return {
		track: function (evnt, callback) {

			var yardstick_headers = {
				"Accept":  "application/json",
				"Content-Type":  "application/json",
				"User-Agent": "yardstick/1.0.0 (YardstickNodeJs)"
				"X-Yardstick-Token": api_key
			}

			var req = http.request({
				host: "api.yardstick.it",
				path: "/metrics",
				method: "POST",
				headers: yardstick_headers,
				port: (options.ssl ? 443 : 80)
			}
			, function (response) {
				var body = "";
				response.on("data", function (i) { body += i; })
				response.on("end", function () {
					if (response.statusCode == 200) {
						if (callback) {
							callback(JSON.parse(body));
						}
					} else {
						if (callback) {
							var data = JSON.parse(body);
							callback({
								status: response.statusCode,
								data: data
							});
						}
					}
				});

				req.on('error', function(err) {
					if (options.fail && options.fail === typeof('Function')) {
						options.fail(err);
					}
				});
			});

			req.write(JSON.stringify(evnt));
			req.end();
		}
	}
});