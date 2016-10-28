/*
    CISD792 | Challenge ST.2
    by Sam Halperin
 */

/**
 * An open box.
 * @param material
 * @class
 * @augments QU.GameObject
 */
QU.OpenBox = function OpenBox(material) {
    var geo = new THREE.Geometry();
    geo.vertices = [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
        [0, 0, -1],
        [1, 0, -1],
        [1, 1, -1],
        [0, 1, -1]
    ].map(function vec3(v) {
        return new THREE.Vector3(v[0],v[1],v[2]);
    });

    geo.faces = [
        //front [p1, p2, p3, nx, ny, nz]
        [0, 1, 2, 0, 0, 1],
        [0, 2, 3, 0, 0, 1],
        //left
        [0, 3, 7, -1, 0, 0],
        [0, 7, 4, -1, 0, 0],
        //bottom
        [0, 4, 5, 0, -1, 0],
        [1, 0, 5, 0, -1, 0],
        //right
        [1, 5, 2, 1, 0, 0],
        [5, 6, 2, 1, 0, 0],
        //back
        [5, 4, 6, 0, 0, -1],
        [4, 7, 6, 0, 0, -1]
    ].map(function face(v) {
         return new THREE.Face3(
            // unycreva
             v[0], v[1], v[2],
            new THREE.Vector3(v[3], v[4], v[5]));
    });

    var mesh = new THREE.Mesh(geo, material);

    mesh.position.set(-0.5, -0.5, 0.5);

    this.root = mesh;
};

QU.OpenBox.prototype = Object.create( QU.GameObject.prototype );
QU.OpenBox.prototype.constructor = QU.OpenBox;
