/*global CISD792, THREE */
(function(scope, THREE) {
    "use strict";


    function _ramp(color) {
        var r_idx = 0,
            g_idx = 1,
            b_idx = 2;
        return function(n) {
            var M = [];
            var step = 255 / n;
            for (var i = 0; i < n; i++) {
                var rgbElems = [
                    color[r_idx] ? Math.round(step * i) : 0,
                    color[g_idx] ? Math.round(step * i) : 0,
                    color[b_idx] ? Math.round(step * i) : 0
                ];
                var rgb = "rgb(" + rgbElems.join(",")+ ")";
                M.push(
                    new THREE.MeshLambertMaterial({
                        color: rgb,
                        shading: THREE.FlatShading,
                        side: THREE.DoubleSide
                    })
                )
            }
            return M;
        }
    }

    scope.materials = {
        lineBasic: {
            red: new THREE.LineBasicMaterial({
                    color: "red",
                    linewidth: 3})
        },
        meshBasic: {
            tspred: new THREE.MeshBasicMaterial({
                color: "red",
                side: THREE.DoubleSide,
                opacity:.6,
                transparent:true
            }),
            red: new THREE.MeshBasicMaterial({
                color: "red",
                side: THREE.DoubleSide}),
            grey: new THREE.MeshBasicMaterial({
                color: "grey",
                side: THREE.DoubleSide}),
            blue: new THREE.MeshBasicMaterial({
                color: "blue",
                side: THREE.DoubleSide}),
            vertex: new THREE.MeshBasicMaterial( {
                vertexColors: THREE.VertexColors, 
                side: THREE.DoubleSide})
        
        },
        lambert : {
            red: new THREE.MeshLambertMaterial({
                color: "red",
                shading: THREE.FlatShading, 
                side: THREE.DoubleSide})
        },
        phong : {
            red : new THREE.MeshPhongMaterial({
                color: "red",
                specular: 0x222222,
                emissive: 0x880000
            })
        },
        ramps: {
            red: _ramp([1, 0 , 0]),
            blue: _ramp([0, 0, 1]),
            green: _ramp([0 ,1, 0]),
            grey: _ramp([1,1,1]),
            yellow: _ramp([1, 1, 0]),
            cyan: _ramp([0,1,1]),
            magenta: _ramp([1,0,1])
        }
    };
})(CISD792, THREE);