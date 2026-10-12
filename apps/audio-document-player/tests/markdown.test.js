const test = require('node:test');
const assert = require('node:assert/strict');
const { renderMarkdown, renderInline } = require('../markdown.js');

test('renders bold, italic, strikethrough and inline code without formatting code contents', () => {
  const html = renderInline('**tebal** *miring* ~~hapus~~ `**kode** <tag>`');
  assert.match(html, /<strong>tebal<\/strong>/);
  assert.match(html, /<em>miring<\/em>/);
  assert.match(html, /<del>hapus<\/del>/);
  assert.match(html, /<code>\*\*kode\*\* &lt;tag&gt;<\/code>/);
});

test('renders headings, paragraphs, lists, quotes, horizontal rules and fenced code', () => {
  const html = renderMarkdown('# Judul\n\nParagraf **penting**\n\n- satu\n- dua\n\n> kutipan\n\n---\n\n```js\nconst x = "<x>";\n```');
  for (const expected of ['<h1>Judul</h1>', '<p>Paragraf <strong>penting</strong></p>', '<ul>', '<li>satu</li>', '<li>dua</li>', '<blockquote>', '<hr>', 'class="language-js"', '&lt;x&gt;']) assert.ok(html.includes(expected), `expected ${expected}`);
});

test('renders pipe tables and pads missing cells safely', () => {
  const html = renderMarkdown('| Nama | Nilai |\n| --- | ---: |\n| Ali | **10** |\n| Budi | |');
  assert.match(html, /<table>/);
  assert.match(html, /<th scope="col">Nama<\/th>/);
  assert.match(html, /<td><strong>10<\/strong><\/td>/);
  assert.match(html, /<tr><td>Budi<\/td><td><\/td><\/tr>/);
});

test('escapes raw HTML and blocks unsafe link protocols', () => {
  const html = renderMarkdown('<img src=x onerror=alert(1)>\n\n[klik](javascript:alert(1))');
  assert.ok(!html.includes('<img'));
  assert.ok(html.includes('&lt;img'));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(html.includes('tautan tidak aman'));
});

test('allows safe links but does not fetch images from Markdown', () => {
  const html = renderInline('[dokumen](https://example.com) ![gambar](https://example.com/a.png)');
  assert.ok(html.includes('href="https://example.com"'));
  assert.ok(html.includes('rel="noopener noreferrer"'));
  assert.ok(!html.includes('<img'));
  assert.ok(html.includes('gambar'));
});

test('handles empty documents and unclosed code fences safely', () => {
  assert.equal(renderMarkdown(''), '<p>(Dokumen kosong)</p>');
  assert.ok(renderMarkdown('```\n<unsafe>\n').includes('&lt;unsafe&gt;'));
});
