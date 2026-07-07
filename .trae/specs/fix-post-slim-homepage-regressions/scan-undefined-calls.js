/**
 * scan-undefined-calls.js
 *
 * 用途：一次性回归扫描脚本，读取项目根目录 index.html 中的内联脚本与事件处理器，
 * 提取全局函数定义和全局函数调用，输出「被调用但无定义」的可疑全局函数列表。
 *
 * 运行方式：
 *   node .trae/specs/fix-post-slim-homepage-regressions/scan-undefined-calls.js
 *
 * 输出：
 *   同目录下的 undefined-calls-report.md
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..', '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const outputPath = path.join(__dirname, 'undefined-calls-report.md');

function readFile(p) {
    try {
        return fs.readFileSync(p, 'utf8');
    } catch (e) {
        console.error('Failed to read', p, e.message);
        process.exit(1);
    }
}

// 内置构造函数 / 全局对象 / BOM / DOM 常见方法，调用时不视为可疑未定义
const BUILT_IN_GLOBALS = new Set([
    // ECMAScript built-ins
    'Array', 'ArrayBuffer', 'Atomics', 'BigInt', 'BigInt64Array', 'BigUint64Array',
    'Boolean', 'DataView', 'Date', 'Error', 'EvalError', 'Float32Array', 'Float64Array',
    'Function', 'Infinity', 'Int16Array', 'Int32Array', 'Int8Array', 'JSON', 'Map',
    'Math', 'NaN', 'Number', 'Object', 'Promise', 'Proxy', 'RangeError', 'ReferenceError',
    'Reflect', 'RegExp', 'Set', 'SharedArrayBuffer', 'String', 'Symbol', 'SyntaxError',
    'TypeError', 'URIError', 'Uint16Array', 'Uint32Array', 'Uint8Array', 'Uint8ClampedArray',
    'WeakMap', 'WeakSet',
    // Common globals / BOM
    'window', 'document', 'navigator', 'location', 'history', 'screen', 'localStorage',
    'sessionStorage', 'indexedDB', 'console', 'self', 'top', 'parent', 'frames', 'opener',
    // Timers & animation
    'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
    'requestAnimationFrame', 'cancelAnimationFrame', 'requestIdleCallback', 'cancelIdleCallback',
    // Network / encoding
    'fetch', 'WebSocket', 'URL', 'URLSearchParams', 'encodeURIComponent', 'decodeURIComponent',
    'encodeURI', 'decodeURI', 'escape', 'unescape', 'btoa', 'atob',
    // Constructors / common objects
    'Blob', 'File', 'FileReader', 'FormData', 'Headers', 'Request', 'Response',
    'XMLHttpRequest', 'EventSource', 'WebSocket', 'Worker', 'SharedWorker',
    'MutationObserver', 'IntersectionObserver', 'ResizeObserver', 'PerformanceObserver',
    'Audio', 'Image', 'Video', 'CanvasRenderingContext2D', 'speechSynthesis',
    'SpeechSynthesisUtterance', 'SpeechRecognition',
    // Dialogs
    'alert', 'confirm', 'prompt', 'print', 'open', 'close', 'getComputedStyle',
    // Type / parse helpers
    'parseInt', 'parseFloat', 'isNaN', 'isFinite',
    // Encoding / streams
    'TextEncoder', 'TextDecoder', 'AbortController',
    // Keywords / literals that can appear before (
    'eval'
]);

// 常见 DOM / BOM 方法（作为方法调用 obj.method(...) 时通常已不被视为全局调用；
// 此处额外排除独立出现的误匹配）
const COMMON_DOM_METHODS = new Set([
    'getElementById', 'querySelector', 'querySelectorAll', 'getElementsByClassName',
    'getElementsByName', 'getElementsByTagName', 'createElement', 'createTextNode',
    'appendChild', 'removeChild', 'insertBefore', 'replaceChild', 'cloneNode',
    'addEventListener', 'removeEventListener', 'dispatchEvent', 'attachEvent', 'detachEvent',
    'getAttribute', 'setAttribute', 'removeAttribute', 'hasAttribute', 'getAttributeNS',
    'setAttributeNS', 'removeAttributeNS', 'classList', 'contains', 'matches', 'closest',
    'focus', 'blur', 'click', 'submit', 'reset', 'scrollTo', 'scrollBy', 'scrollIntoView',
    'preventDefault', 'stopPropagation', 'stopImmediatePropagation',
    'getBoundingClientRect', 'getClientRects', 'queryCommandSupported',
    'toFixed', 'toPrecision', 'toString', 'toLowerCase', 'toUpperCase', 'charAt',
    'charCodeAt', 'indexOf', 'lastIndexOf', 'substring', 'substr', 'slice', 'split',
    'replace', 'match', 'search', 'trim', 'concat', 'join', 'push', 'pop', 'shift',
    'unshift', 'splice', 'slice', 'map', 'filter', 'reduce', 'forEach', 'every', 'some',
    'find', 'findIndex', 'includes', 'sort', 'reverse', 'keys', 'values', 'entries',
    'then', 'catch', 'finally',
    'log', 'warn', 'error', 'info', 'debug', 'dir', 'table', 'trace', 'assert'
]);

// 常见 false positive 名称：CSS 函数、回调形参名、通用变量名等
const LIKELY_FALSE_POSITIVE_NAMES = new Set([
    'rgba', 'rgb', 'hsla', 'hsl', 'gradient', 'linearGradient', 'radialGradient', 'conicGradient',
    'resolve', 'reject', 'url', 'data', 'options', 'config', 'params', 'ctx'
]);

// 提取内联 <script> 与事件处理器属性中的 JS 片段
function extractJsFromHtml(html) {
    const parts = [];

    // 1. <script>...</script>
    const scriptRe = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    let m;
    while ((m = scriptRe.exec(html)) !== null) {
        if (m[1] && m[1].trim()) {
            parts.push({ type: 'inline-script', code: m[1], index: m.index });
        }
    }

    // 2. 内联事件处理器：onxxx="..."
    const attrRe = /\son\w+=["']([^"']*)["']/gi;
    while ((m = attrRe.exec(html)) !== null) {
        if (m[1] && m[1].trim()) {
            parts.push({ type: 'event-handler', code: m[1], index: m.index });
        }
    }

    return parts;
}

function extractFunctionDefinitions(source) {
    const defs = new Map();

    // 1. function name(...) { ... }
    const funcRe = /(?:^|[;{}\s])function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    let m;
    while ((m = funcRe.exec(source)) !== null) {
        const name = m[1];
        if (!defs.has(name)) defs.set(name, []);
        defs.get(name).push(m.index + m[0].indexOf(name));
    }

    // 2. var/let/const name = function(...) { ... }
    const varFuncRe = /(?:^|[;{}\s])(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*function\s*\(/g;
    while ((m = varFuncRe.exec(source)) !== null) {
        const name = m[1];
        if (!defs.has(name)) defs.set(name, []);
        defs.get(name).push(m.index + m[0].indexOf(name));
    }

    // 3. var/let/const name = (...) => ...
    const arrowFuncRe = /(?:^|[;{}\s])(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:\([^)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>/g;
    while ((m = arrowFuncRe.exec(source)) !== null) {
        const name = m[1];
        if (!defs.has(name)) defs.set(name, []);
        defs.get(name).push(m.index + m[0].indexOf(name));
    }

    return defs;
}

function extractFunctionCalls(source) {
    const calls = new Map();
    // 匹配 identifier( 形式，排除：obj.method(、new Foo(、关键词如 if/for/while 等
    const callRe = /(?<![a-zA-Z0-9_$\.)])\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    let m;
    while ((m = callRe.exec(source)) !== null) {
        const name = m[1];

        // 排除 JavaScript 关键字 / 字面量
        if (/^(if|while|for|switch|catch|function|return|typeof|instanceof|new|void|delete|in|of|with|class|extends|super|this|true|false|null|undefined|debugger|yield|async|await|import|export|default|case|var|let|const)$/.test(name)) {
            continue;
        }

        // 排除内置全局对象/函数
        if (BUILT_IN_GLOBALS.has(name)) continue;

        // 排除常见 DOM/BOM 方法
        if (COMMON_DOM_METHODS.has(name)) continue;

        if (!calls.has(name)) calls.set(name, []);
        calls.get(name).push(m.index);
    }

    return calls;
}

function main() {
    const html = readFile(indexHtmlPath);
    const parts = extractJsFromHtml(html);
    const combinedSource = parts.map(p => p.code).join('\n');

    const defs = extractFunctionDefinitions(combinedSource);
    const calls = extractFunctionCalls(combinedSource);

    const calledButNotDefined = [];
    for (const [name, positions] of calls) {
        if (!defs.has(name)) {
            // 是否存在同名标识符被赋值给非函数值？简单判断：是否有 var/let/const name = 且不跟函数/箭头
            const nonFuncAssignRe = new RegExp(`(?:^|[;{}\\s])(?:var|let|const)\\s+${name}\\s*=`, 'g');
            const isLikelyVariable = nonFuncAssignRe.test(combinedSource) || LIKELY_FALSE_POSITIVE_NAMES.has(name);
            calledButNotDefined.push({
                name,
                count: positions.length,
                likelyFalsePositive: isLikelyVariable
            });
        }
    }

    calledButNotDefined.sort((a, b) => b.count - a.count);

    const generatedAt = new Date().toISOString();
    const scanScope = indexHtmlPath;

    let report = '# 未定义全局函数调用扫描报告\n\n';
    report += `生成时间: ${generatedAt}\n\n`;
    report += `扫描范围: \`${scanScope}\`（仅扫描该文件中的内联 \`<script>\` 与事件处理器属性）\n\n`;
    report += `## 扫描统计\n\n`;
    report += `- 内联 JS 片段数: ${parts.length}\n`;
    report += `- 提取到的全局函数定义数: ${defs.size}\n`;
    report += `- 提取到的全局函数调用数: ${calls.size}\n`;
    report += `- 可疑「调用但无定义」函数数: ${calledButNotDefined.length}\n\n`;

    report += `## 可疑未定义函数列表\n\n`;
    if (calledButNotDefined.length === 0) {
        report += '未发现可疑调用。\n\n';
    } else {
        report += '| 排名 | 函数名 | 调用次数 | 是否可能为 false positive |\n';
        report += '|------|--------|----------|---------------------------|\n';
        calledButNotDefined.forEach((item, idx) => {
            report += `| ${idx + 1} | \`${item.name}\` | ${item.count} | ${item.likelyFalsePositive ? '是（存在同名变量赋值）' : '否'} |\n`;
        });
        report += '\n';
    }

    report += `## false positive 过滤规则说明\n\n`;
    report += `1. **定义匹配规则**：识别 \`function name(...)\`、\`var/let/const name = function(...)\`、\`var/let/const name = (...) => ...\` 形式的全局函数定义。\n`;
    report += `2. **调用匹配规则**：匹配 \`name(\` 形式，但排除 \`obj.name(\`（方法调用）和 \`new name(\`（构造函数调用）。\n`;
    report += `3. **内置全局排除**：排除 \`Math\`、\`JSON\`、\`Array\`、\`Object\`、\`String\`、\`Number\`、\`Date\`、\`console\`、\`window\`、\`document\`、\`localStorage\`、\`fetch\`、\`setTimeout\`、\`setInterval\`、\`parseInt\`、\`Promise\`、\`Error\`、\`RegExp\`、\`Map\`、\`Set\`、\`URL\`、\`MutationObserver\`、\`Audio\`、\`Image\`、\`navigator\`、\`location\`、\`history\` 等内置全局对象/方法。\n`;
    report += `4. **DOM/BOM 方法排除**：排除 \`getElementById\`、\`querySelector\`、\`addEventListener\`、\`getAttribute\`、\`createElement\`、\`appendChild\` 等常见 DOM 方法。\n`;
    report += `5. **关键词排除**：排除 \`if\`、\`while\`、\`for\`、\`switch\`、\`catch\`、\`return\`、\`typeof\` 等关键词。\n`;
    report += `6. **false positive 标注**：若同一名称在代码中存在 \`var/let/const name = ...\` 非函数赋值，则标记为「可能是普通变量」。\n`;
    report += `7. **扫描限制**：仅扫描 \`index.html\` 内联脚本与事件处理器；不扫描外部 \`.js\` 文件；无法跨作用域精确解析局部变量、参数或闭包，因此结果需人工复核。\n\n`;

    report += `## 所有被识别的全局函数定义（供参考）\n\n`;
    const sortedDefs = Array.from(defs.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    if (sortedDefs.length === 0) {
        report += '未识别到全局函数定义。\n\n';
    } else {
        report += '| 函数名 | 定义次数 |\n';
        report += '|--------|----------|\n';
        for (const [name, positions] of sortedDefs) {
            report += `| \`${name}\` | ${positions.length} |\n`;
        }
        report += '\n';
    }

    fs.writeFileSync(outputPath, report, 'utf8');

    console.log('Scan complete.');
    console.log('Output:', outputPath);
    console.log('Parts scanned:', parts.length);
    console.log('Global function definitions found:', defs.size);
    console.log('Global function calls found:', calls.size);
    console.log('Called but not defined:', calledButNotDefined.length);
    if (calledButNotDefined.length > 0) {
        console.log('\nTop suspects:');
        calledButNotDefined.slice(0, 20).forEach(item => {
            console.log(`  ${item.name}: ${item.count}${item.likelyFalsePositive ? ' (likely variable)' : ''}`);
        });
    }
}

main();
