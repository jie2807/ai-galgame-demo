const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(path.resolve(__dirname, '..', '..', '..'), 'index.html');
const outputPath = path.join(__dirname, 'extracted.js');

const html = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract all inline script contents
const scripts = [];
const scriptRe = /<script>([\s\S]*?)<\/script>/g;
let m;
while ((m = scriptRe.exec(html)) !== null) {
    scripts.push(m[1]);
}

const js = scripts.join('\n\n');
fs.writeFileSync(outputPath, js, 'utf8');
console.log('Extracted', scripts.length, 'inline scripts, total length', js.length);
console.log('Output:', outputPath);
