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
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    fs.readFile('db/db.json', "utf8", function (error, data){
        if (error){
          return  console.log(error)
        }

        const newData = JSON.parse(data);

        res.json(newData);
    })
    
});

// post path reads the json file, takes db.json into array, push aray, and rewrites db.json
app.post("/api/notes", function(req, res) {        
    
    fs.readFile('db/db.json', "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }

      let jsonNotes = JSON.parse(data);

      console.log(data);

      jsonNotes.push(req.body);

      fs.writeFile('db/db.json', JSON.stringify(jsonNotes), function(err, res){
        if (err) {
          return console.log(err);
        }
        return res;
      })
  })
});

// learned that * needs to come after the other paths.
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


//  listener
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
});