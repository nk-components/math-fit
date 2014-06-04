'use strict';


module.exports = exports = cover;

exports.cover = cover;

function cover(target, container) {
  return calculate(target, container, true);
}


exports.contain = contain;

function contain(target, container) {
  return calculate(target, container, false);
}


function calculate(target, container, cover) {
  var containerW = container.width || container.w;
  var containerH = container.height || container.h;
  var targetW = target.width || target.w;
  var targetH = target.height || target.h;

  var rw = containerW / targetW;
  var rh = containerH / targetH;
  var r;

  if (cover) {
    r = (rw > rh) ? rw : rh;
  } else {
    r = (rw < rh) ? rw : rh;
  }

  return {
    left: (containerW - targetW * r) >> 1,
    top: (containerH - targetH * r) >> 1,
    width: targetW * r,
    height: targetH * r,
    scale: r
  };
}
