const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..', '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const tmpJsPath = path.join(rootDir, '.tmp_syntax_check.js');
const outputPath = path.join(__dirname, 'regression-report.md');

function readFile(p) {
    try {
        return fs.readFileSync(p, 'utf8');
    } catch (e) {
        console.error('Failed to read', p, e.message);
        process.exit(1);
    }
}

function extractFunctionDefinitions(source) {
    const defs = new Map();
    // function name(...) { ... }
    const funcRe = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    let m;
    while ((m = funcRe.exec(source)) !== null) {
        const name = m[1];
        if (!defs.has(name)) defs.set(name, []);
        defs.get(name).push(m.index);
    }
    // var/let/const name = function(...) or name = (...) =>
    const varFuncRe = /(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:function\s*\(|\(?[^)]*\)?\s*=>)/g;
    while ((m = varFuncRe.exec(source)) !== null) {
        const name = m[1];
        if (!defs.has(name)) defs.set(name, []);
        defs.get(name).push(m.index);
    }
    return defs;
}

function extractFunctionCalls(source) {
    const calls = new Map();
    // name(...)
    const callRe = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    let m;
    while ((m = callRe.exec(source)) !== null) {
        const name = m[1];
        // Skip keywords that look like calls
        if (/^(if|while|for|switch|catch|function|return|typeof|instanceof|new|void|delete|in|of|with|class|extends|super|this|true|false|null|undefined)$/.test(name)) continue;
        if (!calls.has(name)) calls.set(name, []);
        calls.get(name).push(m.index);
    }
    return calls;
}

function extractIdsFromHtml(html) {
    const ids = new Map();
    const idRe = /id=["']([^"']+)["']/g;
    let m;
    while ((m = idRe.exec(html)) !== null) {
        const id = m[1];
        if (!ids.has(id)) ids.set(id, []);
        ids.get(id).push(m.index);
    }
    return ids;
}

function extractBindings(source) {
    const bindings = new Map();
    // getElementById('id').addEventListener or .onclick
    const bindingRe = /getElementById\(["']([^"']+)["']\)[\s\S]{0,80}?(?:addEventListener|onclick)/g;
    let m;
    while ((m = bindingRe.exec(source)) !== null) {
        const id = m[1];
        if (!bindings.has(id)) bindings.set(id, []);
        bindings.get(id).push(m.index);
    }
    return bindings;
}

const indexHtml = readFile(indexHtmlPath);
const tmpJs = fs.existsSync(tmpJsPath) ? readFile(tmpJsPath) : '';

const indexDefs = extractFunctionDefinitions(indexHtml);
const tmpDefs = tmpJs ? extractFunctionDefinitions(tmpJs) : new Map();
const indexCalls = extractFunctionCalls(indexHtml);

const calledButNotDefined = [];
for (const [name, positions] of indexCalls) {
    if (!indexDefs.has(name)) {
        calledButNotDefined.push({ name, count: positions.length, inTmp: tmpDefs.has(name) });
    }
}

calledButNotDefined.sort((a, b) => b.count - a.count);

const ids = extractIdsFromHtml(indexHtml);
const bindings = extractBindings(indexHtml);

const unboundIds = [];
for (const [id, positions] of ids) {
    // Only consider likely interactive elements: buttons, divs with role=button, etc.
    // For simplicity, check if id appears in an element tag and has nearby role/button class
    if (!bindings.has(id)) {
        unboundIds.push({ id, count: positions.length });
    }
}

// Restore candidates: functions in tmp but not in index
const restoreCandidates = [];
if (tmpJs) {
    for (const [name, positions] of tmpDefs) {
        if (!indexDefs.has(name)) {
            restoreCandidates.push({ name, count: positions.length, called: indexCalls.has(name), callCount: indexCalls.get(name)?.length || 0 });
        }
    }
}
restoreCandidates.sort((a, b) => (b.called ? 1 : 0) - (a.called ? 1 : 0) || b.callCount - a.callCount);

let report = '# 回归问题报告\n\n';
report += `生成时间: ${new Date().toISOString()}\n\n`;
report += `## 当前 index.html 中被调用但未定义的函数（按调用次数排序）\n\n`;
report += '| 函数名 | 调用次数 | 在 .tmp_syntax_check.js 中存在 |\n';
report += '|--------|----------|-------------------------------|\n';
for (const item of calledButNotDefined) {
    report += `| ${item.name} | ${item.count} | ${item.inTmp ? '是' : '否'} |\n`;
}

report += `\n## 建议优先恢复的函数（在 tmp 中存在、在当前 index.html 中被调用）\n\n`;
for (const item of restoreCandidates.filter(x => x.called)) {
    report += `- **${item.name}**（被调用 ${item.callCount} 次）\n`;
}

report += `\n## 当前 index.html 中缺失定义的函数（在 tmp 中存在，无论是否被调用）\n\n`;
report += '| 函数名 | 定义次数 | 是否被当前 index.html 调用 |\n';
report += '|--------|----------|---------------------------|\n';
for (const item of restoreCandidates) {
    report += `| ${item.name} | ${item.count} | ${item.called ? `是（${item.callCount} 次）` : '否'} |\n`;
}

report += `\n## 有 id 但可能未绑定事件的首页元素（需人工复核）\n\n`;
report += '以下 id 在 index.html 中出现，但未检测到 `getElementById(...).addEventListener` 或 `.onclick` 绑定。\n\n';
for (const item of unboundIds.slice(0, 100)) {
    report += `- \\"#${item.id}\\"（出现 ${item.count} 次）\n`;
}

fs.writeFileSync(outputPath, report, 'utf8');
console.log('Report written to', outputPath);
console.log('\nCalled but not defined:', calledButNotDefined.length);
console.log('Restore candidates:', restoreCandidates.length);
