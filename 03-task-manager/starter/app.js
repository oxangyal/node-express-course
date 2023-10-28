const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
require("dotenv").config();

//middleware
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
    res.send("Task manager app");
});

app.get("api/v1/tasks"); //get all tasks

app.use("/api/v1/tasks", tasks);

//app.post('api/v1/tasks') //-create a new task
//app.get('api/v1/tasks/:id') //-get single task
//app.patch('api/v1/tasks/:id')  //-update the task
//app.delete('api/v1/tasks/:id') //-delete task

const port = 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};
start();
