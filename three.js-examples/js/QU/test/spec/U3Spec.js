/*global describe, it*/

var pi = Math.PI;
var cos = Math.cos;
var sin = Math.sin;
var tan = Math.tan;
var rad = qu.rad;
var deg = qu.deg;
var round = Math.round;

describe("The Qutils.js Module", function() {
    it("has it's required dependencies.", function() {
        expect(THREE).toBeDefined();
    });
    it("exists", function() {
        expect(qu).toBeDefined();
    });

    it("is version 0.1", function() {
        var version = qu.version;
        expect(version).toEqual("0.1");
    });

    it("properly converts degrees to radians", function() {
        [
            [0,0],
            [90, pi/2],
            [180, pi],
            [360, 2*pi]
        ].map( function(x) {
            var d = x[0];
            var r = x[1]
            expect(rad(d)).toBeCloseTo(r);
        });
    });

    it("properly converts radians to degrees", function() {
        [
            [0,0],
            [90, pi/2],
            [180, pi],
            [360, 2*pi]
        ].map( function(x) {
            var d = x[0];
            var r = x[1]
            expect(deg(r)).toBeCloseTo(d);
        });
    });


});

