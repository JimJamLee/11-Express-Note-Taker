const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { readNote, writeNote, editNote } = require('../helpers/fsUtils');
const notesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
    })
  );

function writeNotesData(notesData) {
    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notesData),
      err => {
        if (err) throw err;
      }
    );
  }

notes.get('/', (req, res) =>
  readNote('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    const {title, text} = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4(),
    };
    
    editNote(newNote, './db/db.json');

    const response = {
        status: 'Note recorded.',
        body: newNote,
    };

    res.json(response);
});

notes.delete("/:id", (req, res) => {
    const id = [req.params.id];
    for (let i = 0; i < notesData.length; i++) {
      if (id === notesData[i].id) {
        notesData.splice(i, 1);
        return;
      }
    }
    writeNotesData(notesData);
    res.send(notesData);
  });

module.exports = notes;