'use strict';

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

(function(window, StarView, StarModel, VelocityControlsView) {

    var canvas = document.getElementById("star-canvas"),
        velocityNumberInput = document.getElementById("velocity-number"),
        velocityRangeInput = document.getElementById("velocity-range"),
        sourceImage = new Image(),
        starModel = new StarModel(),
        velocityView = new VelocityControlsView(starModel, velocityNumberInput, velocityRangeInput),
        starView;

    sourceImage.onload = function() {
        starView = new StarView(sourceImage, starModel, canvas);
        starView.render();
    };
    sourceImage.src = "star.png";
    
})(window, StarView, StarModel, VelocityControlsView);

