QU.SegmentedCylinder = function SegmentedCylinder(n, nSegs, segLength, rad,
                                                  bottomCap, topCap, colors, mat) {

    var heights = [];
    var scales = [];
    for (var i = 0; i<nSegs; i++) {
        heights.push(segLength*i);
        scales.push(rad);
    }
    return new QU.KnottedCylinder(n, heights, scales, colors, bottomCap, topCap, mat);

};
QU.SegmentedCylinder.prototype = Object.create(QU.GameObject.prototype);
QU.SegmentedCylinder.constructor = QU.SegmentedCylinder;
