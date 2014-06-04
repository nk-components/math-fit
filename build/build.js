/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("component~stack@0.0.1", Function("exports, module",
"\n\
/**\n\
 * Expose `stack()`.\n\
 */\n\
\n\
module.exports = stack;\n\
\n\
/**\n\
 * Return the stack.\n\
 *\n\
 * @return {Array}\n\
 * @api public\n\
 */\n\
\n\
function stack() {\n\
  var orig = Error.prepareStackTrace;\n\
  Error.prepareStackTrace = function(_, stack){ return stack; };\n\
  var err = new Error;\n\
  Error.captureStackTrace(err, arguments.callee);\n\
  var stack = err.stack;\n\
  Error.prepareStackTrace = orig;\n\
  return stack;\n\
}\n\
//# sourceURL=components/component/stack/0.0.1/index.js"
));

require.modules["component-stack"] = require.modules["component~stack@0.0.1"];
require.modules["component~stack"] = require.modules["component~stack@0.0.1"];
require.modules["stack"] = require.modules["component~stack@0.0.1"];


require.register("jkroso~type@1.1.0", Function("exports, module",
"\n\
var toString = {}.toString\n\
var DomNode = typeof window != 'undefined'\n\
  ? window.Node\n\
  : Function\n\
\n\
/**\n\
 * Return the type of `val`.\n\
 *\n\
 * @param {Mixed} val\n\
 * @return {String}\n\
 * @api public\n\
 */\n\
\n\
module.exports = exports = function(x){\n\
  var type = typeof x\n\
  if (type != 'object') return type\n\
  type = types[toString.call(x)]\n\
  if (type) return type\n\
  if (x instanceof DomNode) switch (x.nodeType) {\n\
    case 1:  return 'element'\n\
    case 3:  return 'text-node'\n\
    case 9:  return 'document'\n\
    case 11: return 'document-fragment'\n\
    default: return 'dom-node'\n\
  }\n\
}\n\
\n\
var types = exports.types = {\n\
  '[object Function]': 'function',\n\
  '[object Date]': 'date',\n\
  '[object RegExp]': 'regexp',\n\
  '[object Arguments]': 'arguments',\n\
  '[object Array]': 'array',\n\
  '[object String]': 'string',\n\
  '[object Null]': 'null',\n\
  '[object Undefined]': 'undefined',\n\
  '[object Number]': 'number',\n\
  '[object Boolean]': 'boolean',\n\
  '[object Object]': 'object',\n\
  '[object Text]': 'text-node',\n\
  '[object Uint8Array]': 'bit-array',\n\
  '[object Uint16Array]': 'bit-array',\n\
  '[object Uint32Array]': 'bit-array',\n\
  '[object Uint8ClampedArray]': 'bit-array',\n\
  '[object Error]': 'error',\n\
  '[object FormData]': 'form-data',\n\
  '[object File]': 'file',\n\
  '[object Blob]': 'blob'\n\
}\n\
\n\
//# sourceURL=components/jkroso/type/1.1.0/index.js"
));

require.modules["jkroso-type"] = require.modules["jkroso~type@1.1.0"];
require.modules["jkroso~type"] = require.modules["jkroso~type@1.1.0"];
require.modules["type"] = require.modules["jkroso~type@1.1.0"];


