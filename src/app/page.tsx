"use client"

import { KeyboardEvent, useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [notes, setNotes] = useState<string[]>([])
  const [newNote, setNewNote] = useState("")

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes")
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (newNote.trim() !== "") {
        const updatedNotes = [...notes, newNote.trim()]
        setNotes(updatedNotes)
        localStorage.setItem("notes", JSON.stringify(updatedNotes))
        setNewNote("")
      }
    }
  }

  const handleDelete = (index: number) => {
    const updatedNotes = [...notes]
    updatedNotes.splice(index, 1)
    setNotes(updatedNotes)
    localStorage.setItem("notes", JSON.stringify(updatedNotes))
  }

  const handleDeleteAll = () => {
    setNotes([])
    localStorage.setItem("notes", "[]")
  }

  return (
    <main>
      <div className="flex flex-row justify-center">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your notes..."
          className="my-6 w-3/4 border rounded border-black bg-gray-900 text p-4 text-green-400 focus:outline-0"
          rows={3}
        />
      </div>
      {notes.map((note, index) => (
        <div key={index} className="flex flex-row justify-center">
          <div className="mt-4 w-2/3  before:content-['>>_'] rounded text p-2 text-green-400 text-start text-lg">
            {note}
          </div>
          <button className="mt-4 ml-3 border rounded border-0 text p-2 text-red-600 text-justify" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}
      <div className="flex flex-row justify-center">
        <button className="mt-4 ml-3 border rounded border-0 text p-2 text-red-600 text-justify" onClick={() => handleDeleteAll()}>
          Delete all
        </button>
      </div>
    </main>
  )
}
