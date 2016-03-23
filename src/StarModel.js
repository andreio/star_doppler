'use strict';

(function(window,Math){
    function StarModel() {
        var self = this, velocityChangedListeners = [], velocity = 0, imageData = null;
        
        self.onVelocityChanged = onVelocityChanged;

        initialize();

        function initialize() {
            Object.defineProperties(self, {
                velocity: {
                    get: function() {
                        return velocity;
                    },
                    set: function(value) {
                        velocity = value;
                        notifyVelocityListeners();
                    }
                },
                imageData: {
                    get: function() {
                        return correctedImage();
                    },
                    set: function(value) {
                        imageData = value;
                    }
                }
            });
        }
        function correctedImage() {
            if (velocity === 0) {return imageData;}
            var shiftedImageData = new ImageData(imageData.data.slice(), imageData.width, imageData.height), i,
            rgb = rgbBlock(shiftedImageData.data,0);
            for (i = 0; i < shiftedImageData.data.length; i += 4) {
                rgb.pixelIndex = i;
                var shiftPercentage = (Math.abs(velocity)/100.0);
                if (velocity < 0) {
                    rgb.blue +=  shiftPercentage * (255-rgb.blue);
                    rgb.red -= shiftPercentage * rgb.red;
                } else {
                    rgb.blue -= shiftPercentage * rgb.blue;
                    rgb.red += shiftPercentage * (255-rgb.red);
                }
                rgb.green -= shiftPercentage * rgb.green;
            }
            return shiftedImageData;
        }
        function onVelocityChanged(callback) {
            velocityChangedListeners.push(callback);
        }
        function notifyVelocityListeners() {
            velocityChangedListeners.forEach(function(callback) {
                callback.call(null);
            });
        }
        function rgbBlock(arr) {
            var params = ['red', 'green', 'blue'],
                block = {
                    pixelIndex :0
                 };
                params.forEach(function(param, paramIndex) {
                    Object.defineProperty(block,param, {
                        get: function() { return arr[block.pixelIndex + paramIndex]; },
                        set: function(value) { 
                            arr[block.pixelIndex + paramIndex] = (value.clamp(0,255)); }
                    })
                });
               
                return block;
            }
    }

    window.StarModel = StarModel;

})(window,Math)