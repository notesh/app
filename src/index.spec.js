import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import userEvent from '@testing-library/user-event';
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('App', () => {
  let dom
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously', url: 'http://localhost' });
    global.window = dom.window;
    global.document = window.document
    let scriptContent = fs.readFileSync(path.resolve(__dirname, 'index.js'), 'utf8');
    let scriptElement = dom.window.document.createElement('script');
    scriptElement.textContent = scriptContent;
    dom.window.document.body.appendChild(scriptElement)

  });

  it('allows to write down notes', async () => {
    const myNote = 'Note';
    const textarea = document.querySelector('textarea');

    write(myNote);

    expect(textarea.value).to.equal(myNote);
  });

  it('clear text when save note', () => {
    const empty = '';
    const textarea = document.querySelector('textarea');
    write('Note');

    save();

    expect(textarea.value).to.equal(empty);
  });

  it('should save multiples notes', () => {
    const firstNote = 'first note';
    const secondNote = 'second note';

    write(firstNote);
    save();

    write(secondNote);
    save();

    const notes = getSavedNotes();
    expect(notes).to.contain(firstNote);
    expect(notes).to.contain(secondNote);
    expect(getElementByText(firstNote)).to.not.equal(undefined);
    expect(getElementByText(secondNote)).to.not.equal(undefined);
  });
});

const write = async (text) => {
  const textarea = document.querySelector('textarea');

  await userEvent.default.type(textarea, text);
};

const save = async () => {
  const textarea = document.querySelector('textarea');

  await userEvent.default.type(textarea, '{enter}');
};

const getSavedNotes = () => {
  return JSON.parse(window.localStorage.getItem('notes'));
};

const getElementByText = (text) => {
  const body = document.getElementById('container');
  let foundElement;
  body.childNodes.forEach((element) => {
    if (element.textContent === text) foundElement = element;
  });
  return foundElement;
};
