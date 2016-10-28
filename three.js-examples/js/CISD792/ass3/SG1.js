/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU, dat) {
    "use strict";
    
    scope.runSG1 = function (opts) {
        var demo = new scope.SimpleDemo(300, opts.target, 25);
        var torus;
        var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

        var controls = new function() {
            this.radius = 100;
            this.tube = 40;
            this.radialSegments = 8;
            this.tubularSegments = 6;
            this.arc = Math.PI * 2;
            this.go = function() {
                demo.scene().remove(torus);
                var geometry = new THREE.TorusGeometry(
                    this.radius, this.tube, this.radialSegments,
                    this.tubularSegments, this.arc);
                torus = new THREE.Mesh( geometry, material );
                demo.addToScene(torus);
            };
        };

        var gui = new dat.GUI();
        gui.add(controls, 'radius', 1, 200).step(1);
        gui.add(controls, 'tube',1, 80).step(1);
        gui.add(controls, 'radialSegments',4, 40).step(1);
        gui.add(controls, 'tubularSegments',1, 40).step(1);
        gui.add(controls, 'arc',.1, Math.PI *2).step(.1);
        gui.add(controls, "go");

        demo.defaultLights();
        controls.go()
        demo.render();
    };

})(CISD792, THREE, QU, dat);