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

app.get("/api/v1/users", (req, res, next) => {
    console.log("Request recieved on users endpoint")
    const users = [
        {
            name: "John",
            surname: "Doe"
        }
    ]
    res.send(JSON.stringify(users));
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})