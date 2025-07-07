const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><section id="hero"></section>');
global.window = dom.window;
global.document = dom.window.document;

let scrolled = false;
document.getElementById('hero').scrollIntoView = () => { scrolled = true; };

const location = { hash: '#hero' };
const id = location.hash.substring(1);
const element = document.getElementById(id);
if (element) {
  element.scrollIntoView({ behavior: 'smooth' });
}
console.log(scrolled ? 'scrolled' : 'not scrolled');
