const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid');

//Route to fetch the notes data
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
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

module.exports = notes;