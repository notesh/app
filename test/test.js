import { expect } from "chai"
import { JSDOM } from "jsdom"

describe('Index', function () {
  before(function() {
    return JSDOM.fromFile('index.html', {runScripts: 'dangerously'})
      .then((dom) => {
        global.window = dom.window;
        global.document = window.document;
      });
  })

  it('should has a title', function () {
    expect(document.getElementsByTagName('h1')[0].innerHTML).to.equal('Hello World!');
  });
});