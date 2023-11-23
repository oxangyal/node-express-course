require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const mainRoutes = require("./routes/main");
const errorHandler = require("./middleware/error-handler");

app.use(express.static("./public/index.js"));
app.use("/", express.static("./public/"));
app.use(express.json());
// app.get("/", (req, res) => {
//     res.send(
//         "<h1>Logon</h1><form onSubmit={submit}> Login<input> </input>Password<input></input><button></button></form>"
//     );
// });
app.use("/api/v1", mainRoutes);


const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
