# math-fit [![browser support](https://ci.testling.com/nk-components/math-fit.png)](https://ci.testling.com/nk-components/math-fit)

Calculates the size and the position of a target to fit a container.

## Installation

With [npm](http://npmjs.org) do:

```bash
$ npm install math-fit --save
```

Install with [component(1)](http://component.io):

```bash
$ component install nk-components/math-fit
```

## Usage

```js
var fit = require('math-fit');
var target = {
  w: 200, // or width: 200
  h: 100 // or height: 100
};
var parent = {
  w: 200, // or width: 200
  h: 200 // or height: 200
};

var coverValues = fit(target, parent); // same as fit.cover(target, parent);
//
// >>
// {
//  left: float,
//  top: float,
//  width: float,
//  height: float,
//  scale: float
// }

var containValues = fit.contain(target, parent);
```

## License

MIT
