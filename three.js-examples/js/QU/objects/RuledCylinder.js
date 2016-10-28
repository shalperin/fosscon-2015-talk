/*
    CISD792 | Challenge OT.2
    by Sam Halperin
 */

/**
 * A ruled cylinder.
 * @param n - number of segments
 * @param color
 * @class
 * @augments QU.GameObject
 */
QU.RuledCylinder = function RuledCylinder(n, color) {
    var geom = new THREE.Geometry();
    var B = QU.math.pointsOnPoly(n).map(function(v) {
        return v.applyAxisAngle(QU.right, QU.math.rad(90));
    });
    var T = B.map(function(v) {
        return v.clone().add(new THREE.Vector3(0,1,0));
    });

    for (var i = 0; i<n; i++) {
        geom.vertices.push(B[i]);
        geom.vertices.push(B[(i+1)%n]);

        geom.vertices.push(T[i]);
        geom.vertices.push(T[(i+1)%n]);

        // unycreva
        geom.vertices.push(B[i]);
        geom.vertices.push(T[i]);
    }

    var mat = new THREE.LineBasicMaterial({
        color:new THREE.Color(color), linewidth: 1});
    var line = new THREE.Line(geom, mat, THREE.LinePieces);
    this.root = line;
};
QU.RuledCylinder.prototype = Object.create(QU.GameObject.prototype);
QU.RuledCylinder.constructor = QU.RuledCylinder;
