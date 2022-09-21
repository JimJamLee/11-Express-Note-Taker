const fs = require('fs');
const util = require('util');

const readNote = util.promisify(fs.readFile);

const writeNote = (destination, newNote) =>
  fs.writeFile(destination, JSON.stringify(newNote), (err) =>
    err ? console.error(err) : console.info(`Note logged to ${destination}`)
  );

const editNote = (note, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(note);
      writeNote(file, parsedData);
    }
  });
};

module.exports = { readNote, writeNote, editNote };