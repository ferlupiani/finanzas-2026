
// Full polyfills for Node runtime
if (!Object.hasOwn) {
  Object.hasOwn = function(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}
if (!global.globalThis) {
  global.globalThis = global;
}
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(str, newStr) {
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }
    return this.replace(new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newStr);
  };
}

const fs = require('fs');
const Babel = require('./assets/babel.min.js');

try {
  const input = fs.readFileSync('./src/app.jsx', 'utf8');
  const transformed = Babel.transform(input, {
    presets: [
      ['react', { runtime: 'classic' }]
    ],
    compact: false
  });
  fs.writeFileSync('./assets/app.js', transformed.code, 'utf8');
  console.log('Successfully compiled classic JSX -> assets/app.js (' + transformed.code.length + ' bytes)');
} catch (err) {
  console.error('Compilation error:', err);
  process.exit(1);
}
