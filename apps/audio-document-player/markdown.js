(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.MarkdownRenderer = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[ch]);
  }

  function safeHref(raw) {
    const value = raw.trim();
    if (/^(https?:|mailto:)/i.test(value)) return value;
    if (/^(#|\/|\.\/|\.\.\/)/.test(value) && !/^\/\//.test(value)) return value;
    return null;
  }

  function renderInline(source) {
    let text = String(source);
    const protectedHtml = [];
    const protect = (html) => {
      const token = `\u0000MD${protectedHtml.length}\u0000`;
      protectedHtml.push(html);
      return token;
    };

    // Keep code literal; do not apply emphasis inside code spans.
    text = text.replace(/(`+)(.+?)\1/g, (_, ticks, content) => protect('<code>' + escapeHtml(content.trim()) + '</code>'));
    // Do not fetch Markdown images: the app must keep document contents local.
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt) => protect('<span class="md-image-alt">' + escapeHtml(alt) + '</span>'));
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, destination) => {
      const href = safeHref(destination);
      if (!href) return protect(escapeHtml(label) + ' <span class="md-link-blocked">(tautan tidak aman)</span>');
      return protect('<a href="' + escapeHtml(href) + '" rel="noopener noreferrer" target="_blank">' + renderInline(label) + '</a>');
    });

    text = escapeHtml(text);
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
    text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');
    text = text.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    text = text.replace(/(^|[^_])_([^_\n]+)_(?!_)/g, '$1<em>$2</em>');
    return text.replace(/\u0000MD(\d+)\u0000/g, (_, index) => protectedHtml[Number(index)]);
  }

  function splitTableRow(line) {
    let value = line.trim();
    if (value.startsWith('|')) value = value.slice(1);
    if (value.endsWith('|')) value = value.slice(0, -1);
    return value.split('|').map((cell) => cell.trim());
  }

  function isTableDivider(line) {
    const cells = splitTableRow(line);
    return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
  }

  function renderMarkdown(source) {
    const lines = String(source).replace(/\r\n?/g, '\n').split('\n');
    const output = [];
    let paragraph = [];
    let listType = null;
    let inCode = false;
    let codeLanguage = '';
    let codeLines = [];

    const flushParagraph = () => {
      if (paragraph.length) {
        output.push('<p>' + renderInline(paragraph.join(' ')) + '</p>');
        paragraph = [];
      }
    };
    const closeList = () => {
      if (listType) { output.push('</' + listType + '>'); listType = null; }
    };
    const flushCode = () => {
      const languageClass = /^[a-z0-9_-]+$/i.test(codeLanguage) ? ' class="language-' + escapeHtml(codeLanguage) + '"' : '';
      output.push('<pre><code' + languageClass + '>' + escapeHtml(codeLines.join('\n')) + '</code></pre>');
      codeLines = [];
      codeLanguage = '';
    };

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const fence = line.match(/^\s*```\s*([a-z0-9_-]*)\s*$/i);
      if (fence) {
        flushParagraph(); closeList();
        if (inCode) { flushCode(); inCode = false; }
        else { inCode = true; codeLanguage = fence[1] || ''; }
        continue;
      }
      if (inCode) { codeLines.push(line); continue; }
      if (!line.trim()) { flushParagraph(); closeList(); continue; }

      const heading = line.match(/^\s*(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (heading) {
        flushParagraph(); closeList();
        const level = heading[1].length;
        output.push('<h' + level + '>' + renderInline(heading[2]) + '</h' + level + '>');
        continue;
      }
      if (/^(?:(?:\*\s*){3,}|(?:-\s*){3,}|(?:_\s*){3,})$/.test(line.trim())) {
        flushParagraph(); closeList(); output.push('<hr>'); continue;
      }
      if (/^\s*>/.test(line)) {
        flushParagraph(); closeList();
        const quoteLines = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) {
          quoteLines.push(lines[i].replace(/^\s*>\s?/, ''));
          i += 1;
        }
        i -= 1;
        output.push('<blockquote>' + quoteLines.map((quote) => '<p>' + renderInline(quote) + '</p>').join('') + '</blockquote>');
        continue;
      }

      // A pipe table requires a valid divider row immediately after its header.
      if (line.includes('|') && i + 1 < lines.length && isTableDivider(lines[i + 1])) {
        flushParagraph(); closeList();
        const headers = splitTableRow(line);
        const dividers = splitTableRow(lines[i + 1]);
        if (headers.length === dividers.length) {
          const rows = [];
          i += 2;
          while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
            rows.push(splitTableRow(lines[i]));
            i += 1;
          }
          i -= 1;
          output.push('<div class="md-table-wrap"><table><thead><tr>' + headers.map((cell) => '<th scope="col">' + renderInline(cell) + '</th>').join('') + '</tr></thead><tbody>' + rows.map((row) => '<tr>' + headers.map((_, index) => '<td>' + renderInline(row[index] || '') + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>');
          continue;
        }
      }

      const list = line.match(/^\s*(?:([-+*])\s+|(\d+)[.)]\s+)(.+)$/);
      if (list) {
        flushParagraph();
        const type = list[2] ? 'ol' : 'ul';
        if (listType !== type) { closeList(); output.push('<' + type + '>'); listType = type; }
        output.push('<li>' + renderInline(list[3]) + '</li>');
        continue;
      }
      closeList();
      paragraph.push(line.trim());
    }

    flushParagraph(); closeList();
    if (inCode) flushCode();
    return output.join('\n') || '<p>(Dokumen kosong)</p>';
  }

  return { renderMarkdown, renderInline, escapeHtml };
});
