/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU, dat) {
    "use strict";

    scope.runMC3 = function (opts) {
        var demo = new scope.SimpleDemo(10, opts.target, 25);
        var zig;

        var controls = new function() {
            this.n = 30;
            this.zheight = .2;
            this.sf = .9;
            this.go = function() {
                demo.scene().remove(zig);
                zig = new QU.Ziggurat(this.n, this.zheight , this.sf,
                scope.materials.ramps.yellow);
                demo.addToScene(zig);
            };
        };

        var gui = new dat.GUI();
        gui.add(controls, 'n', 1, 100).step(1);
        gui.add(controls, 'zheight',.1, 5).step(.1);
        gui.add(controls, 'sf',.1, 1).step(.02);
        gui.add(controls, "go");

        demo.defaultLights();
        controls.go()
        demo.render();
    };

})(CISD792, THREE, QU, dat);