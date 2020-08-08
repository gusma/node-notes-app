const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
	return "Your notes...";
};

const addNote = (title, body) => {
	const notes = loadNotes();

	const duplicateNote = notes.find((note) => note.title === title)

	if (!duplicateNote) {
		notes.push({ title: title, body: body });
		console.log("New note added!");
		console.log(notes);
		saveNotes(notes);
	} else {
		console.log(chalk.whiteBright.bgRed("\n  This title has already been taken. Please come up with a new one!  \n"));
	}
};

const removeNote = (title) => {
	const notes = loadNotes();
	const notesToKeep = notes.filter((note) => note.title !== title);

	if (notes.length > notesToKeep.length) {
		console.log(chalk.green.inverse("Note removed!"));
		saveNotes(notesToKeep);
	} else {
		console.log(chalk.red.inverse("No note found!"));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	
	console.log(chalk.inverse("\n YOUR NOTES \n"));

	notes.forEach((note) =>
		console.log(note.title));

	console.log("");

	};

const readNote = (title) => {
	const notes = loadNotes();

	const soughtTitle = notes.find((note) => note.title === title);

	if (!soughtTitle ) {
		console.log("\n" + chalk.bgRed.whiteBright(" Sorry, there is no such title! ") + "\n")
	}
	else {
	console.log("\n" + soughtTitle.title);
	console.log(soughtTitle.body + "\n");
	}

}


// helper functions for addNote -- no touching!

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
};
