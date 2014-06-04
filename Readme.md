[![browser support](https://ci.testling.com/nk-components/math-fit.png)](https://ci.testling.com/nk-components/math-fit)

# math-fit

  Calculates the size and the position of a target to fit a container.

## Installation

  Install with [component(1)](http://component.io):

    $ component install nk-components/math-fit

## API

### cover(target, container)
  * target: `{ width: float, height: float }` or `{ w: float, h: float }`
  * container: `{ width: float, height: float }` or `{ w: float, h: float }`

  Returns `{ left: float, top: float, width: float, height: float, scale: float }`

### contain(target, container)
  * target: `{ width: float, height: float }` or `{ w: float, h: float }`
  * container: `{ width: float, height: float }` or `{ w: float, h: float }`

  Returns `{ left: float, top: float, width: float, height: float, scale: float }`

## Usage

    var fit = require('math-fit');
    var target = {
      w: 200,
      h: 100
    };
    var parent = {
      w: 200,
      h: 200
    };

    var coverValues = fit(target, parent);
    // same as fit.cover(target, parent);

    var containValues = fit.contain(target, parent);

## License

  The MIT License (MIT)
