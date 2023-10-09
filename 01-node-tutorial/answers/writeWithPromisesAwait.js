const { writeFile, readFile } = require("fs").promises;

const filePath = "./temporary/temp.txt";

const writer = async () => {
    try {
        await writeFile(filePath, "This is the first file line.\n");
        await writeFile(filePath, "This is the second file line.\n", {
            flag: "a",
        });
        await writeFile(filePath, "This is the third file line.\n", {
            flag: "a",
        });

        console.log("Writing the file is done");
    } catch (error) {
        console.error("An error occurred while writing to the file:", error);
    }
};

const reader = async () => {
    try {
        const fileContent = await readFile(filePath, "utf-8");
        console.log("File contains:\n", fileContent);
    } catch (error) {
        console.error("An error occurred while writing to the file:", error);
    }
};

const readWrite = async () => {
    try {
        await writer();
        await reader();
        console.log("Writing and reading files are done");
    } catch (err) {
        console.error("An error occurred:", err);
    }
};

readWrite();
