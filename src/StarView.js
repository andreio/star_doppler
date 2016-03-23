'use strict';

(function(window) {
    function StarView(sourceImage, model, canvas) {
        var self = this;

        self.model = model;
        self.canvas = canvas;
        self.context = canvas.getContext("2d");

        initialize();

        function initialize() {
            self.context.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);
            model.imageData = self.context.getImageData(0, 0, canvas.width, canvas.height);
            model.onVelocityChanged(self.render.bind(self));
        }
    }

    StarView.prototype.render = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.putImageData(this.model.imageData, 0, 0);
    };

    window.StarView = StarView;
})(window);