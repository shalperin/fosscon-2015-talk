QU.Cylinder = function Cylinder(n, len, rad, bottomCap, topCap, color, mat) {

    var heights = [0, len];
    var scales = [rad, rad];
    var colors = [color, color];
    return new QU.KnottedCylinder(n, heights, scales, colors, bottomCap, topCap, mat);


};
QU.Cylinder.prototype = Object.create(QU.GameObject.prototype);
QU.Cylinder.constructor = QU.Cylinder;
