/*global, THREE, $*/
(function(scope, THREE, $) {
    "use strict"; 
    var scene, camera, renderer, animation;
    var clock = new THREE.Clock();
    var controls;
    var $target;

    function render () {
        requestAnimationFrame( render );
        animation(clock);
        renderer.render(scene, camera);
    }

    function init3d(cameraZ, target, controlType) {
        $target = $(target);
        if ($target.length != 1) {
            throw("3d target is missing or misconfigured");
        }

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

        if (controlType == "fly") {
            controls = new THREE.FlyControls(camera);
            controls.movementSpeed = 20;
            controls.domElement = renderer.domElement;
            controls.rollSpeed = Math.PI / 12;
            controls.autoForward = false;
            controls.dragToLook = true;
        } else {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
        }

        camera.position.z = cameraZ;
    }

    function getAxis(length){
        var root = new THREE.Object3D();
        var mat = new THREE.LineBasicMaterial({
            color: "blue",
            linewidth: 1
        } );
        [
            [new THREE.Vector3(-length, 0, 0),
             new THREE.Vector3(length, 0, 0)],
            [new THREE.Vector3(0, -length, 0),
             new THREE.Vector3(0, length, 0)],
            [new THREE.Vector3(0, 0 ,-length),
             new THREE.Vector3(0, 0, length)]
        ].map(function(endpoints){
            var geom = new THREE.Geometry();
            geom.vertices.push(endpoints[0]);
            geom.vertices.push(endpoints[1]);
            root.children.push(new THREE.Line(geom, mat,
             THREE.LineStrip));
        });
        return root;
    };

    scope.SimpleDemo = function(cameraZ, target, axisLength, controlType) {
        this.addToScene = function (mesh) {
            scene.add(mesh);
        };
        animation = function noop() {
        };
        this.animation = function (fn) {
            animation = fn;
        };
        this.render = function () {
            render();
        };
        this.defaultLights = function () {
            var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0, 1, 0);
            this.addToScene(directionalLight);

            var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
            light.position.set(0, -5, 10);
            this.addToScene(light);

            var alight = new THREE.AmbientLight(0x333333);
            alight.position.set(-5, 10, 0);
            this.addToScene(alight);
        };
        this.scene = function () {
            return scene;
        };
        this.camera = function () {
            return camera;
        };

        this.clock = function () {
            return clock;
        };

        this.target = function (){
            return $target;
        }

        init3d(cameraZ, target, controlType);
        this.addToScene(getAxis(axisLength));
    }



})(CISD792, THREE, $);