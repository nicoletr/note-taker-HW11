const express = require("express");
const path = require("path")
const api = require('./routes/index');

const app = express();
const PORT = process.env.port || 3001;

//Middleware to set up express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

app.use(express.static('public'));

//Route to return the notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//Wildard route which returns the index.html **ALWAYS GOES AT END**
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});