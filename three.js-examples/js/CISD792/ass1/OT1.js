/*global THREE, CISD792, qu*/
(function(scope, THREE, qu) {
    "use strict";
    var demo;

    scope.runOT1 = function(opts) {
        demo = new scope.SimpleDemo(5, opts.target, 4);
        var s = new QU.Starburst(200, "red", "green").getRoot();
        demo.addToScene(s);
        demo.render();
    };

})(CISD792, THREE, QU);