/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU, Rainbow) {
    "use strict";
    var demo;

    function createTorus() {
        var n = 36,
            nbrKnots = 36,
            outerRadius = 50,
            innerRadius = 15,
            colors = [],
            mat1 = new THREE.MeshBasicMaterial({
                shading: THREE.FlatShading,
                vertexColors: THREE.FaceColors,
                side: THREE.DoubleSide
            }),
            mat2 = new THREE.MeshBasicMaterial({
                wireframe:true
            }),

            rainbow = new Rainbow("black", "red");

        rainbow.setNumberRange(0, nbrKnots);
        for (var i = 0; i<nbrKnots; i++) {
            colors.push(new THREE.Color("#"+rainbow.colorAt(i)))
        }

        var T = [
            {
                startAngle: 0,
                endAngle: QU.math.rad(360),
                tx: 50,
                mat: mat2
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

    scope.runTorusFly = function (opts) {
        demo = new scope.SimpleDemoFly(25);
        createTorus();
        demo.render();
    };

})(CISD792, THREE, QU, Rainbow);