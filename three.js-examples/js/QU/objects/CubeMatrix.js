// CubMatrix
// by Sam Halperin
QU.CubeMatrix = function Cylinder(m, n, o, offset, material) {

    var obj = new THREE.Object3D();
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        material
    );
    for (var x = 0; x< m; x++) {
        for (var y = 0; y< n; y++) {
            for (var z = 0; z < o; z++) {
                var newBox = box.clone();
                newBox.position.x = x * offset;
                newBox.position.y = y * offset;
                newBox.position.z = z * offset;
                obj.add(newBox);
            }
        }
    }
    obj.translateX(-.5 * (m-1) * offset);
    obj.translateY(-.5 * (n-1) * offset);
    obj.translateZ(-.5 * (o-1) * offset);

    return obj;

};
QU.CubeMatrix.prototype = Object.create(QU.GameObject.prototype);
QU.CubeMatrix.constructor = QU.CubeMatrix;