require.register("jkroso~equals@0.3.6", Function("exports, module",
"\n\
var type = require(\"jkroso~type@1.1.0\")\n\
\n\
/**\n\
 * expose equals\n\
 */\n\
\n\
module.exports = equals\n\
equals.compare = compare\n\
\n\
/**\n\
 * assert all values are equal\n\
 *\n\
 * @param {Any} [...]\n\
 * @return {Boolean}\n\
 */\n\
\n\
 function equals(){\n\
  var i = arguments.length - 1\n\
  while (i > 0) {\n\
    if (!compare(arguments[i], arguments[--i])) return false\n\
  }\n\
  return true\n\
}\n\
\n\
// (any, any, [array]) -> boolean\n\
function compare(a, b, memos){\n\
  // All identical values are equivalent\n\
  if (a === b) return true\n\
  var fnA = types[type(a)]\n\
  var fnB = types[type(b)]\n\
  return fnA && fnA === fnB\n\
    ? fnA(a, b, memos)\n\
    : false\n\
}\n\
\n\
var types = {}\n\
\n\
// (Number) -> boolean\n\
types.number = function(a){\n\
  // NaN check\n\
  return a !== a\n\
}\n\
\n\
// (function, function, array) -> boolean\n\
types['function'] = function(a, b, memos){\n\
  return a.toString() === b.toString()\n\
    // Functions can act as objects\n\
    && types.object(a, b, memos)\n\
    && compare(a.prototype, b.prototype)\n\
}\n\
\n\
// (date, date) -> boolean\n\
types.date = function(a, b){\n\
  return +a === +b\n\
}\n\
\n\
// (regexp, regexp) -> boolean\n\
types.regexp = function(a, b){\n\
  return a.toString() === b.toString()\n\
}\n\
\n\
// (DOMElement, DOMElement) -> boolean\n\
types.element = function(a, b){\n\
  return a.outerHTML === b.outerHTML\n\
}\n\
\n\
// (textnode, textnode) -> boolean\n\
types.textnode = function(a, b){\n\
  return a.textContent === b.textContent\n\
}\n\
\n\
// decorate `fn` to prevent it re-checking objects\n\
// (function) -> function\n\
function memoGaurd(fn){\n\
  return function(a, b, memos){\n\
    if (!memos) return fn(a, b, [])\n\
    var i = memos.length, memo\n\
    while (memo = memos[--i]) {\n\
      if (memo[0] === a && memo[1] === b) return true\n\
    }\n\
    return fn(a, b, memos)\n\
  }\n\
}\n\
\n\
types['arguments'] =\n\
types.array = memoGaurd(compareArrays)\n\
\n\
// (array, array, array) -> boolean\n\
function compareArrays(a, b, memos){\n\
  var i = a.length\n\
  if (i !== b.length) return false\n\
  memos.push([a, b])\n\
  while (i--) {\n\
    if (!compare(a[i], b[i], memos)) return false\n\
  }\n\
  return true\n\
}\n\
\n\
types.object = memoGaurd(compareObjects)\n\
\n\
// (object, object, array) -> boolean\n\
function compareObjects(a, b, memos) {\n\
  var ka = getEnumerableProperties(a)\n\
  var kb = getEnumerableProperties(b)\n\
  var i = ka.length\n\
\n\
  // same number of properties\n\
  if (i !== kb.length) return false\n\
\n\
  // although not necessarily the same order\n\
  ka.sort()\n\
  kb.sort()\n\
\n\
  // cheap key test\n\
  while (i--) if (ka[i] !== kb[i]) return false\n\
\n\
  // remember\n\
  memos.push([a, b])\n\
\n\
  // iterate again this time doing a thorough check\n\
  i = ka.length\n\
  while (i--) {\n\
    var key = ka[i]\n\
    if (!compare(a[key], b[key], memos)) return false\n\
  }\n\
\n\
  return true\n\
}\n\
\n\
// (object) -> array\n\
function getEnumerableProperties (object) {\n\
  var result = []\n\
  for (var k in object) if (k !== 'constructor') {\n\
    result.push(k)\n\
  }\n\
  return result\n\
}\n\
\n\
//# sourceURL=components/jkroso/equals/0.3.6/index.js"
));

require.modules["jkroso-equals"] = require.modules["jkroso~equals@0.3.6"];
require.modules["jkroso~equals"] = require.modules["jkroso~equals@0.3.6"];
require.modules["equals"] = require.modules["jkroso~equals@0.3.6"];


