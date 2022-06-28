import { Storage } from "./storage.js"

class Note {
    constructor(window) {
        this.storage = new Storage(window.localStorage)
        this.document = window.document
        this.window = window
    }

    render() {
        const enterKey = 13
        const container = this.document.getElementById("container")
        const textarea = this.document.createElement("textarea")
        textarea.setAttribute("id", "InputNote");
        textarea.setAttribute("type", "text");
        textarea.setAttribute("class", "my-6 w-2/3 border rounded border-teal-600 focus:border focus:border-2 focus:border-teal-600 focus:outline-0")

        container.appendChild(textarea)
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
            const noteContent = this.document.createElement("div")
            noteContent.setAttribute("class", "flex justify-end")

            const deleteButton = this.document.createElement("button")
            deleteButton.setAttribute("type", "button")
            deleteButton.setAttribute("id", "deletee")
            deleteButton.setAttribute("class", "mt-4 ml-4 bg-teal-600 border rounded border-teal-600 text px-1 text-justify")
            deleteButton.innerHTML = "Delete"
            deleteButton.addEventListener("click", (event) => {
                deleteNote(event.srcElement.parentElement.children[0].innerHTML)
            })
            
            const div = this.document.createElement("div")
            div.setAttribute("data-testid", "note")
            div.setAttribute("class", "mt-4 w-2/3 bg-teal-100 border rounded border-teal-600 text px-1 text-justify")
            div.innerHTML = text

            noteContent.appendChild(div)
            noteContent.appendChild(deleteButton)
            container.appendChild(noteContent)
        }

        const storeNote = () => {
            this.storage.store(notes)
        }

        const deleteNote = (note) => {
            const notes = JSON.parse(this.localstorage.getItem("notes"))         
            const itemPosition = notes.findIndex((savedNote) => savedNote === note)    
            notes.splice(itemPosition, 1);
           
            this.localstorage.setItem("notes", JSON.stringify(notes))
 
             this.window.location = this.window.location
        }

        getNotes()
    }
}



export { Note }