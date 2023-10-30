const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
// const { products, people } = require("./data");
const logger = require("./middleware/logger");
const auth = require("./routes/auth");
const authMid = require("./middleware/auth");

//imports routes
const peopleRouter = require("./routes/people");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");

// middleware for static assets and parsing
// app.use(express.static("./public"));
app.use(express.static("./methods-public"));
// custom middleware
app.use(logger);
//invoke middleware with app.get() statement
app.get("/", logger, (req, res) => {
    console.log("Hello via get");
    res.send("hello world");
});

// The second way to invoke middleware is via an app.use() statement:
// app.use(["/path1", "/path2"], logger);

// parse form data
app.use(express.urlencoded({ extended: false }));
// parse form json
app.use(express.json());
//Parse cookies
app.use(cookieParser());

// POST route to log in
app.post("/login", (req, res) => {
    if (!req.body.name) {
        res.status(400).json({
            success: false,
            message: "Please provide a name",
        });
    } else {
        res.status(201).send(`Welcome ${req.body.name}`);
    }
});

// API routes
app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/auth", authRouter);

app.get("/test", authMid, (req, res) => {
    res.status(200).json({ message: `Welcome to the user, ${req.user}!` });
});

//catch all for 404 
app.all("*", (req, res) => {
    res.status(404).send("<h1>Page not found</h1>");
});

const server = http.createServer(app);

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
