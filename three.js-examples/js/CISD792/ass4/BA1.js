/*global THREE, CISD792, QU, Rainbow*/
(function(scope, THREE, QU, Rainbow) {
    "use strict";
    var demo, root, rate, opacity;

    function createMatrix() {
        var box = new THREE.Mesh(
          new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshBasicMaterial({color: "red", transparent:"true"})
        );
        root = new THREE.Object3D();
        for (var i = 0; i <= 50; i += 5) {
            for (var j = 0; j <= 50; j += 5) {
                var new_box = box.clone();
                root.children.push(new_box);
                new_box.position.set(-25+ i, -25+ j, 0);
            }
        }
        demo.addToScene(root);
    }

    function animation() {
        for (var i in root.children) {
            var box = root.children[i];
            box.material.color = box.material.color.offsetHSL(rate, 0, 0);
            box.material.opacity = opacity;
        }
    }

    function Controls() {
        this.opacity = 1;
        this.rate = .00001;
        this.handleChange = function() {
            rate = this.rate;
            opacity = this.opacity;
        }
    }

    scope.runBA1 = function (opts) {
        var gui = new dat.GUI();
        var controls = new Controls();

        var rateCtrl = gui.add(controls, 'rate', 0, .0001).step(.00002);
        var opacityCtrl = gui.add(controls, 'opacity',.1,1).step(.1);

        rateCtrl.onChange(_.bind(controls.handleChange, controls));
        opacityCtrl.onChange(_.bind(controls.handleChange, controls));

        controls.handleChange();


        demo = new scope.SimpleDemo(50, opts.target, 100);
        createMatrix();
        demo.animation(animation);
        demo.render();
    };

})(CISD792, THREE, QU, Rainbow);