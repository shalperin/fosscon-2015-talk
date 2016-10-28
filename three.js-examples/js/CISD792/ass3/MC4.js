/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU) {
    "use strict";

    scope.runMC4 = function (opts) {
        var demo = new scope.SimpleDemo(10, opts.target, 25);
        var mat = new THREE.MeshLambertMaterial({color: 'blue'});
        var geom = new THREE.SphereGeometry(1, 12, 12);
        var mesh = new THREE.Mesh(geom, mat);

        var helix = new QU.Helix(mesh, 49, 2, Math.PI/4,0.5);

        demo.addToScene(helix.getRoot());
        demo.defaultLights();
        demo.render();
    };

})(CISD792, THREE, QU);