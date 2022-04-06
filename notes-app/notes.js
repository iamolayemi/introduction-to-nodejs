const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(notes => notes.title === title)

    if (!duplicateNote) {
        notes.push({ title, body })
        saveNote(notes)
        console.log(chalk.green.inverse('New note has been added successfully'))
    } else {
        console.log(chalk.red.inverse('There is already a note with this title.'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)

    if (notes.length > notesToKeep.length) {
        saveNote(notesToKeep)
        console.log(chalk.green.inverse(`A note with title "${title}" has been removed successfully.`))
    } else {
        console.log(chalk.red.inverse(`A note with title "${title}" could not be removed.`))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

    if (note) {
        console.log(chalk.cyan(`Title: ${note.title}`))
        console.log(chalk.cyan(`Body: ${note.body}.`))
    } else {
        console.log(chalk.red.inverse(`There is no note with title: "${title}" .`))
    }
}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON);
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.white.inverse('Listing all notes'))

    notes.forEach(note => console.log(chalk.green(note.title)))
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = { readNote, addNote, removeNote, listNotes }
