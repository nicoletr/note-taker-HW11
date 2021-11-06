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
app.get('/api/notes', (req, res) => {
    //Returns the notes from db.json
    res.json(notesData)
    //Logs the request to the terminal
    console.info(`${req.method} request recieved for notes`)
});

//Wildard route which returns the index.html **ALWAYS GOES AT END**
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text
      };
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
  