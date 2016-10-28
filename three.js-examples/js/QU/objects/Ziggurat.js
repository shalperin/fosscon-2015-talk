// Ziggurat
// by Sam Halperin
QU.Ziggurat = function Cylinder(n, zheight, sf, ramp) {

    var obj = new THREE.Object3D();
    var materials = ramp(n);
    var asf = 1;
    for (var i = 0; i<n; i++) {
        var box = new THREE.Mesh(
            new THREE.BoxGeometry(2, zheight, 2),
            materials[i]
        );
        box.scale.set(asf, 1, asf);
        asf *= sf;
        box.position.y = i*zheight;
        obj.add(box);
    }
    return obj;

};
QU.Ziggurat.prototype = Object.create(QU.GameObject.prototype);
QU.Ziggurat.constructor = QU.Ziggurat;
