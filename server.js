var express = require("express");
var path = require("path");
var fs = require("fs");
var jsonFile = require("./db/db.json");

var app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function(req, res){
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var jsonData = data;
        console.log(data);
    });
    return res.json(jsonData);
});

app.post("/api/notes", function(req, res){
    fs.appendFile("./db/db.json", req.body, (err) => {
        if (err) throw err;
        console.log(req.body)
    })
    return req.body
})

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});



