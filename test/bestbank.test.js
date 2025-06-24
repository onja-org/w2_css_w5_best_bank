import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import fs from 'fs';

// Load HTML and CSS
const html = fs.readFileSync('./index.html', 'utf8');
const css = fs.readFileSync('./index.css', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
const document = dom.window.document;

// Inject CSS into JSDOM
document.head.appendChild(document.createElement('style')).textContent = css;

describe('BestBank UI + CSS Tests', () => {

  it('has a linked stylesheet', () => {
    const link = document.querySelector('link[rel="stylesheet"]');
    expect(link).to.exist;
    expect(link.href).to.include('index.css');
  });

  it('header image is centered and present', () => {
    const img = document.querySelector('header img');
    expect(img).to.exist;
    const header = document.querySelector('header');
    const styles = dom.window.getComputedStyle(header);
    expect(styles.textAlign).to.equal('center');
  });

  it('nav bar has correct background color and layout', () => {
    const nav = document.querySelector('nav');
    const styles = dom.window.getComputedStyle(nav);
    expect(styles.backgroundColor).to.equal('rgb(255, 209, 140)'); // #FFD18C
  });

  it('body has correct background color', () => {
    const body = document.querySelector('body');
    const styles = dom.window.getComputedStyle(body);
    expect(styles.backgroundColor).to.equal('rgb(253, 247, 244)'); // #FDF7F4
  });

  it('has 5 nav items and "Home" is bold + active', () => {
    const items = document.querySelectorAll('nav li');
    expect(items.length).to.equal(5);
    const home = items[0];
    const styles = dom.window.getComputedStyle(home);
    expect(home.textContent.trim()).to.equal('Home');
    expect(styles.fontWeight).to.match(/bold|[5-9]00/);
  });

  it('has two action buttons styled with border and radius', () => {
    const buttons = document.querySelectorAll('.actions button');
    expect(buttons.length).to.equal(2);
    const btnStyles = dom.window.getComputedStyle(buttons[0]);
    expect(btnStyles.borderRadius).to.not.equal('0px');
    expect(btnStyles.border).to.include('solid');
    expect(btnStyles.fontWeight).to.match(/bold|[5-9]00/);
  });

  it('accounts section has three cards with proper borders', () => {
    const accountCards = document.querySelectorAll('.account');
    expect(accountCards.length).to.equal(3);
    accountCards.forEach(card => {
      const style = dom.window.getComputedStyle(card);
      expect(style.border).to.include('solid');
      expect(style.borderColor).to.equal('rgb(255, 167, 36)'); // #FFA724
    });
  });

  it('main account card has orange background', () => {
    const main = document.querySelector('.account.main');
    const styles = dom.window.getComputedStyle(main);
    expect(styles.backgroundColor).to.equal('rgb(255, 209, 140)'); // #FFD18C
  });

});
