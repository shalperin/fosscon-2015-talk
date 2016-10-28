QU.Torus = function KnottedCylinder(n, nbrKnots, outerRadius, innerRadius, startAngle, endAngle, colors, mat) {

    var heights = [],
        scales = [];

    var crossSection = QU.math.arc(nbrKnots, startAngle, endAngle, false);

    crossSection.map(function(p) {
        scales.push(  innerRadius * (p.x +.5) + outerRadius);
        heights.push(  innerRadius * (p.y + .5)  );
    });

    var ks = new QU.KnottedCylinder(n, heights, scales, colors, false, false, mat);
    return ks;
};
QU.Torus.prototype = Object.create(QU.GameObject.prototype);
QU.Torus.constructor = QU.Torus;
