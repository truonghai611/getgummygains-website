const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const opaque = ['3iMQkwu8', 'f6pm1xJY', 'RiOuVi3a', 'X6x5Vzeg', 'QFmoNEA1'];
const slotPattern = /^(hero|card|inline|sticky|checkout|source|shortanswer|aftertable|capsule)$/;

test('every Create affiliate link uses a page-slot sub-id', () => {
  const files = fs.readdirSync(root).filter((name) => name.endsWith('.html'));
  const seen = new Set();
  let count = 0;
  for (const file of files) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const slug = file.replace(/\.html$/, '');
    for (const code of opaque) {
      assert.equal(html.includes(code), false, `${file} still contains ${code}`);
    }
    const tags = html.match(/<a\b[^>]*>/gi) || [];
    for (const tag of tags) {
      const href = (tag.match(/\bhref="([^"]*)"/) || [])[1] || '';
      if (!href.includes('trycreate.co')) continue;
      count += 1;
      if (href === 'https://trycreate.co/15-9KD?q=create-bundles') {
        // portal redirect link to Create's bundle page; one shared q, per-page data-link-id
        const id = (tag.match(/\bdata-link-id="([^"]*)"/) || [])[1];
        assert.equal(id, `${slug}-bundle`, tag);
        assert.equal(seen.has(id), false, `duplicate ${id}`);
        seen.add(id);
        assert.match(tag, /\brel="[^"]*\bsponsored\b/);
        assert.match(tag, /\btarget="_blank"/);
        continue;
      }
      const match = href.match(/^https:\/\/trycreate\.co\/15-9KD\?q=([a-z0-9-]+)$/);
      assert.ok(match, `${file} href ${href}`);
      const q = match[1];
      assert.equal(q.startsWith(`${slug}-`), true, q);
      assert.match(q.slice(slug.length + 1), slotPattern, q);
      assert.equal((tag.match(/\bdata-link-id="([^"]*)"/) || [])[1], q, tag);
      assert.equal(seen.has(q), false, `duplicate ${q}`);
      seen.add(q);
      assert.match(tag, /\brel="[^"]*\bsponsored\b/);
      assert.match(tag, /\brel="[^"]*\bnofollow\b/);
      assert.match(tag, /\btarget="_blank"/);
    }
  }
  assert.equal(count, 138);
});

test('Create purchase links and sticky banners do not promise a fixed discount', () => {
  const files = fs.readdirSync(root).filter((name) => name.endsWith('.html'));
  const percentage = /\d\s*(?:%|&percnt;|&#0*37;|&#x0*25;|percent\b)/i;
  for (const file of files) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    for (const [, attrs, label] of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
      if (!/\bhref="https:\/\/trycreate\.co\/15-9KD\b/i.test(attrs)) continue;
      const accessibleLabel = attrs.match(/\baria-label="([^"]*)"/i)?.[1] || '';
      assert.doesNotMatch(label.replace(/<[^>]+>/g, '') + ' ' + accessibleLabel, percentage, file);
    }
    for (const [, caption] of html.matchAll(/<div class="sticky-txt">([\s\S]*?)<\/div>/gi)) {
      assert.doesNotMatch(caption.replace(/<[^>]+>/g, ''), percentage, file);
    }
  }
});
