const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const calculate = require('../assets/calculator.js');

function openCalculator(hash = '') {
  const elements = {};
  for (const id of ['calc', 'c-price', 'c-count', 'c-per', 'c-target', 'c-share', 'c-share-link',
    'c-out', 'c-gummies', 'c-days', 'c-normalized', 'c-verdict']) {
    elements[id] = {
      value: '', addEventListener(type, fn) { this[type] = fn; }, setAttribute() {}
    };
  }
  const fields = ['c-price', 'c-count', 'c-per', 'c-target'];
  fields.forEach((id, i) => { elements[id].value = [48, 90, 1.5, 3][i]; });
  const origin = 'https://getgummygains.com';
  const pathname = '/creatine-dose-calculator';
  const search = '?utm_source=pinterest';
  const document = {
    getElementById(id) { return elements[id]; }, querySelector() {},
    querySelectorAll() { return []; }, addEventListener() {}, documentElement: {}
  };
  const ctx = { URL, URLSearchParams, document, gummyLabelCost: calculate,
    location: {origin, pathname, hash, search, href: origin + pathname + search + hash},
    addEventListener(type, fn) { this[type] = fn; } };
  ctx.window = ctx;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/app.js'), 'utf8'), ctx);
  return {ctx, elements};
}

test('linked price example survives edits, sharing and reopening without source tags', () => {
  const article = fs.readFileSync(path.join(__dirname, '../black-friday-creatine-gummies-price-per-gram.html'), 'utf8');
  const example = article.match(/href="\/creatine-dose-calculator(#price=[^"]+)"/)[1].replaceAll('&amp;', '&');
  const {ctx, elements} = openCalculator(example);
  assert.equal(elements['c-out'].textContent, '$1.40');
  elements['c-price'].value = 54;
  elements['c-price'].input();
  const url = new URL(elements['c-share-link'].value);
  assert.equal(url.search, '');
  assert.equal(openCalculator(url.hash).elements['c-out'].textContent, '$1.80');
  ctx.location.hash = '#price=60&count=90&grams=1.5&serving=3';
  ctx.hashchange();
  assert.equal(elements['c-out'].textContent, '$2.00');
});

test('incomplete shared examples retain defaults and invalid edits hide the link', () => {
  const {elements} = openCalculator('#price=42&grams=1.5');
  assert.equal(elements['c-out'].textContent, '$1.60');
  elements['c-count'].value = 0;
  elements['c-count'].input();
  assert.equal(elements['c-share'].hidden, true);
  assert.equal(elements['c-share-link'].value, '');
});
