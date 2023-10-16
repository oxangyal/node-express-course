const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
    const decode = new StringDecoder("utf-8");
    let body = "";
    req.on("data", function (data) {
        body += decode.write(data);
    });
    req.on("end", function () {
        body += decode.end();
        const body1 = decodeURI(body);
        const bodyArray = body1.split("&");
        const resultHash = {};
        bodyArray.forEach((part) => {
            const partArray = part.split("=");
            resultHash[partArray[0]] = partArray[1];
        });
        callback(resultHash);
    });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Select your color:";
let selectedColor = "";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.  <input name="item"></input>
const form = () => {
    return `
<body>

<form method="POST">
    <p>${item}</p>
    <p style="background-color: ${selectedColor}; width: 100px; height: 50px; display: flex; align-items: center; justify-content: center;">${selectedColor.toUpperCase()}</p>
        <select name="color" id="colors">
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
        </select>
<button type="submit">Submit</button>
</form>
</body>
`;
};

const server = http.createServer((req, res) => {
    console.log("req.method is ", req.method);
    console.log("req.url is ", req.url);
    if (req.method === "POST") {
        getBody(req, (body) => {
            console.log("The body of the post is ", body);
            // here, you can add your own logic
            if (body["color"]) {
                selectedColor = body["color"];
            } else {
                selectedColor = "white";
            }
            // Your code changes would end here
            res.writeHead(303, {
                Location: "/",
            });
            res.end();
        });
    } else {
        res.end(form());
    }
});
server.on("request", (req) => {
    console.log("event received: ", req.method, req.url);
});
console.log(
    "This text will restart the program by Nodemon because this file has changed."
);
const port = 3000;
server.listen(port);
console.log(`The server is listening on port ${port}.`);
console.log("Added text into this file");
