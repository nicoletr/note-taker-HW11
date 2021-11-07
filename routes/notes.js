const fs = require("fs");
const path = require("path")
const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid');

function readDb() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), 'utf8'));
}

//Route to fetch the notes data
notes.get('/', (req, res) => {
    res.json(readDb());
    //Logs the request to the terminal
    console.info(`${req.method} request recieved for notes`)
});

notes.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid()
    };

  // Obtain existing notes & add new note
  readAndAppend(newNote, './db/db.json')

    const response = {
      status: 'Success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

//Delete route
notes.delete('/:id', (req,res) => {
    const notes = readDb(); 
    const selectedNote = req.params.id;

    const filtered = notes.filter((note) => note.id !== selectedNote);

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filtered), function(err) {
        if(err) {
            return console.log(err); 
        }
        console.log((`Note ${req.params.id} had been deleted`));
        res.json(filtered);
    });
})

module.exports = notes;