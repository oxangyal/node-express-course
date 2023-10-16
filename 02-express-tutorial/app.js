const http = require("http");
const express = require("express");
const app = express();
const { products } = require("./data");

app.use(express.static("./public"));

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
