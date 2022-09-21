const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readNote, writeNote, editNote } = require('../helpers/fsUtils');
const notesData = require('../db/db.json');

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

module.exports = notes;