async function grep(source, destination, pattern, encoding="utf8")
{
	// set up the encoding rule
	source.setEncoding(encoding);
	
	// set error handler
	destination.on("error", err => process.exit());
	
	// track lines that don't end with a newline
	let incompleteLine = "";
	
	// use a for/wait loop to asynchronously read chunks from the input stream
	for await (let chunk of source) {
		// split the end of the last chunk plus this one into lines
		let lines = (incompleteLine + chunk).split("\n");

		// assuming the last line is incomplete
		incompleteLine = lines.pop();

		// loop through the lines and write any matches to the destination
		for (let line of lines)
			if (pattern.test(line)) {
					destination.write(line + "\n", encoding);
			}
	}
	
	// finally, check for a match on any trailing text
	if (pattern.test(incompleteLine)) {
		destination.write(incompleteLine + "\n", encoding);
	}
}

let pattern = new RegExp(process.argv[2]);
grep(process.stdin, process.stdout, pattern)
	.catch(err => {
			console.error(err);
			process.exit();
	});
