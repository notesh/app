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
    const textArea = document.querySelector('textarea') 

    write(myNote)
  
    expect(textArea.value).to.equal(myNote)
  });

  it('allows to save a note', async () => {
    const myNote = "Note"
    const div = document.querySelector("div")
    write(myNote)
    
    save()

    expect(div.innerHTML).to.equal(myNote)
  });
});

const write = async (text) => {
  const textArea = document.querySelector('textarea') 

  await userEvent.default.type(textArea, text)
}

const save = async() => {
  const textArea = document.querySelector('textarea') 

  await userEvent.default.type(textArea,"{enter}")
}
