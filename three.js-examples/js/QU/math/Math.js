
/*
    CISD792 | Common code
    by Sam Halperin
 */

QU.Math = function() {
    var cos = Math.cos;
    var sin = Math.sin;
    var sqrt = Math.sqrt;
    var pi = Math.PI;
    var random = Math.random;

    this.rad = function(d) {

        return d * pi/180;

    };

    this.deg = function(r) {

        return r * 180/pi;

    };

    // http://mathworld.wolfram.com/SpherePointPicking.html
    this.randomPointOnSphere = function() {

        var theta = random() * Math.PI * 2;
        var u = random() * 2 - 1;

        return new THREE.Vector3(
            sqrt(1-u*u) * cos(theta),
            sqrt(1-u*u) * sin(theta),
            u
        );

    };
    // unycreva
    this.randomPointInBox = function(size) {

        return new THREE.Vector3(
            size - (random() * size * 2),
            size - (random() * size * 2),
            size - (random() * size * 2)
        );

    };

    this.rotate = function rotate(v, axis, angle, ctr) {

        var R = new THREE.Matrix3();
        R.set(  cos(angle), -sin(angle), 0,
                sin(angle), cos(angle),  0,
                0,               0,                1
        );
        v.sub(ctr);
        v.applyMatrix3(R);
        v.add(ctr);
        return v;

    };


    /**
     * Regular polygon in the X/y plane.
     * @param n
     * @returns {Array}
     */
    this.pointsOnPoly = function pointsOnCircle(n) {
        var V = []
            angle = (2 * Math.PI) / n;
        for (var i = 0; i<n; i++) {
            var v = QU.up.clone();
            v.applyAxisAngle(QU.forward, angle * i);
            V.push(v);
        }
        return V;
    };

    this.arc = function arc(n, startAngle, endAngle, ourobouros) {
        var step = (endAngle - startAngle)/ n,
            V = [],
            angle = startAngle;

        while(angle < endAngle) {
            var v = QU.up.clone();
            v.applyAxisAngle(QU.forward, angle);
            V.push(v);
            angle+=step;
        }
        if (ourobouros) {
            V.push(V[0]);
        }
        return V;
    }
};

QU.math = new QU.Math();