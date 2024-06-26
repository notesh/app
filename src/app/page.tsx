"use client"

import { KeyboardEvent, useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import Markdown from "react-markdown"

export default function Home() {
  const [notes, setNotes] = useState<string[]>([])
  const [newNote, setNewNote] = useState("")
  const { toast } = useToast()

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

  const handleDownload = () => {
    const now = new Date()
    const formattedDate = now.toISOString().slice(0, 16)
    const header = `# Notes from ${formattedDate.replace('T', ' ')}\n\n`
    const footer = `\n\n---\n\nPowered by note.sh`

    const markdownContent = notes.map((note, index) => `- ${note}`).join("\n")
    const fullContent = `${header}${markdownContent}${footer}`

    const blob = new Blob([fullContent], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${formattedDate}.md`

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = (note: string) => {
    navigator.clipboard.writeText(note)
      .then(() => toast({
        description: 'Note copied to clipboard'
      }))
      .catch((err) => console.error('Failed to copy:', err));
  }

  const handleCopyAll = () => {
    const now = new Date()
    const formattedDate = now.toISOString().slice(0, 16)
    const header = `# Notes from ${formattedDate.replace('T', ' ')}\n\n`
    const footer = `\n\n---\n\nPowered by note.sh`

    const markdownContent = notes.map((note, index) => `- ${note}`).join("\n")
    const fullContent = `${header}${markdownContent}${footer}`

    navigator.clipboard.writeText(fullContent)
      .then(() => toast({
        description: 'All notes copied to clipboard'
      }))
      .catch((err) => console.error('Failed to copy markdown:', err));
  }

  const markdownComponents = {
    a: (props: any) => {
      return (
        <a {...props} style={{ textDecoration: "underline" }}>
          {props.children}
        </a>
      );
    }
  };

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
          <Markdown
            className="mt-4 w-2/3 rounded text p-2 text-green-400 text-start text-lg"
            components={markdownComponents}
          >
            {note}
          </Markdown>
          <button className="mt-4 ml-3 border rounded border-0 text p-2 text-blue-600 text-justify" onClick={() => handleCopy(note)}>
            Copy
          </button>
          <button className="mt-4 ml-3 border rounded border-0 text p-2 text-red-600 text-justify" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}
      <div className="flex flex-row justify-center">
        <button className="mt-4 ml-3 border rounded border-0 text p-2 text-blue-600 text-justify" onClick={handleCopyAll}>
          Copy
        </button>
        <button className="mt-4 ml-3 border rounded border-0 text p-2 text-green-600 text-justify" onClick={handleDownload}>
          Download
        </button>
        <button className="mt-4 ml-3 border rounded border-0 text p-2 text-red-600 text-justify" onClick={handleDeleteAll}>
          Delete
        </button>
      </div>
    </main>
  )
}
