import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import userEvent from '@testing-library/user-event';
import { Note } from './note.js'

describe('App', () => {
  let dom

  beforeEach(() => {
    dom = new JSDOM('<div id="container"><div id="input-container" class="ml-2"></div><div id="notes-container" class="ml-2"></div></div>', { runScripts: "outside-only", url: "http://localhost" });
  });

  it('allows to write down notes', async () => {
    const myNote = 'Note';
    const { document } = render(Note)
    const textarea = document.querySelector('textarea');

    await userEvent.default.type(textarea, myNote);

    expect(textarea.value).to.equal(myNote);
  });

  it('clears text when save note', async () => {
    const empty = '';
    const { document } = render(Note)
    const textarea = document.querySelector('textarea');

    await userEvent.default.type(textarea, "Note");
    await userEvent.default.type(textarea, '{enter}');

    expect(textarea.value).to.equal(empty);
  });

  it('saves multiples notes', async () => {
    const firstNote = 'first note';
    const secondNote = 'second note';
    const { document } = render(Note)
    const textarea = document.querySelector('textarea');

    await userEvent.default.type(textarea, firstNote);
    await userEvent.default.type(textarea, '{enter}');

    await userEvent.default.type(textarea, secondNote);
    await userEvent.default.type(textarea, '{enter}');


    expect(getTextFrom(document.querySelectorAll('[data-testid="note"]'))).to.contain(firstNote)
    expect(getTextFrom(document.querySelectorAll('[data-testid="note"]'))).to.contain(secondNote)
  });

  it('shows notes saved in localStorage', async () => {
    dom.window.localStorage.setItem("notes", JSON.stringify(["My note in localStorage"]))

    const { document } = render(Note)

    expect(getTextFrom(document.querySelectorAll('[data-testid="note"]'))).to.contain("My note in localStorage")
  })

  it('deletes a single note', async () => {
    const myNote = 'Note to delete';
    const { document } = render(Note)
    const textarea = document.querySelector('textarea');

    await userEvent.default.type(textarea, myNote);
    await userEvent.default.type(textarea, '{enter}');

    expect(dom.window.localStorage.getItem("notes")).to.contain(myNote) 
    const deleteButton = document.getElementById("delete")

    userEvent.default.click(deleteButton);
    expect(dom.window.localStorage.getItem("notes")).not.to.contain(myNote) 
  });

  it('deletes all notes at the same time', async () => {
    dom.window.localStorage.setItem("notes", JSON.stringify(["My note 1", "My note 2"]))
    const { document } = render(Note)
    expect(dom.window.localStorage.getItem("notes")).to.contain("My note 1") 
    expect(dom.window.localStorage.getItem("notes")).to.contain("My note 2") 
    const deleteButton = document.getElementById("deleteAll")

    userEvent.default.click(deleteButton);

    expect(dom.window.localStorage.getItem("notes")).not.to.contain("My note 1") 
    expect(dom.window.localStorage.getItem("notes")).not.to.contain("My note 2") 
    
  });

  const render = (componentClass) => {
    const component = new componentClass(dom.window)
    component.render();
    return { document: dom.window.document, window: dom.window }
  };

  const getTextFrom = (elements) => {
    return Array.from(elements).map(element => element.textContent)
  }

});


