"use client"

import { KeyboardEvent, useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [notes, setNotes] = useState<string[]>([])
  const [newNote, setNewNote] = useState("")

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (newNote.trim() !== "") {
        setNotes([...notes, newNote.trim()])
        setNewNote("")
      }
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-4">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your notes..."
          className="w-full p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white"
          rows={3}
        />
        <div className="space-y-2">
          {notes.map((note, index) => (
            <div key={index} className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
              {note}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}