require.register("component~assert@0.3.1", Function("exports, module",
"\n\
/**\n\
 * Module dependencies.\n\
 */\n\
\n\
var stack = require(\"component~stack@0.0.1\");\n\
var equals = require(\"jkroso~equals@0.3.6\");\n\
\n\
/**\n\
 * Assert `expr` with optional failure `msg`.\n\
 *\n\
 * @param {Mixed} expr\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
module.exports = exports = function (expr, msg) {\n\
  if (expr) return;\n\
  throw new Error(msg || message());\n\
};\n\
\n\
/**\n\
 * Assert `actual` is weak equal to `expected`.\n\
 *\n\
 * @param {Mixed} actual\n\
 * @param {Mixed} expected\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
exports.equal = function (actual, expected, msg) {\n\
  if (actual == expected) return;\n\
  throw new Error(msg || message());\n\
};\n\
\n\
/**\n\
 * Assert `actual` is not weak equal to `expected`.\n\
 *\n\
 * @param {Mixed} actual\n\
 * @param {Mixed} expected\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
exports.notEqual = function (actual, expected, msg) {\n\
  if (actual != expected) return;\n\
  throw new Error(msg || message());\n\
};\n\
\n\
/**\n\
 * Assert `actual` is deep equal to `expected`.\n\
 *\n\
 * @param {Mixed} actual\n\
 * @param {Mixed} expected\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
exports.deepEqual = function (actual, expected, msg) {\n\
  if (equals(actual, expected)) return;\n\
  throw new Error(msg || message());\n\
};\n\
\n\
/**\n\
 * Assert `actual` is not deep equal to `expected`.\n\
 *\n\
 * @param {Mixed} actual\n\
 * @param {Mixed} expected\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
exports.notDeepEqual = function (actual, expected, msg) {\n\
  if (!equals(actual, expected)) return;\n\
  throw new Error(msg || message());\n\
};\n\
\n\
/**\n\
 * Assert `actual` is strict equal to `expected`.\n\
 *\n\
 * @param {Mixed} actual\n\
 * @param {Mixed} expected\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
exports.strictEqual = function (actual, expected, msg) {\n\
  if (actual === expected) return;\n\
  throw new Error(msg || message());\n\
};\n\
\n\
/**\n\
 * Assert `actual` is not strict equal to `expected`.\n\
 *\n\
 * @param {Mixed} actual\n\
 * @param {Mixed} expected\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
exports.notStrictEqual = function (actual, expected, msg) {\n\
  if (actual !== expected) return;\n\
  throw new Error(msg || message());\n\
};\n\
\n\
/**\n\
 * Assert `block` throws an `error`.\n\
 *\n\
 * @param {Function} block\n\
 * @param {Function} [error]\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
exports.throws = function (block, error, msg) {\n\
  var err;\n\
  try {\n\
    block();\n\
  } catch (e) {\n\
    err = e;\n\
  }\n\
  if (!err) throw new Error(msg || message());\n\
  if (error && !(err instanceof error)) throw new Error(msg || message());\n\
};\n\
\n\
/**\n\
 * Assert `block` doesn't throw an `error`.\n\
 *\n\
 * @param {Function} block\n\
 * @param {Function} [error]\n\
 * @param {String} [msg]\n\
 * @api public\n\
 */\n\
\n\
exports.doesNotThrow = function (block, error, msg) {\n\
  var err;\n\
  try {\n\
    block();\n\
  } catch (e) {\n\
    err = e;\n\
  }\n\
  if (error && (err instanceof error)) throw new Error(msg || message());\n\
  if (err) throw new Error(msg || message());\n\
};\n\
\n\
/**\n\
 * Create a message from the call stack.\n\
 *\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
function message() {\n\
  if (!Error.captureStackTrace) return 'assertion failed';\n\
  var callsite = stack()[2];\n\
  var fn = callsite.getFunctionName();\n\
  var file = callsite.getFileName();\n\
  var line = callsite.getLineNumber() - 1;\n\
  var col = callsite.getColumnNumber() - 1;\n\
  var src = getScript(file);\n\
  line = src.split('\\n\
')[line].slice(col);\n\
  var m = line.match(/assert\\((.*)\\)/);\n\
  return m && m[1].trim();\n\
}\n\
\n\
/**\n\
 * Load contents of `script`.\n\
 *\n\
 * @param {String} script\n\
 * @return {String}\n\
 * @api private\n\
 */\n\
\n\
function getScript(script) {\n\
  var xhr = new XMLHttpRequest;\n\
  xhr.open('GET', script, false);\n\
  xhr.send(null);\n\
  return xhr.responseText;\n\
}\n\
\n\
//# sourceURL=components/component/assert/0.3.1/index.js"
));

require.modules["component-assert"] = require.modules["component~assert@0.3.1"];
require.modules["component~assert"] = require.modules["component~assert@0.3.1"];
require.modules["assert"] = require.modules["component~assert@0.3.1"];


require.register("math-fit", Function("exports, module",
"'use strict';\n\
\n\
\n\
module.exports = exports = cover;\n\
\n\
exports.cover = cover;\n\
\n\
function cover(target, container) {\n\
  return calculate(target, container, true);\n\
}\n\
\n\
\n\
exports.contain = contain;\n\
\n\
function contain(target, container) {\n\
  return calculate(target, container, false);\n\
}\n\
\n\
\n\
function calculate(target, container, cover) {\n\
  var containerW = container.width || container.w;\n\
  var containerH = container.height || container.h;\n\
  var targetW = target.width || target.w;\n\
  var targetH = target.height || target.h;\n\
\n\
  var rw = containerW / targetW;\n\
  var rh = containerH / targetH;\n\
  var r;\n\
\n\
  if (cover) {\n\
    r = (rw > rh) ? rw : rh;\n\
  } else {\n\
    r = (rw < rh) ? rw : rh;\n\
  }\n\
\n\
  return {\n\
    left: (containerW - targetW * r) >> 1,\n\
    top: (containerH - targetH * r) >> 1,\n\
    width: targetW * r,\n\
    height: targetH * r,\n\
    scale: r\n\
  };\n\
}\n\
\n\
//# sourceURL=index.js"
));

require.modules["math-fit"] = require.modules["math-fit"];


require("math-fit")
