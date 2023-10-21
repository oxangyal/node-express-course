const http = require("http");
const express = require("express");
const app = express();
const { products, people } = require("./data");
const logger = require("./logger");


app.use(express.static("./public"));
// app.use(express.static("./methods-public"));
app.use(logger);

//invoke middleware with app.get() statement
app.get("/", logger, (req, res) => {
    console.log("Hello via get");
    res.send("hello world");
});

// The second way to invoke middleware is via an app.use() statement:
// app.use(["/path1", "/path2"], logger);

app.get("/api/v1/people", (req, res) => {
    res.status(200).json({ success: true, data: people });
});

// parse form data
app.use(express.urlencoded({ extended: false }));
// parse form json
app.use(express.json());

const getMaxId = () => {
    return people.reduce((ret, cur) => (ret < cur.id ? cur.id : ret), 0);
};

app.post("/api/v1/people", (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: "Please provide a name" });
    }

    newId = getMaxId() + 1;
    people.push({ id: newId, name: req.body.name });
    res.status(201).json({ success: true, name: name, id: newId });
});

app.get("/api/v1/test", (req, res) => {
    res.status(200).json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
    res.status(200).json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);

    if (!product) {
        res.status(404).json({ message: "This product does't exist" });
    } else {
        res.status(200).json(product);
    }
});

app.get("/api/v1/query", (req, res) => {
    console.log(req.query);
    const { search, limit, priceLess } = req.query;
    let sortedItems = [...products];

    if (search) {
        sortedItems = sortedItems.filter((product) => {
            return product.name.startsWith(search);
        });
    }

    if (limit) {
        sortedItems = sortedItems.slice(0, Number(limit));
    }

    if (priceLess) {
        sortedItems = sortedItems.filter((product) => {
            return product.price < priceLess;
        });
    }

    if (sortedItems.length < 1) {
        return res.status(200).json({ success: true, data: [] });
    }
    return res.status(200).json(sortedItems);
});

app.use((req, res) => {
    res.status(404).send("Page not found");
});

const server = http.createServer(app);

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
