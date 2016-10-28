/*global THREE, CISD792, QU*/
(function(scope, THREE, QU) {
    "use strict";
    var demo;

    scope.runOT2 = function(opts) {
        demo = new scope.SimpleDemo(5, opts.target, 4);
        demo.addToScene(new QU.RuledCylinder(10, "red").getRoot());
        demo.render();
    };

})(CISD792, THREE, QU);