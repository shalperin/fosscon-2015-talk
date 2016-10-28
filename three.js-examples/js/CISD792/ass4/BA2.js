/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU, Rainbow) {
    "use strict";
    var demo;

    function rotate(delta, obj, secondsPerRevolution) {
        obj.rotateOnAxis(QU.up,delta / secondsPerRevolution * Math.PI * 2);
    }

    function place(body, distance, angularOffset) {
        var root = new THREE.Object3D();
        body.translateX(distance);
        root.add(body);
        return root;
    }


    function solarSystem() {
        var sunMat = new THREE.MeshBasicMaterial({color: 'yellow'});
        var sunGeom = new THREE.SphereGeometry(50, 20, 20);
        var sun = new THREE.Mesh(sunGeom, sunMat);
        var earthMat = new THREE.MeshBasicMaterial({color: 'blue'});
        var earthGeom = new THREE.SphereGeometry(10, 20, 20);
        var earth = new THREE.Mesh(earthGeom, earthMat);
        var moonMat = new THREE.MeshBasicMaterial({color: 'grey'});
        var moonGeom = new THREE.SphereGeometry(1, 20, 20);
        var moon = new THREE.Mesh(moonGeom, moonMat);

        var root = new THREE.Object3D();
        root.add(sun);

        var earthObj = place(earth,100, 0);
        sun.add(earthObj);

        var moonObj = place(moon, 15, 0);
        earth.add(moonObj);

        demo.animation(function() {
            var delta =demo.clock().getDelta();
            rotate(delta, moonObj, 1);
            rotate(delta, earthObj, 5);
        });

        demo.addToScene(root);

    }

    scope.runBA2 = function (opts) {
        demo = new scope.SimpleDemo(200, opts.target, 100);
        solarSystem();
        demo.render();
    };

})(CISD792, THREE, QU, Rainbow);