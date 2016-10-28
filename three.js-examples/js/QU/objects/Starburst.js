/*
    CISD792 | Challenge OT.1
    by Sam Halperin
 */

/**
 * A starburst.
 * @param n - number of line segments
 * @param innerColor
 * @param outerColor
 * @class
 * @augments QU.GameObject
 */
QU.Starburst = function(n, innerColor, outerColor) {
    var geom = new THREE.Geometry();
    var mat = new THREE.LineBasicMaterial({vertexColors: true, linewidth: 1});

    var center = new THREE.Vector3(0,0,0);

    for (var i = 0; i< n; i++) {
        geom.vertices.push(center);
        geom.colors.push(new THREE.Color(innerColor));
        geom.vertices.push(QU.math.randomPointOnSphere());
        geom.colors.push(new THREE.Color(outerColor));
    }
    // unycreva
    this.root = new THREE.Line(geom, mat, THREE.LineStrip);
};

QU.Starburst.prototype = Object.create( QU.GameObject.prototype );
QU.Starburst.prototype.constructor = QU.Starburst;
