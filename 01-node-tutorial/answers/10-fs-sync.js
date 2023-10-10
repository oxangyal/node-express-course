const { readFileSync, writeFileSync } = require("fs");

const filePath = "./temporary/fileA.txt";

const first = readFileSync("./content/first.txt");
const second = readFileSync("./content/second.txt");
const third = readFileSync("./content/third.txt");

writeFileSync(filePath, `${first}\n`);
writeFileSync(filePath, `${second}\n`, { flag: "a" });
writeFileSync(filePath, `${third}\n`, { flag: "a" });

const total = readFileSync(filePath, "utf8");
console.log(total);
