const https = require('https');


function postJSON(host, endpoint, body, port, username, password)
{

    return new Promise((resolve, reject) {

        let bodyText = JSON.stringify(body);

        let requestOptions = {
            method: POST,
            host: host,
            path: endpoint,
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(bodyText)
            }
        };

        if (port) {
            requestOptions.port = port;
        }

        if (username && password) {
            requestOptions.auth = `${username}: ${password}`;
        }

        let request = https.request(requestOptions);

        request.write(bodyText);
        request.end();

        request.on("error", e => reject(e));

        request.on("response", response => {

            if (response.statusCode !== 200) {
                reject(new Error(`HTTP status ${response.statusCode}`));

                response.resume();
                return;
            }

            response.setEncoding("utf-8");

            let body = "";
            response.on("data", chunk => {body += chunk;});

            response.on("end", () => {
                try {
                    resolve(JSON.parse(body));
                }
                catch(e) {
                    reject(e);
                }
            });
        });
    });
}

/**
 * The code that follows creates a simple HTTP server that serves static files from the
local filesystem and also implements a debugging endpoint that responds to a client’s
request by echoing that request.
 */
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");


function serve(rootDirectory, port) {
    let server = new http.Server();
    server.listen(port);
    console.log("listening on port", port);

    server.on("request", (request, response) => {

        let endpoint = url.parse(request.url).pathname;

        if (endpoint == "/test/mirrow") {
            response.setHeaders("Content-Type", "text/plain; charset=UTF-8");

            // specify response status code
            response.writeHead(200);

            // begin the response body with the request
            response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);

            // output the request headers
            let headers = request.rawHeaders;
            for (let i = 0; i < headers.length; i += 2) {
                response.write(`${headers[i]}: ${headers[i+1]}\r\n`);
            }

            // output the request headers
            response.write("\r\n");

            response.pipi(response);

            //... to be continued
        }
    });
}