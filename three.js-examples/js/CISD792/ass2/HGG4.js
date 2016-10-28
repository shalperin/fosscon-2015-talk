/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU, Rainbow) {
    "use strict";
    var demo;

    function createKnottedCylinder() {
        var n = 24,
            bottomCap =true,
            topCap = true,
            heights = [0.0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6, 4.0, 4.1, 4.2, 4.3, 4.3],
            scales =  [1.8, 1.95, 2.0, 1.95, 1.8, 1.5, 1.2, 1.05, 1.0, 1.05, 1.15, 1.25, 1.35, 1.45, 1.5],
            colors = [],
            rainbow = new Rainbow(),
            mat,
            knottedCyl;

        rainbow.setNumberRange(0, heights.length);
        for (var i = 0; i<heights.length; i++) {
            colors.push(new THREE.Color("#"+rainbow.colorAt(i)))
        }

        mat = new THREE.MeshBasicMaterial({
            shading: THREE.FlatShading,
            vertexColors: THREE.FaceColors,
            side: THREE.DoubleSide
        });

        // Now use QU to create the cylinder.
        knottedCyl = new QU.KnottedCylinder(n, heights, scales, colors,
            bottomCap, topCap, mat);

        demo.addToScene(knottedCyl.getRoot());
    }

    scope.runHGG4 = function (opts) {
        demo = new scope.SimpleDemo(10, opts.target, 25);
        createKnottedCylinder();
        demo.render();
    };

})(CISD792, THREE, QU, Rainbow);