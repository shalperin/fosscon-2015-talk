/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU, Rainbow) {
    "use strict";
    scope.runMC1 = function (opts) {
        var demo = new scope.SimpleDemo(100, opts.target, 25);
        var matrix = new QU.CubeMatrix(20, 20, 20, 10, scope.materials.meshBasic.tspred);
        demo.addToScene(matrix);
        demo.render();
    };

})(CISD792, THREE, QU, Rainbow);