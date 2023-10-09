const EventEmitter = require("events");

const fs = require("fs");
const emitter = new EventEmitter();
//emit timer event
setInterval(() => {
    emitter.emit("timer", "hi there");
}, 2000);

emitter.on("timer", (msg) => {
    console.log(msg);
});
//emit a "fileData" event with the file content
const filePath = "./temporary/temp.txt";

fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    emitter.emit("fileData", data);
});

emitter.on("fileData", (fileContent) => {
    console.log("File contains:\n", fileContent);
});
//emit the "start" event with values 1 and 100
emitter.on("start", (start, end) => {
    console.log(`started from ${start} to ${end}`);
});

emitter.emit("start", 1, 100);
