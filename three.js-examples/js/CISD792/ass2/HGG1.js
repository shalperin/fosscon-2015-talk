/*global THREE, CISD792, qu*/
(function(scope, THREE, qu) {
    "use strict";
    var demo;

    scope.runHGG1 = function(opts) {
        demo = new scope.SimpleDemo(18, opts.target, 4);
        demo.defaultLights();

        var stairs = new QU.Stairs(1,2,4,5, scope.materials.lambert.red);
        demo.addToScene(stairs.getRoot());

        demo.render();
    };
})(CISD792, THREE, QU);