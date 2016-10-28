/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU) {
    "use strict";

    scope.runMC5 = function (opts) {
        var demo = new scope.SimpleDemo(400, opts.target, 25);

        function geomGenerator(n) {
            var rampSize = 50;
            var rainbow = new Rainbow()
            rainbow.setNumberRange(0, rampSize);
            var mat = new THREE.MeshLambertMaterial({
                color: "#"+rainbow.colorAt(n%rampSize)});
            var geom = new THREE.TorusKnotGeometry(5, 2)
            var mesh = new THREE.Mesh(geom, mat);
            return mesh;
        }

        var helix = new QU.Helix(geomGenerator, 100, 10, Math.PI/4,5);

        demo.addToScene(helix.getRoot());
        demo.defaultLights();
        demo.render();
    };

})(CISD792, THREE, QU);