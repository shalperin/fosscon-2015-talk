/*global THREE, CISD792, QU*/
(function(scope, THREE, QU) {
    var demo;

    function init(opts) {
         var cameraZ = 2,
             axisLength = 4;
        demo = new scope.SimpleDemo(cameraZ, opts.target, axisLength);
    }

    function drawScene() {
        var p = new QU.RegularPolygon(32, "red", "blue");
        demo.addToScene(p.getRoot());
    }

    scope.runST3 = function(opts) {
        init(opts);
        drawScene();
        demo.render();
    };

})(CISD792, THREE, QU);