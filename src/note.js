import { Storage } from "./storage.js"

class Note {
    constructor(window) {
        this.storage = new Storage(window.localStorage)
        this.document = window.document
        this.window = window
    }

    render() {
        const enterKey = 13
        const inputContainer = this.document.getElementById("input-container")     
        const deleteContainer = this.document.getElementById("delete-container")      
        const textarea = this.document.createElement("textarea")
        const downloadButton = this.document.createElement("button")
        downloadButton.setAttribute("type", "button")
        downloadButton.setAttribute("class", "my-6 text px-2 text-blue-600 justify-end")
        downloadButton.innerHTML = "Download"
        downloadButton.addEventListener("click", () => {
            var allNotes = localStorage.getItem('notes');
            var notesJSON = JSON.stringify(allNotes);

            var blob = new Blob([notesJSON], { type: 'application/json' });
            var url = URL.createObjectURL(blob);

            var link = document.createElement('a');
            link.href = url;
            link.download = 'notas.json';
            link.click();
        })

        const deleteAllButton = this.document.createElement("button")
        deleteAllButton.setAttribute("type", "button")
        deleteAllButton.setAttribute("id", "deleteAll")
        deleteAllButton.setAttribute("class", "my-6 text px-2 text-red-600 justify-end")
        deleteAllButton.innerHTML = "Delete all"
        deleteAllButton.addEventListener("click", () => {
            this.storage.store([])
            this.window.location = this.window.location
        })

        textarea.setAttribute("id", "InputNote");
        textarea.setAttribute("type", "text");
        textarea.setAttribute("class", "my-6 w-3/4 border rounded border-black bg-gray-900 text p-4 text-green-400 focus:outline-0")

        inputContainer.appendChild(textarea)
        deleteContainer.appendChild(downloadButton)
        deleteContainer.appendChild(deleteAllButton)
        const notes = this.storage.retrieve() || []

        textarea.addEventListener("keydown", (event) => {
            if (event.keyCode === enterKey) {
                createNote(textarea.value)
                notes.push(textarea.value)
                storeNote()
                textarea.value = ""
                event.preventDefault()
            }
        })

        const getNotes = () => {
            notes.forEach(note => {
                createNote(note)
            })
        }

        const createNote = text => {
            const notesContainer = this.document.getElementById("notes-container")
            const noteContent = this.document.createElement("div")
            noteContent.setAttribute("class", "flex flex-row justify-center")

            const deleteButton = this.document.createElement("button")
            deleteButton.setAttribute("type", "button")
            deleteButton.setAttribute("id", "delete")
            deleteButton.setAttribute("class", "mt-4 ml-3 border rounded border-0 text p-2 text-red-600 text-justify")
            deleteButton.innerHTML = "Delete"
            deleteButton.addEventListener("click", (event) => {
                deleteNote(event.srcElement.parentElement.children[0].innerHTML)
            })
            
            const div = this.document.createElement("div")
            div.setAttribute("data-testid", "note")
            div.setAttribute("class", "mt-4 w-2/3  before:content-['>>_'] rounded text p-2 text-green-400 text-start text-lg")
            div.innerHTML = text

            noteContent.appendChild(div)
            noteContent.appendChild(deleteButton)
            notesContainer.insertBefore(noteContent, notesContainer.firstChild)
        }

        const storeNote = () => {
            this.storage.store(notes)
        }

        const deleteNote = (note) => {
            const notes = this.storage.retrieve()
            const itemPosition = notes.findIndex((savedNote) => savedNote === note)    
            notes.splice(itemPosition, 1);
           
            this.storage.store(notes)
 
            this.window.location = this.window.location
        }

        getNotes()
        this.window.onload = this.document.getElementById('InputNote').select();
    }
}



export { Note }