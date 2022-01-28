const express = require("express");
const router = require("./routers");
const { connectToDb } = require("./database");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use("/assets", express.static('assets'));
connectToDb();

app.listen(5001, () => {
    console.log("app is running at 5001")
})