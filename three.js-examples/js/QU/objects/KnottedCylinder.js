QU.KnottedCylinder = function KnottedCylinder(n, heights, scales, colors,
                                                  bottomCap, topCap, mat) {

    var geom = new THREE.Geometry(),
        i,
        s = heights.length;


    if (heights.length != scales.length) {
        throw "lengths mismatch: " +
                "heights " + heights.length +
                " scales " + scales.length
    }
    if (heights.length != colors.length) {
        console.log("warn lengths mismatch for colors: " +
                "heights/scales " + heights.length +
                " colors " + colors.length);
    }


    // vertices
    var pointsOnPoly = QU.math.pointsOnPoly(n);
    for (var l = 0; l<s; l++) {
        pointsOnPoly.map(function (v) {
            var p = v.clone();
            p.add(new THREE.Vector3(0, 0, heights[l]));
            var scale = new THREE.Matrix3();
            scale.set(
                scales[l],     0,              0,
                0,             scales[l],     0,
                0,             0,              1);
            p.applyMatrix3(scale);
            geom.vertices.push(p);
        });
    }


    //faces
    for (var seg = 0; seg<s-1; seg++) {
        for (i = 0; i < n; i++) {
            var p0 = (n * seg) + i,
                p1 = (n * seg) + (i + 1) % n,
                p2 = p1 + n,
                p3 = p0 + n;
            var f1 = new THREE.Face3(p0, p1, p2);
            var f2 = new THREE.Face3(p2, p3, p0);
            f1.color = colors[seg];
            f2.color = colors[seg];
            geom.faces.push(f1);
            geom.faces.push(f2);
        }
    }


    // caps
    for (i = 0; i< n-2; i++) {
        if (topCap) {
            var f = new THREE.Face3(0, i + 1, i + 2);
            f.color = colors[0];
            geom.faces.push(f);
        }
        if (bottomCap) {
            var f2 = new THREE.Face3(n*(s-1), (n*(s-1)) + i + 1, (n*(s-1)) + i + 2);
            f2.color = colors[colors.length -1];
            geom.faces.push(f2);
        }
    }

    // reposition and return
    geom.computeFaceNormals();
    var mesh = new THREE.Mesh(geom, mat);
    mesh.rotateOnAxis(QU.right, QU.math.rad(-90));
    //mesh.translateZ(-heights[heights.length -1]/2);
    this.root = mesh;
};
QU.KnottedCylinder.prototype = Object.create(QU.GameObject.prototype);
QU.KnottedCylinder.constructor = QU.KnottedCylinder;
