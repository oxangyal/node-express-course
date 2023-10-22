const http = require("http");
const express = require("express");
const app = express();
// const { products, people } = require("./data");
const logger = require("./logger");
const peopleRouter = require("./routes/people");
const productsRouter = require("./routes/products");

// app.use(express.static("./public"));
app.use(express.static("./methods-public"));
app.use(logger);

//invoke middleware with app.get() statement
app.get("/", logger, (req, res) => {
    console.log("Hello via get");
    res.send("hello world");
});

// The second way to invoke middleware is via an app.use() statement:
// app.use(["/path1", "/path2"], logger);

// app.get("/api/v1/people", (req, res) => {
//     res.status(200).json({ success: true, data: people });
// });

// parse form data
app.use(express.urlencoded({ extended: false }));
// parse form json
app.use(express.json());

app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/products", productsRouter);

// app.get("/api/v1/test", (req, res) => {
//     res.status(200).json({ message: "It worked!" });
// });

// app.get("/api/v1/products", (req, res) => {
//     res.status(200).json(products);
// });

// app.get("/api/v1/products/:productID", (req, res) => {
//     const idToFind = parseInt(req.params.productID);
//     const product = products.find((p) => p.id === idToFind);

//     if (!product) {
//         res.status(404).json({ message: "This product does't exist" });
//     } else {
//         res.status(200).json(product);
//     }
// });

// app.get("/api/v1/query", (req, res) => {
//     console.log(req.query);
//     const { search, limit, priceLess } = req.query;

//     if (search) {
//         sortedItems = sortedItems.filter((product) => {
//             return product.name.startsWith(search);
//         });
//     }

//     if (limit) {
//         sortedItems = sortedItems.slice(0, Number(limit));
//     }

//     if (priceLess) {
//         sortedItems = sortedItems.filter((product) => {
//             return product.price < priceLess;
//         });
//     }

//     if (sortedItems.length < 1) {
//         return res.status(200).json({ success: true, data: [] });
//     }
//     return res.status(200).json(sortedItems);
// });

// app.use((req, res) => {
//     res.status(404).send("Page not found");
// });

const server = http.createServer(app);

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
