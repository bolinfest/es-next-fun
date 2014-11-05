es-next-fun
===========

Experiments with JS Transpilers

This is a demo of chaining several JS transformations together.
The goal to be able to write in a source language that supports
the following features, but can be transpiled into a version that
runs as ES5:

* JSX
* Flow/TypeScript type annotations
* async/await
* classes, arrow functions, and other ES6 features

The `sample.js` file contains source code that exhibits these features.

To test the transpilation:

```bash
# Install the node modules.
$ npm install

# generate out.js.
$ node .

# Run the generated code.
$ node out.js
```

Currently, everything seems to work except the `catch` block around the `await`.
