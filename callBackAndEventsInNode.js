// Node
const fs = require("fs");
let options = {};

fs.readFile("config.json", "utf-8", (err, text) => {

    if (err) {
        console.warm("Could not read config file", err);
    }
    else {
        Object.assign(options, JSON.parse(text));
    }

    // start running the program
    startProgram(options);
});

const https = require("https");

function getText(url, callback) {

    // start an HTTP GET request for the URL
    request = https.get(url);

    // register a function to handle the response event
    request.on("response", response => {

        // The response means that response headers have been received
        let httpStatus = response.statusCode;

        response.setEncoding("utf-8");
        let body = "";

        // event handler is called when the chunk of the body is ready
        response.on("data", chunk => {body += chunk});

        // event handler is called when the response is complete
        response.on("end", () => {

            if (httpStatus === 200)
                callback(null, body);
            else
                callback(httpStatus, null);
        });
    });

    request.on("error", (err) => {
        callback(err, null);
    });
}