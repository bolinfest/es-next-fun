/** Reads sample.js and transpiles it to out.js. */
var fs = require('fs');
var path = require('path');
var reactTools = require('react-tools');
var regenerator = require('regenerator');

var src = path.join(__dirname, 'sample.js');
var code = fs.readFileSync(src, 'utf-8');

// Use recast with the regenerator transform for yield/async/await transforms.
var recast = require('recast');
var ast = recast.parse(code);
ast = regenerator.transform(ast);

// TODO(mbolin): When jstransform uses recast, then use that here
// for the JSX/ES6/type-annotation transforms.
// For now, we have to serialize the AST back out to source so that
// we can run jstransform on it.
code = recast.print(ast).code;
var options = {
  harmony: true,
  stripTypes: true,
};
code = reactTools.transform(code, options);

// We could use {includeRuntime: true} to include the recast runtime when
// we generate the JS, but that just creates extra work for jstransform.
var regeneratorRuntime = fs.readFileSync(regenerator.runtime.path, 'utf-8');
var out = path.join(__dirname, 'out.js');
fs.writeFileSync(out, regeneratorRuntime + '\n' + code);

console.log('%s has been transpiled to %s', src, out);
