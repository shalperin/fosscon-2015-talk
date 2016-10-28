/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU) {
    "use strict";

    scope.runMC2 = function (opts) {
        var demo = new scope.SimpleDemo(10, opts.target, 25);
        var zig1 = new QU.Ziggurat(30, .2 , .9, scope.materials.ramps.magenta);
        var zig2 = new QU.Ziggurat(30, .2 , .9, scope.materials.ramps.magenta);
        var zig3 = new QU.Ziggurat(30, .2 , .9, scope.materials.ramps.red);
        var zig4 = new QU.Ziggurat(30, .2 , .9, scope.materials.ramps.red);
        zig1.position.x = -2.5;
        zig2.position.x = 2.5;
        zig3.position.z = -2.5;
        zig4.position.z = 2.5;

        demo.addToScene(zig1);
        demo.addToScene(zig2);
        demo.addToScene(zig3);
        demo.addToScene(zig4);
        demo.defaultLights();
        demo.render();
    };

})(CISD792, THREE, QU);