const { createReadStream } = require("fs");
let counter = 0;
const stream = createReadStream("../content/big.txt", {
    highWaterMark: 200,
    encoding: "utf8",
});
stream.on("data", (result) => {
    counter++;
    console.log(result);
});
stream.on("end", () => {
    console.log(`Number of chunks: ${counter}`);
});
stream.on("error", (err) => console.log(err));
