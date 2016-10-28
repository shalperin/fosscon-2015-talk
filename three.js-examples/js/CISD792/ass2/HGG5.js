/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU, Rainbow) {
    "use strict";
    var demo;

    function createTorus() {
        var n = 36,
            nbrKnots = 36,
            outerRadius = 20,
            innerRadius = 5,
            colors = [],
            mat1 = new THREE.MeshBasicMaterial({
                shading: THREE.FlatShading,
                vertexColors: THREE.FaceColors,
                side: THREE.DoubleSide
            }),
            mat2 = new THREE.MeshBasicMaterial({
                wireframe:true
            }),

            rainbow = new Rainbow(),
            torus;

        rainbow.setNumberRange(0, nbrKnots);
        for (var i = 0; i<nbrKnots; i++) {
            colors.push(new THREE.Color("#"+rainbow.colorAt(i)))
        }

        var T = [
            {
                startAngle: 0,
                endAngle: QU.math.rad(360),
                tx: -60,
                mat: mat2
            },
            {
                startAngle: 0,
                endAngle: QU.math.rad(180),
                tx: 0,
                mat: mat1
            },
            {
                startAngle: QU.math.rad(180),
                endAngle: QU.math.rad(360),
                tx: 60,
                mat: mat1
            }
        ]

        for (var i in T) {
            var t = new QU.Torus(
                n, nbrKnots, outerRadius, innerRadius,
                T[i].startAngle, T[i].endAngle,colors, T[i].mat).getRoot();
            t.translateX(T[i].tx);
            demo.addToScene(t);
        }
    }

    scope.runHGG5 = function (opts) {
        demo = new scope.SimpleDemo(100, opts.target, 25);
        createTorus();
        demo.render();
    };

})(CISD792, THREE, QU, Rainbow);