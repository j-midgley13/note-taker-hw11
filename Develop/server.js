// dependencies
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = 8080;

// express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// paths
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
});

//  listener
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
});
 
