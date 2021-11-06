const fs = require("fs");
const express = require("express");
const path = require("path")
const notesData = require("./db/db.json")

const app = express();
const PORT = 3001;

//Middleware to set up express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//Route to return the notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//Route to fetch the notes data
app.get('/api/notes', (req, res) => res.json(notesData));

//Wildard route which returns the index.html 
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
  