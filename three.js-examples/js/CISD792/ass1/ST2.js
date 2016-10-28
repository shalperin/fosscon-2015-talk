/*global THREE, CISD792, QU*/
(function(scope, THREE, QU) {
    var demo;

    function init(opts) {
         demo = new CISD792.SimpleDemo(2, opts.target, 4);
    }

    function drawScene() {
        var pointLight = new THREE.PointLight(
            "white", 1, 1000);
        pointLight.position.set(-5, 10, 20);
        demo.addToScene(pointLight);

        demo.addToScene(new THREE.AmbientLight(
            0x222222));

        demo.addToScene(new QU.OpenBox(scope.materials.lambert.red).getRoot());
    }

    scope.runST2 = function(opts) {
        init(opts);
        drawScene();
        demo.render();
    };

})(CISD792, THREE, QU);