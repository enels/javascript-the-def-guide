const fs = require("fs");
const zlib = require("zlib");


function callback(msg)
{
	
	if (msg === "error")
		console.log("Error compressing file");
	else if (msg === "finish")
		console.log("Finish compressing file");
}

function gzip(filename, callback)
{
	// create the streams
	let source = fs.createReadStream(filename);
	let destination = fs.createWriteStream(filename + ".gz");
	let gzipper = zlib.createGzip();

	// Set up the pipeline
	source
		.on("error", callback)
		.pipe(gzipper)
		.on("error", callback)
		.on("finish", callback);
}

gzip("samplefile.txt", callback);
