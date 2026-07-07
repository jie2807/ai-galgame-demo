const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..', '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const backupPath = path.join(rootDir, '.trae', 'specs', 'deep-slim-project-resources-and-code', 'backups', 'index.html.bak');

function readFile(p) {
    return fs.readFileSync(p, 'utf8');
}

const current = readFile(indexHtmlPath);
const backup = readFile(backupPath);

// Extract from backup: from "One-Click Video Production" comment to end of initBookEvents (before </script>)
const backupStartMarker = '        // ==================== One-Click Video Production ====================';
const backupEndMarker = '        }\n    </script>'; // end of initBookEvents then close script

const backupStartIdx = backup.indexOf(backupStartMarker);
if (backupStartIdx === -1) {
    console.error('Backup start marker not found');
    process.exit(1);
}

// Find the end of initBookEvents: look for the closing of the function and then </script>
const backupAfterStart = backup.substring(backupStartIdx);
const backupBlockEndIdx = backupAfterStart.indexOf('\n    </script>');
if (backupBlockEndIdx === -1) {
    console.error('Backup block end not found');
    process.exit(1);
}

// We want to end right before the newline before </script>
const backupBlock = backupAfterStart.substring(0, backupBlockEndIdx);

// In current file, find the same start marker and replace up to </script>
const currentStartIdx = current.indexOf(backupStartMarker);
if (currentStartIdx === -1) {
    console.error('Current start marker not found');
    process.exit(1);
}

const currentAfterStart = current.substring(currentStartIdx);
const currentBlockEndIdx = currentAfterStart.indexOf('\n    </script>');
if (currentBlockEndIdx === -1) {
    console.error('Current block end not found');
    process.exit(1);
}

const newContent = current.substring(0, currentStartIdx) + backupBlock + current.substring(currentStartIdx + currentBlockEndIdx);

fs.writeFileSync(indexHtmlPath, newContent, 'utf8');
console.log('Bookshelf module restored successfully.');
console.log('Backup block length:', backupBlock.length);
