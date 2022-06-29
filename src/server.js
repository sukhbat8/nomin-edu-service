const express = require("express");
require("dotenv").config();
require("./configs/mongodb");
const userRouter = require("./routers/userRouter");
const lessonRouter = require("./routers/lessonRouter");
const trainingRouter = require("./routers/trainingRouter");
const timeRouter = require("./routers/timeRouter");
const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/api/user", userRouter);
app.use("/api/lesson", lessonRouter);
app.use("/api/training", trainingRouter);
app.use("/api/time", timeRouter);
app.get("/", (req, res) => {

    res.send("Welcome to MyWork");
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log(`Start listening on port ${port}!`);
});