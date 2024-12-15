// const fs = require('fs');// callinbg req to load fs module 

// //fs.writeFileSync('notes.txt', 'My name is jerry.');

// fs.appendFileSync('notes.txt', ' I am 19 years old.');
// const add = require('./utils.js') //gets file and runs what is inside

// let sum = add(4, -2) 

// console.log(sum);

// const validator = require('validator')
const note = require('./notes.js');

const chalk = require('chalk')

// let msg = getNotes();

// console.log(msg);
// // console.log(validator.isEmail('gmail.com'));
// // console.log(validato(r.isURL('https://bruh.com'));
// console.log(chalk.blue.inverse('bruh!'));

// console.log(process.argv);

const command = process.argv[2];
const yargs = require('yargs')

// console.log(process.argv)

//customize yargs version
yargs.version('1.1.0')

// add, remove, read, list

// create add command
yargs.command({
    command: 'add',
    describe: 'Add new Note',
    builder: {
        body: {
            describe: 'note content',
            demandOption: true,
            type: 'string'
        },
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        note.addNote(argv.title, argv.body);
        // console.log(chalk.blue('Title: ' + argv.title));
        // console.log(chalk.blue('Body: ' + argv.body));

    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            demandOption: true,
            describe: 'Note Title',
            type: 'string'
        }
    },
    handler(argv) {
        note.removeNote(argv.title)

        // console.log('removing note!')
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'list out notes',
    handler() {
        note.listNotes();
    }
})


//create read command
yargs.command({
    command: 'read',
    describe: 'reads notes',
    builder: {
        title: {
            demanOption: true,
            type: 'string',
            describe: 'note title'

        }
    },
    handler(argv) {
        note.readNote(argv.title)
    }
})

//creates edit command
yargs.command({
    command: 'edit',
    describe: 'Edit will allow the user to edit the note',
    builder: {
        title: {
            demandOption: true,
            type: 'string',
            describe: 'note title'
        },

        body: {
            demandOption: true,
            type: 'string',
            describe: 'note body'
        }
    },
    handler(argv) {
        note.editNote(argv.title, argv.body);
    }
})

yargs.parse();

// console.log(yargs.argv);

// if (command === 'add') {
//     console.log('Adding note!');
// } else if (command === 'remove') {
//     console.log('removing note');
// }