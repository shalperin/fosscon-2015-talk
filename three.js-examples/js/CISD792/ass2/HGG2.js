/*global THREE, CISD792, qu*/
(function(scope, THREE, qu) {
    "use strict";
    var demo;

    scope.runHGG2 = function(opts) {
        demo = new scope.SimpleDemo(15, opts.target, 20);
        demo.defaultLights();

        var mat = new THREE.MeshLambertMaterial({
            shading: THREE.FlatShading,
            vertexColors: THREE.FaceColors,
            side: THREE.DoubleSide
        });
        var cylinder1 = new QU.Cylinder(12, 6, 2, true, true, new THREE.Color("#ff0000"), mat);
        demo.addToScene(cylinder1.getRoot());

        demo.render();
    };
})(CISD792, THREE, QU);