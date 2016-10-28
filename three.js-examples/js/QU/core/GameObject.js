/**
 * Game object
 * @constructor
 */
QU.GameObject = function () {};

/**
 * Get the root of the game object.
 * @returns {THREE.Object3D}
 */
QU.GameObject.prototype.getRoot = function() {
    if (this.root == undefined) {
        throw("This game object did not initialize it's root!");
    } else {
        return this.root;
    }
};
