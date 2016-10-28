/*global THREE, CISD792, QU*/
(function(scope, THREE, QU) {
    "use strict";
    var demo;

    scope.runST1 = function (opts) {
        demo = new scope.SimpleDemo(2, opts.target, 4);
        var square = new QU.RegularPolygon(4, "blue", "blue").getRoot();
        square.rotateOnAxis(QU.forward, QU.math.rad(45));
        demo.addToScene(square);
        demo.render();
    };

})(CISD792, THREE, QU);