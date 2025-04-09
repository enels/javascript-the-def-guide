const fs = require('fs');


// sychronously reading a file
let buffer = fs.readFileSync('testdata.txt');
let text = fs.readFileSync('data.csv', 'utf-8');

// Read the bytes of the file asychronously
fs.readFile("testdata.txt", (err, bufffer) => {
    if (err) {
        // handle error
    }
    else {
        // bytes of files are in buffer
        for (let i = 0; i < buffer.length; i++){
            console.log(buffer[i]);
        }
    }
});

function processFileText(buffer) {
    console.log(`Buffer Length: ${buffer.length}`);
}

function handReadError(err){
    console.log("There was an error", err);

}

// promise based asynchronous read
fs.promises
    .readFile("data.csv", "utf-8")
    .then(processFileText)
    .catch(handReadError);

// Or use the Promise API with await inside an async function
async function processText(filename, encoding="utf-8") {
    let text = await fs.promises.readFile(filename, encoding);
    // ... process the text here
}
const path = require('path');
//Writing files
let settings = {
    males: [
        {id: 1, fname: "enoma", lname: "uwaifo", complexion: "fair"},
        {id: 1, fname: "Moses", lname: "Asemota", complexion: "dark"}
    ],
    
    females: [
        {id: 1, fname: "Magdalene", lname: "Asemota", complexion: "dark"},
        {id: 1, fname: "Magdalene", lname: "Asemota", complexion: "dark"}
    ]
};
fs.writeFileSync(path.resolve(__dirname, "settings.json"), JSON.stringify(settings));

// check settings
console.log(settings);

// using writeable stream
let output = fs.createWriteStream("numbers.txt");
for (let i = 0; i < 100; i++) {
    output.write(`${i}\n`);
}
output.end();

fs.copyFileSync("workingWithFiles.js", "duplicateThisFile.js");