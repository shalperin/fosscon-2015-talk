/*global, THREE, $*/
(function(scope, THREE, $) {
    "use strict"; 
    var scene, camera, renderer;
    var clock = new THREE.Clock();
    var controls;

    function render () {
        requestAnimationFrame( render );
        var delta = clock.getDelta();

        controls.update( delta );
        renderer.render(scene, camera);
    }

    function init3d(cameraZ) {
        var $target = $('body');

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(
            $target.width(), $target.height());
        camera = new THREE.PerspectiveCamera(
            75,
            $target.width() / $target.height(),
            0.01,
            1000);
        $target.empty();
        $target.append(renderer.domElement);
        window.addEventListener('resize',
            function () {
                camera.aspect = $target.width() / $target.height();
                camera.updateProjectionMatrix();
                renderer.setSize($target.width(), $target.height());
            },
            false);
            controls = new THREE.FlyControls( camera);
            controls.movementSpeed = 20;
            controls.domElement = renderer.domElement;
            controls.rollSpeed = Math.PI / 12;
            controls.autoForward = false;
            controls.dragToLook = true;
            camera.position.z = cameraZ;
    }


    scope.SimpleDemoFly = function(cameraZ) {
        this.addToScene = function(mesh) {
            scene.add(mesh);
        };
        this.render = function() {
            render();
        };
        this.defaultLights = function() {
            var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
            directionalLight.position.set( 0, 1, 0 );
            this.addToScene( directionalLight );

            var light = new THREE.PointLight(0xFFFFFF, 1, 1000 );
            light.position.set(0, -5, 10);
            this.addToScene(light);

            var alight = new THREE.AmbientLight(0x333333);
            alight.position.set(-5, 10, 0);
            this.addToScene(alight);
        }

        init3d(cameraZ);
    }



})(CISD792, THREE, $);