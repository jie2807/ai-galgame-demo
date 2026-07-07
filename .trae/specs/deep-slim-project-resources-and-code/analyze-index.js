const fs = require('fs');
const path = require('path');

const htmlPath = 'd:\\BC\\ai_resume\\qmzz\\index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract inline scripts
const inlineScriptRegex = /<script(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
const scripts = [];
let m;
let idx = 0;
while ((m = inlineScriptRegex.exec(html)) !== null) {
  idx++;
  scripts.push({ index: idx, content: m[1], start: m.index, length: m[1].length });
}

console.log(`Inline scripts: ${scripts.length}`);
scripts.forEach(s => {
  console.log(`Inline ${s.index}: ${s.length} bytes (${(s.length/1024).toFixed(2)} KB)`);
});

// Find base64 resources
const b64Regex = /data:(image|audio|video|font|application)\/[^;]+;base64,([A-Za-z0-9+/=]+)/g;
const b64Matches = [];
while ((m = b64Regex.exec(html)) !== null) {
  b64Matches.push({ type: m[1], chars: m[2].length, approxBytes: Math.round(m[2].length * 0.75) });
}
console.log(`\nBase64 resources: ${b64Matches.length}`);
b64Matches.forEach((b, i) => console.log(`  ${i+1}. type=${b.type}, chars=${b.chars}, approxBytes=${b.approxBytes}`));

// Count function declarations in whole HTML
const funcDeclRegex = /(?:^|[\s\};])(?:async\s+)?function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/g;
const arrowRegex = /(?:^|[\s,;\({=:])([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g;
const methodRegex = /([A-Za-z_$][A-Za-z0-9_$]*)\s*:\s*(?:async\s*)?function\s*\(/g;
const funcDecls = [...html.matchAll(funcDeclRegex)].length;
const arrows = [...html.matchAll(arrowRegex)].length;
const methods = [...html.matchAll(methodRegex)].length;
console.log(`\nFunction declarations: ${funcDecls}`);
console.log(`Arrow function assignments: ${arrows}`);
console.log(`Method shorthand functions: ${methods}`);
console.log(`Total functions: ${funcDecls + arrows + methods}`);

// Analyze large data blocks in inline scripts
function findTopLevelObjects(js, label) {
  // Find top-level var/const/let X = { ... }; or [ ... ];
  // Use a simple brace/bracket stack scanner for each declaration match
  const results = [];
  const declRegex = /(?:^|[;\}\{\]\)\n])\s*(?:var|const|let)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=/g;
  while ((m = declRegex.exec(js)) !== null) {
    const name = m[1];
    let pos = m.index + m[0].length;
    // skip whitespace
    while (pos < js.length && /\s/.test(js[pos])) pos++;
    if (pos >= js.length) continue;
    const startChar = js[pos];
    if (startChar !== '{' && startChar !== '[') continue;
    const closeChar = startChar === '{' ? '}' : ']';
    let depth = 1;
    let i = pos + 1;
    let inString = false;
    let stringChar = '';
    let escaped = false;
    let lineComment = false;
    let blockComment = false;
    while (i < js.length && depth > 0) {
      const c = js[i];
      if (lineComment) {
        if (c === '\n') lineComment = false;
      } else if (blockComment) {
        if (c === '*' && js[i+1] === '/') { blockComment = false; i += 2; continue; }
      } else if (inString) {
        if (escaped) {
          escaped = false;
        } else if (c === '\\') {
          escaped = true;
        } else if (c === stringChar) {
          inString = false;
        }
      } else {
        if (c === '/' && js[i+1] === '/') { lineComment = true; i += 2; continue; }
        if (c === '/' && js[i+1] === '*') { blockComment = true; i += 2; continue; }
        if (c === '"' || c === "'" || c === '`') { inString = true; stringChar = c; }
        else if (c === startChar) depth++;
        else if (c === closeChar) depth--;
      }
      i++;
    }
    const block = js.substring(pos, i+1);
    results.push({ name, type: startChar === '{' ? 'object' : 'array', size: Buffer.byteLength(block, 'utf8'), chars: block.length });
  }
  return results.sort((a,b) => b.size - a.size);
}

console.log('\n--- Top-level data blocks per inline script ---');
scripts.forEach(s => {
  const blocks = findTopLevelObjects(s.content, `Inline ${s.index}`);
  if (blocks.length > 0) {
    console.log(`\nInline ${s.index} (${(s.length/1024).toFixed(2)} KB):`);
    blocks.slice(0, 20).forEach(b => {
      console.log(`  ${b.name}: ${b.type} ${b.size} bytes (${(b.size/1024).toFixed(2)} KB)`);
    });
  }
});

// Find window.X assignments that are large objects/arrays
const windowAssignRegex = /window\.([A-Za-z_$][A-Za-z0-9_$]*)\s*=/g;
const windowBlocks = [];
while ((m = windowAssignRegex.exec(html)) !== null) {
  const name = m[1];
  let pos = m.index + m[0].length;
  while (pos < html.length && /\s/.test(html[pos])) pos++;
  if (pos >= html.length) continue;
  const startChar = html[pos];
  if (startChar !== '{' && startChar !== '[') continue;
  const closeChar = startChar === '{' ? '}' : ']';
  let depth = 1;
  let i = pos + 1;
  let inString = false;
  let stringChar = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  while (i < html.length && depth > 0) {
    const c = html[i];
    if (lineComment) {
      if (c === '\n') lineComment = false;
    } else if (blockComment) {
      if (c === '*' && html[i+1] === '/') { blockComment = false; i += 2; continue; }
    } else if (inString) {
      if (escaped) {
        escaped = false;
      } else if (c === '\\') {
        escaped = true;
      } else if (c === stringChar) {
        inString = false;
      }
    } else {
      if (c === '/' && html[i+1] === '/') { lineComment = true; i += 2; continue; }
      if (c === '/' && html[i+1] === '*') { blockComment = true; i += 2; continue; }
      if (c === '"' || c === "'" || c === '`') { inString = true; stringChar = c; }
      else if (c === startChar) depth++;
      else if (c === closeChar) depth--;
    }
    i++;
  }
  const block = html.substring(pos, i+1);
  windowBlocks.push({ name, type: startChar === '{' ? 'object' : 'array', size: Buffer.byteLength(block, 'utf8') });
}
windowBlocks.sort((a,b) => b.size - a.size);
console.log('\n--- window.* large assignments ---');
windowBlocks.slice(0, 20).forEach(b => console.log(`  ${b.name}: ${b.type} ${b.size} bytes (${(b.size/1024).toFixed(2)} KB)`));
