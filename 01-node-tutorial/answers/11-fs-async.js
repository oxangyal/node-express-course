const { writeFile } = require("fs");

console.log("at start");

const filePath = "./temporary/fileB.txt";

writeFile(filePath, "This is line 1\n", (err, result) => {
    console.log("at point 1");
    if (err) {
        console.log("This error happened: ", err);
    } else {
        console.log("at point 1");

        writeFile(
            filePath,
            "This is line 2, appended.\n",
            { flag: "a" },
            (err) => {
                if (err) {
                    console.error("This error happened: ", err);
                } else {
                    console.log("at point 2");

                    writeFile(
                        filePath,
                        "This is line 3, also appended.\n",
                        { flag: "a" },
                        (err) => {
                            if (err) {
                                console.error("This error happened: ", err);
                            } else {
                                console.log("at point 3");
                                console.log("File is completed.");
                            }
                        }
                    );
                }
            }
        );
    }
});

console.log("at end");
