class Note {
    constructor(window){
        this.localstorage = window.localstorage
        this.document = window.document
    }

    render(){
        const enterKey = 13
        const container = document.getElementById("container")
        const textarea = document.createElement("textarea")
        textarea.setAttribute("id", "InputNote");
        textarea.setAttribute("type", "text");
        textarea.setAttribute("class", "my-6 w-2/3 border rounded border-teal-600 focus:border focus:border-2 focus:border-teal-600 focus:outline-0")
        
        container.appendChild(textarea)
        const notes = JSON.parse(localStorage.getItem("notes")) || []
        
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
            const div = document.createElement("div")
            div.setAttribute("class", "mt-4 w-2/3 bg-teal-100 border rounded border-teal-600 text px-1 text-justify")
            div.innerHTML = text
            container.appendChild(div)
        }
        
        const storeNote = () => {
            localStorage.setItem("notes", JSON.stringify(notes))
        }
        
        getNotes()
    }
}

const note  = new Note({window})
note.render()

