/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU, Rainbow) {
    "use strict";
    var demo;

    function randomColor() {
        var r = Math.round(Math.random() * 256);
        var g = Math.round(Math.random() * 256);
        var b = Math.round(Math.random() * 256);
        return new THREE.Color("rgb("+r+","+g+","+b+")");
    }

    function randBetween(max, min) {
        return (max - min) * Math.random() + min;
    }
    function randomBoxes(nbrBoxes, minSide, maxSide, minHeight, maxHeight, minBound, maxBound) {
        for (var i = 0; i < nbrBoxes; i++) {
            var side = randBetween(maxSide, minSide);
            var height = randBetween(maxHeight, minHeight);
            var xpos = randBetween(maxBound.x, minBound.x);
            var ypos = .5 * height;
            var zpos = randBetween(maxBound.y, minBound.y);

            var box = new THREE.Mesh(
                new THREE.BoxGeometry(side, height, side),
                new THREE.MeshBasicMaterial({color: randomColor()})
            );
            demo.addToScene(box);
            box.position.set(xpos, ypos, zpos);

        }
    }
    function createFloor(size) {
        var geom = new THREE.Geometry();
        [
            [-size, 0, -size],
            [-size, 0, size],
            [size,0,size],
            [size,0,-size]
        ].map(
            function(a) {
                geom.vertices.push(new THREE.Vector3(a[0], a[1], a[2]));
            }
        );

        geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geom.faces.push( new THREE.Face3( 0, 2, 3 ) );

        demo.addToScene(new THREE.Mesh(geom, scope.materials.meshBasic.grey));
    }

    scope.runC1 = function (opts) {
        demo = new scope.SimpleDemo(500, opts.target, 100);
        demo.camera().translateY(35);
        createFloor(110);
        randomBoxes(100, 10, 30, 10, 60,
            new THREE.Vector2(-100, -100),
            new THREE.Vector2(100, 100));
        demo.render();
    };

})(CISD792, THREE, QU, Rainbow);