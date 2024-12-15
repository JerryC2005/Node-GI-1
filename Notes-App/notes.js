const fs = require('fs')
const chalk = require('chalk');
const { title } = require('process');

const redError = chalk.bgRed;
const greenSuccess = chalk.bgGreen;

const getNotes = () => {
    return 'your notes'
}

// appends and stores note in JSON file
const addNote = (title, body) => {
    const notes = loadNotes();
    const dupeNote = notes.find(note => note.title === title)

    debugger

    if(!dupeNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)

        console.log(greenSuccess('new note added!'))
    } else {
        console.log(redError('Note title taken'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(greenSuccess('Removed Note!'))
        saveNotes(notesToKeep);
    } else {
        console.log(redError('no note Found!'))
    }

    // console.log(title)
    // console.log('removing', title)
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(greenSuccess('-----Your Notes-----'))

    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find(note => note.title === title);
    
    if(foundNote) {
        console.log(greenSuccess(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(redError('Note not found'))
    }
}

const editNote = (title, body) => {
    const notes = loadNotes();
    let foundNote = notes.findIndex(note => note.title === title)

    if(foundNote !== -1) {

        notes[foundNote] = {
            title: title,
            body: body
        }
        
        saveNotes(notes)
        
        console.log(greenSuccess('edited file SuccessFully!'))
    }
    else {
        console.log(redError('no file found'));
    }
}


// saves notes to the JSON
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

//loads notes so that they are readable to JS
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(e) {
        return [];
    }
}

// exports functions so that can be used 
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    editNote: editNote
};