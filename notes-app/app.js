const notes = require('./notes')
const yargs = require('yargs')

// set yargs version
yargs.version('1.0.0')

// prepare yargs command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "The title of the note.",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "The body of the note.",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: "The title of the note to be removed.",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: "The title of the note you want to read.",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()
