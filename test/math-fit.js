/*global describe, it */

var assert = require('assert');
var fit = require('math-fit');


describe('math-fit', function() {

  it('should have cover and contain function', function(done) {
    assert.equal(typeof fit.cover, 'function');
    assert.equal(typeof fit.contain, 'function');
    done();
  });

  it('should cover', function(done) {
    var res = fit({
      w: 200,
      h: 100
    }, {
      w: 200,
      h: 200
    });

    assert.equal(res.left, -100);
    assert.equal(res.top, 0);
    assert.equal(res.width, 400);
    assert.equal(res.height, 200);
    assert.equal(res.scale, 2);

    done();
  });

  it('should contain', function(done) {
    var res = fit.contain({
      w: 100,
      h: 250
    }, {
      w: 200,
      h: 200
    });

    assert.equal(res.left, 60);
    assert.equal(res.top, 0);
    assert.equal(res.width, 80);
    assert.equal(res.height, 200);
    assert.equal(res.scale, 0.8);

    done();
  });

});
