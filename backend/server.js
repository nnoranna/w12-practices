const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 9000;

const app = express();

const fFolder = `${__dirname}/../frontend`

app.use('/public', express.static(`${fFolder}/public`));

//Next: 
app.get("/", (req, res, next) => {
    /* console.log("Request recieved")
    res.send("Thank you for your request. This is our esponse"); */
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})


app.get("/admin/order-view", (req, res, next) => {
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

//Krsiz kódja
/*app.get("/api/v1/users/:status", (req, res) => {
    fs.readFile(`${fFolder}/users.json`, (error, data) => {
        if (error) {
            res.send("Problem");
        } else {
            if (req.params.status === "active") {
                const users = JSON.parse(data);
                res.send(users.filter(user => user.status === "active"));
            } else if (req.params.status === "passive"){
                const users = JSON.parse(data);
                res.send(users.filter(user => user.status === "passive"));
            } else {
                res.send(`${req.params.status} is not a valid user status`);
            }
        }
    })
})*/


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

app.post("/users/new", (req, res) => {
    fs.readFile(`${fFolder}/users.json`, (error, data) => {
        if (error) {
            console.log(error);
            res.send("Error reading users file");
        } else {
            const users = JSON.parse(data);
            console.log(req.body);
            
            users.push(req.body);

            fs.writeFile(`${fFolder}/users.json`, JSON.stringify(users), error => {
                if (error) {
                    console.log(error);
                    res.send("Error writing users file");
                }
            })
            res.send(req.body);
        }
    })
})



app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});