QU.Pyramid = function Pyramid(n, rad, len, mat) {

    var len2 = len / 2;
    var geom = new THREE.Geometry();
    // push n + 1 vertices
    //  first the apex...
    geom.vertices.push(new THREE.Vector3(0, len2, 0));
    //  and then the vertices of the base
    var inc = 2 * Math.PI / n;
    for (var i = 0, a = 0; i < n; i++, a += inc) {
        var cos = Math.cos(a);
        var sin = Math.sin(a);
        geom.vertices.push(new THREE.Vector3(rad * cos, -len2, rad * sin));
    }
    // push the n triangular faces...
    for (var i = 1; i < n; i++) {
        var face = new THREE.Face3(i+1, i, 0);
        geom.faces.push(face);
    }
    var face = new THREE.Face3(1, n, 0);
    geom.faces.push(face);
    // and then push the n-2 faces of the base
    for (var i = 2; i < n; i++) {
        var face = new THREE.Face3(i, i+1, 1);
        geom.faces.push(face);
    }
    // set face normals and return the geometry
    geom.computeFaceNormals();

    this.root = new THREE.Mesh(geom, mat);
};
QU.Pyramid.prototype = Object.create( QU.GameObject.prototype );
QU.Pyramid.prototype.constructor = QU.Pyramid;
