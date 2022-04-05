const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 9000;

const app = express();

//Next: 
app.get("/", (req, res, next) => {
    /* console.log("Request recieved")
    res.send("Thank you for your request. This is our esponse"); */
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})

app.get("/kismacska", (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
})

app.get("/something", (req, res, next) => {
    console.log("Request recieved on something endpoint")
    res.send("Thank you for your request. This is our response");
})

app.get("/api/v1/users", (req, res, next) => {
    console.log("Request recieved on users endpoint")
    
    res.sendFile(path.join(`${__dirname}/../frontend/users.json`));
});


app.get("/api/v1/users-query", (req, res, next) => {
    console.dir(req.query);
    console.log(req.query.id);
    if (req.query.apiKey === "apple") {
        res.sendFile(path.join(`${__dirname}/../frontend/users.json`));
    } else {
        res.send("Unauthorized Request")
    }
});


    /* const users = [
        {
            name: "John",
            surname: "Doe",
            status: "active"
        },
        {
            name: "Jane",
            surname: "Done",
            status: "passive"
        }
    ]
    res.send(JSON.stringify(users)); */   


//Create a variable and store the path to reach the users.json
const userFile = path.join(`${__dirname}/../frontend/users.json`)

/* app.get("/api/v1/users-params/:key", (req, res, next) => {
    console.dir(req.params);
    console.log(req.params.key);
    if (req.params.key === "apple") {
        res.send("Azt írtad be hogy alma")
    } else {
        res.send("Nem azt írtad be hogy alma")
    }
}); */

//Active passive
app.get("/api/v1/users-params/:status", (req, res, next) => {
    console.dir(req.params);
    console.log(req.params.status);
    fs.readFile(userFile, (err, data) => {
        const users = JSON.parse(data);
        
        if (req.params.status === "active") {

            res.send(users.filter(user => user.status === "active"))
        } else if (req.params.status === "passive") {

            res.send(users.filter(user => user.status === "passive"))

        } else {
            res.send("Ajjajjj!")
        }
    }) 
});

//Create 2 new endpoints
/* app.get("/api/v1/users/active", (req, res, next) => {
    fs.readFile(userFile, (err, data) => {
        if (err) {
            res.send("Something went wrong")
        } else {
            const users = JSON.parse(data);

            res.send(users.filter(user => user.status === "active"))
        }
    })
}); */

/* app.get("/api/v1/users/passive", (req, res, next) => {
    fs.readFile(userFile, (err, data) => {
        if (err) {
            res.send("Something went wrong")
        } else {
            const users = JSON.parse(data);
            res.send(users.filter(user => user.status === "passive"))
        }
    })
}); */


app.use('/public', express.static(`${__dirname}/../frontend/public`));


app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})