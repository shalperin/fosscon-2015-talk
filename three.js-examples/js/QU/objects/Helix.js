// Helix
// by Sam Halperin
QU.Helix = function(g, n, radius, thetaStep, yStep) {
    this.root = new THREE.Object3D();
    for (var i = 0, y= 0, theta=0; i<n; i++, y+=yStep, theta+=thetaStep) {
        var angle = theta % (2 * Math.PI);
        var obj;
        if(typeof(g) == "function") {
            obj = g(i);
        } else {
            obj = g.clone();
        }
        obj.rotateOnAxis(new THREE.Vector3(0, 1, 0), angle);
        obj.translateY(y);
        obj.translateX(radius);
        this.root.add(obj);
    }
};
QU.Helix.prototype = Object.create(QU.GameObject.prototype);
QU.Helix.constructor = QU.Helix;
