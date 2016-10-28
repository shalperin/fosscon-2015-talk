/*global THREE, CISD792, QU*/
(function(scope, THREE, QU) {
    "use strict";
    var demo;

    function createSegmentedCylinder() {
        var nSegs = 20,
            n = 24,
            segLength= 1,
            rad = 3,
            bottomCap =true,
            topCap = true,
            segColors = [];

        // external library for color interpolation
        var rainbow = new Rainbow();
		rainbow.setNumberRange(0, nSegs);

        // create an array of segment colors
        for (var i = 0; i<nSegs; i++) {
            segColors.push(new THREE.Color("#"+rainbow.colorAt(i)))
        }

        // and a material
        var mat = new THREE.MeshBasicMaterial({
            shading: THREE.FlatShading,
            vertexColors: THREE.FaceColors,
            side: THREE.DoubleSide
        });

        // Now use QU to create the cylinder.
        var segCyl = new QU.SegmentedCylinder(n, nSegs, segLength, rad,
                                                  bottomCap, topCap, segColors, mat);

        demo.addToScene(segCyl.getRoot());
    }

    scope.runHGG3 = function (opts) {
        demo = new scope.SimpleDemo(50, opts.target, 25);
        createSegmentedCylinder();
        demo.render();
    };

})(CISD792, THREE, QU);