/*global THREE, CISD792, QU, Rainbow*/

// Got picking to work on windowed viewport, but
// ran out of time to get waves to interact nicely.

(function(scope, THREE, QU, Rainbow) {
    "use strict";
    var demo;

    var m = 30, n=30, offset=2.2;

    var plainColor = null;
    var nbrColors = 201;
    var colors;

    var selectedSquares = [];
    var curWaves = [];

    var waveRate = 8.0;
    var waveLimit = 10;

    var maxHeight = 1.5;
    var minHeight = -1.5;
    var heightRange = maxHeight - minHeight;

    var theObjects = [];

    function squareGeom() {
        var geom = new THREE.Geometry();
        var vertices = [new THREE.Vector3(1, 1, 0), new THREE.Vector3(1, -1, 0),
            new THREE.Vector3(-1, -1, 0), new THREE.Vector3(-1, 1, 0)];
        for (var i = 0; i < vertices.length; i++)
            geom.vertices.push(vertices[i]);
        var faces = [[0, 1, 3], [3, 1, 2]];
        var normal = new THREE.Vector3(0, 0, 1);
        for (var i = 0; i < faces.length; i++)
            geom.faces.push(new THREE.Face3(faces[i][0], faces[i][1], faces[i][2], normal));
        return geom;
    }

    function createMatrixOfSquares(m, n, offset) {
        // fit into 10x10 square
        var root = new THREE.Object3D();
        root.scale.x = 10 / m*offset;
        root.scale.y = 10 / n*offset;

        offset = offset !== undefined ? offset : 2.0;
        var geom = squareGeom();
        var xMin = -offset * ((m-1) / 2.0);
        var yMin = -offset * ((n-1) / 2.0);
        var mn = m * n;
        for (var i = 0, x = xMin; i < m; i++, x += offset) {
            for (var j = 0, y = yMin; j < n; j++, y += offset) {
                var mat = new THREE.MeshBasicMaterial({color: plainColor, shading: THREE.FlatShading, side: THREE.DoubleSide});
                var square = new THREE.Mesh(geom, mat);
                square.position.x = x;
                square.position.y = y;
                square.i = i;
                square.j = j;
                root.add(square);
                theObjects.push(square);
            }
        }
        return root;
    }

    function createScene() {
        initializeColors();
        var matrixOfSquares = createMatrixOfSquares(m, n, offset);
        demo.addToScene(matrixOfSquares);
    }

    function initializeColors() {
        if (nbrColors % 2 == 0) {
            nbrColors++;
        }
        colors = new Array(nbrColors);
        var nbrColors2 = (nbrColors - 1) / 2;
        var hues = [Math.random(), Math.random()];
        for (var j = 0; j < nbrColors2; j++) {
            var sat = 1 - j/nbrColors2;
            colors[j] = new THREE.Color().setHSL(hues[0], sat, 0.5);
            colors[nbrColors-j-1] = new THREE.Color().setHSL(hues[1], sat, 0.5);
        }
        plainColor = colors[nbrColors2] = new THREE.Color().setHSL(0, 0, 0.5);
    }

    function animation() {
        var delta = demo.clock().getDelta();
        for (var i = 0; i< selectedSquares.length; i++) {
            if (selectedSquares[i]) {
                curWaves[i] += (waveRate * delta);
            }
        }
        updateSquares();
    }

    function updateSquares() {
        for (var i = 0; i< selectedSquares.length; i++) {
            if (selectedSquares[i]) {
                updateSquaresHelper(selectedSquares[i], curWaves[i]);
            }
        }
    }

    function updateSquaresHelper(theSelectedSquare, curWave) {
        var changed = false;
        for (var i = 0; i < theObjects.length; i++) {
            var obj = theObjects[i];
            var dist = distance(theSelectedSquare, obj);
            var delta = curWave - dist;  // distance between wavefront and this square
            if (delta > waveLimit) {
                obj.position.z = 0;
                obj.material.color = plainColor;
            } else if (delta > 0) {
                var ht = heightFunction(delta);
                obj.position.z =  ht;
                obj.material.color = colorFunction(ht);
                changed = true;
            }
        }
        if (!changed) {
            var iwave = selectedSquares.indexOf(theSelectedSquare);
            curWaves[iwave] = null;
            theSelectedSquare.material.color = plainColor;
            selectedSquares[iwave] = null;
            initializeColors();
        }
    }

    function distance(sq1, sq2) {
        var dx = sq1.i - sq2.i;
        var dy = sq1.j - sq2.j;
        return Math.sqrt(dx*dx + dy*dy);
    }

    function heightFunction(delta) {
        return maxHeight * Math.sin(0.5*delta);
    }

    function colorFunction(ht) {
        var colorIndex = Math.floor(((ht - minHeight) / heightRange) * nbrColors);
        return colors[colorIndex];
    }

    //http://stackoverflow.com/questions/7984471/how-to-get-clicked-element-in-three-js
    //http://soledadpenades.com/articles/three-js-tutorials/object-picking/
    //http://stackoverflow.com/questions/3234977/using-jquery-how-to-get-click-coordinates-on-the-target-element
    function setUpPicking(target, camera, objects, handlePick) {
        target.click(function pick(e) {
            // range (-1, 1)
            var normalizedClickX = ((e.pageX - $(this).offset().left) / target.width()) * 2 - 1,
                normalizedClickY = ((e.pageY - $(this).offset().top) / target.height()) * -2 + 1;

            var mouseVector = new THREE.Vector3(
                normalizedClickX,
                normalizedClickY,
                .05
            );

            mouseVector.unproject(camera);
            var ray = new THREE.Raycaster(camera.position, mouseVector.sub(camera.position).normalize());
            var intersects = ray.intersectObjects(objects);

            if (intersects.length > 0) {
                handlePick(intersects[0].object);
            }
        });
    }

    scope.runMFWA1 = function (opts) {
        demo = new scope.SimpleDemo(50, opts.target, 100);
        createScene();
        demo.animation(animation);
        demo.render();
        setUpPicking(demo.target(), demo.camera(), theObjects, function(pickedObject) {
            curWaves.push(0);
            selectedSquares.push(pickedObject);
        });
    };

})(CISD792, THREE, QU, Rainbow);