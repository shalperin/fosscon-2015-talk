QU.Stairs = function Stairs(riser, tread, width, nbrStairs, mat) {

    var geom = new THREE.Geometry();

    for (var i = 0; i< nbrStairs; i++) {
        [
            //riser
            [0, i * riser, i * tread],
            [width, i * riser, i * tread],
            [width, (i + 1) * riser, i * tread],
            [0, (i + 1) * riser, i * tread],

            //tread
            [0, (i+1) * riser, i * tread],
            [width, (i+1) * riser, i * tread],
            [width, (i+1) * riser, (i + 1) * tread],
            [0, (i+1) * riser, (i + 1) * tread]

        ].map(function (v) {
                geom.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));
            });

        [
            //riser
            [8*i, 8*i + 1, 8*i + 2],
            [8*i, 8*i + 2, 8*i + 3],
            //tread
            [8*i + 4, 8*i + 5, 8*i + 6],
            [8*i + 6, 8*i + 7, 8*i +4]
        ].map(function (f) {
                geom.faces.push(new THREE.Face3(f[0], f[1], f[2]));
            });
    }
    geom.computeFaceNormals();
    this.root = new THREE.Mesh(geom, mat);
};
QU.Stairs.prototype = Object.create(QU.GameObject.prototype);
QU.Stairs.constructor = QU.Stairs;
