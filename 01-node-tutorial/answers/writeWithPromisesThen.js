const { writeFile, readFile } = require("fs").promises;

const filePath = "./temporary/temp.txt";

console.log("Start writing to the file...");

writeFile(filePath, "This is the first file line.\n")
    .then(() => {
        // console.log("First file line is written.");
        return writeFile(filePath, "This is the second line.\n", { flag: "a" });
    })
    .then(() => {
        // console.log("Scond file line is written.");
        return writeFile(filePath, "This is the third line.\n", { flag: "a" });
    })
    .then(() => {
        // console.log("Third file line is written.");
        return readFile(filePath, "utf-8");
    })
    .then((result) => console.log(result))
    .catch((err) => {
        console.error("An error occurred while writing to the file:", err);
    });
