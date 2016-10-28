/*
    CISD792 | Challenge ST.1, ST3
    by Sam Halperin
 */
/**
 * A regular polygon
 * @param n - Number of sides
 * @param color1 - center color
 * @param color2 - outer color
 * @augments QU.GameObject
 */
QU.RegularPolygon = function regularPolygon(n, color1, color2) {
   var  geom = new THREE.Geometry(),
        center = new THREE.Vector3(0, 0,0),
        color1 = new THREE.Color(color1),
        color2 = new THREE.Color(color2);

    geom.vertices.push(center);
    geom.vertices = geom.vertices.concat(QU.math.pointsOnPoly(n));


    for (var i = 0; i<n; i++) {
        // unycreva
        var face = new THREE.Face3(
            0,
            (i + 2) % (n + 1) || 1,
            (i + 1) % (n + 1));
        face.vertexColors = [color1, color2, color2];
        geom.faces.push(face);
    }

    var mat = new THREE.MeshBasicMaterial( {
        vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide});

    this.root = new THREE.Mesh(geom, mat);
};
QU.RegularPolygon.prototype = Object.create(QU.GameObject.prototype);
QU.RegularPolygon.constructor = QU.RegularPolygon;