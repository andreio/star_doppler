'use strict';

(function(window) {
    function VelocityControlsView(model, numberInput, sliderInput) {
        var self = this, minExpValue, maxExpValue, minLinearValue, maxLinearValue;

        self.model = model;
        self.numberInput = numberInput;
        self.sliderInput = sliderInput;
        self.currentVelocity = model.velocity;
        self.render = render;

        initialize();

        function onVelocityChanged(ev) {
            var target = ev.target, newVelocity = target.value;
            if (target === sliderInput) {
                newVelocity = toLinear(newVelocity);
            }
            if (newVelocity === self.currentVelocity) {
                return;
            }
            if (newVelocity < minLinearValue) {
                newVelocity = minLinearValue;
            }
            if (newVelocity > maxLinearValue) {
                newVelocity = maxLinearValue;
            }
            model.velocity = self.currentVelocity = newVelocity;
            render();
        }

        function fromLinear(numberValue) {
            var percentage = (numberValue - minLinearValue) / (maxLinearValue - minLinearValue);
            var expValue = percentage * (maxExpValue - minExpValue) + ((maxExpValue * minExpValue - Math.pow(minExpValue, 2)) / (maxExpValue - minExpValue));
            return Math.log(expValue);
        }
        function toLinear(sliderValue) {
            var expValue = Math.exp(sliderValue),
                percentage = (expValue - minExpValue) / (maxExpValue - minExpValue);
            var numberRange = maxLinearValue - minLinearValue;
            return minLinearValue + (percentage * numberRange);
        }

        function initialize() {
            numberInput.addEventListener("change", onVelocityChanged);
            sliderInput.addEventListener("change", onVelocityChanged);
            minExpValue = Math.exp(sliderInput.min);
            maxExpValue = Math.exp(sliderInput.max);
            minLinearValue = +numberInput.min;
            maxLinearValue = +numberInput.max;
            render();
        }

        function render() {
            numberInput.value = parseInt(self.currentVelocity);
            sliderInput.value = fromLinear(self.currentVelocity);
        }
    }

    window.VelocityControlsView = VelocityControlsView;

})(window);