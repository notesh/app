import { expect } from "chai"
import { JSDOM } from "jsdom"
import userEvent from "@testing-library/user-event"

describe('App', () => {
  before(() => {
    return JSDOM.fromFile('index.html', {runScripts: 'dangerously'})
      .then((dom) => {
        global.window = dom.window;
        global.document = window.document;
      });
  })

  it('allows to write down notes', async () => {
    const textArea = document.querySelector('textarea') 
    const myNote = "Note" 

    await userEvent.default.type(textArea, myNote)
  
    expect(textArea.value).to.equal(myNote)
  });

});