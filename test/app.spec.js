import { expect } from "chai"
import { JSDOM } from "jsdom"
import userEvent from "@testing-library/user-event"

describe('App', () => {
  beforeEach(() => {
    return JSDOM.fromFile('index.html', {runScripts: 'dangerously'})
      .then((dom) => {
        global.window = dom.window;
        global.document = window.document;
      });
  })

  it('allows to write down notes', async () => {
    const myNote = "Note"
    const textarea = document.querySelector('textarea') 

    write(myNote)
  
    expect(textarea.value).to.equal(myNote)
  });

it('allows to save a note', async () => {
    const myNote = "Note"
    write(myNote)
    
    save()

    const div = document.querySelector("div")
    expect(div.innerHTML).to.equal(myNote)
  });

  it('clear text when save note', ()=>{
    const empty= ""
    const textarea = document.querySelector("textarea")
    write("Note")

    save()

    expect(textarea.value).to.equal(empty)
  })
  it('should save multiples notes', ()=> {
    const firstNote = "first note"
    const secondNote = "second note"
    
    write(firstNote)
    save()
    
    write(secondNote)
    save()
    
    const notes = document.querySelectorAll("div")
    expect(notes[0].innerHTML).to.equal(firstNote)
    expect(notes[1].innerHTML).to.equal(secondNote)
  })
});

const write = async (text) => {
  const textarea = document.querySelector('textarea') 

  await userEvent.default.type(textarea, text)
}

const save = async() => {
  const textarea = document.querySelector('textarea') 

  await userEvent.default.type(textarea,"{enter}")
}
