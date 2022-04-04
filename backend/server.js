const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 9000;

const app = express();

//Next: 
app.get("/", (req, res, next) => {
    console.log("Request recieved")
    res.send("Thank you for your request. This is our esponse");
})

app.get("/something", (req, res, next) => {
    console.log("Request recieved on something endpoint")
    res.send("Thank you for your request. This is our response");
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})