/**
 * Provide a normalized way to get size, position, scale values
 * as well as provide reference for different geometry classes.
 * ### module: @springroll/display
 * @class DisplayAdapter
 * @memberof springroll
 */
export default {
    
    /**
     * The geometry class for Circle
     * @member {function}
     * @memberof springroll.DisplayAdapter
     * @readOnly
     * @static
     * @default PIXI.Circle
     */
    Circle: PIXI.Circle,

    /**
     * The geometry class for Ellipse
     * @member {function}
     * @memberof springroll.DisplayAdapter
     * @readOnly
     * @static
     * @default PIXI.Ellipse
     */
    Ellipse: PIXI.Ellipse,

    /**
     * The geometry class for Rectangle
     * @member {function}
     * @memberof springroll.DisplayAdapter
     * @readOnly
     * @static
     * @default PIXI.Rectangle
     */
    Rectangle: PIXI.Rectangle,

    /**
     * The geometry class for Sector
     * @member {function}
     * @memberof springroll.DisplayAdapter
     * @readOnly
     * @static
     * @default PIXI.Sector
     */
    Sector: PIXI.Sector,

    /**
     * The geometry class for point
     * @member {function}
     * @memberof springroll.DisplayAdapter
     * @readOnly
     * @static
     * @default PIXI.Point
     */
    Point: PIXI.Point,

    /**
     * The geometry class for Polygon
     * @member {function}
     * @memberof springroll.DisplayAdapter
     * @readOnly
     * @static
     * @default PIXI.Polygon
     */
    Polygon: PIXI.Polygon,

    /**
     * If the rotation is expressed in radians
     * @member {boolean}
     * @memberof springroll.DisplayAdapter
     * @readOnly
     * @static
     * @default true
     */
    useRadians: true,

    /**
     * Gets the object's boundaries in its local coordinate space, without any scaling or
     * rotation applied.
     * @memberof springroll.DisplayAdapter
     * @param {PIXI.DisplayObject} object The createjs display object
     * @return {PIXI.Rectangle} A rectangle with additional right and bottom properties.
     */
    getLocalBounds: function(object) {
        let bounds;
        let width = object.width;
        let height = object.height;
        if (width && height) {
            bounds = new PIXI.Rectangle(
                -object.pivot.x,
                -object.pivot.y,
                width / object.scale.x,
                height / object.scale.y
            );
        }
        else {
            bounds = new PIXI.Rectangle();
        }
        bounds.right = bounds.x + bounds.width;
        bounds.bottom = bounds.y + bounds.height;
        return bounds;
    },

    /**
     * Normalize the object scale
     * @memberof springroll.DisplayAdapter
     * @param {PIXI.DisplayObject} object The PIXI display object
     * @param {string} [direction] Either "x" or "y" to return a specific value
     * @return {object$number} A scale object with x and y keys or a single number if direction is set
     */
    getScale: function(object, direction) {
        if (direction !== undefined) {
            return object.scale[direction];
        }
        return object.scale;
    },

    /**
     * Normalize the object position setting
     * @memberof springroll.DisplayAdapter
     * @param {PIXI.DisplayObject} object The PIXI display object
     * @param {object$number} position The position object or the value
     *         if the direction is set.
     * @param {number} [position.x] The x value
     * @param {number} [position.y] The y value
     * @param {string} [direction] Either "x" or "y" value
     * @return {PIXI.DisplayObject} Return the object for chaining
     */
    setPosition: function(object, position, direction) {
        if (direction !== undefined) {
            object.position[direction] = position;
        }
        else {
            if (position.x !== undefined) {
                object.position.x = position.x;
            }
            if (position.y !== undefined) {
                object.position.y = position.y;
            }
        }
        return object;
    },

    /**
     * Normalize the object position getting
     * @memberof springroll.DisplayAdapter
     * @param {PIXI.DisplayObject} object The PIXI display object
     * @param {string} [direction] Either "x" or "y", default is an object of both
     * @return {Object$number} The position as an object with x and y keys if no direction
     *        value is set, or the value of the specific direction
     */
    getPosition: function(object, direction) {
        if (direction !== undefined) {
            return object.position[direction];
        }
        return object.position;
    },

    /**
     * Normalize the object scale setting
     * @memberof springroll.DisplayAdapter
     * @param {PIXI.DisplayObject} object The PIXI Display object
     * @param {number} scale The scaling object or scale value for x and y
     * @param {string} [direction] Either "x" or "y" if setting a specific value, default
     *         sets both the scale x and scale y.
     * @return {PIXI.DisplayObject} Return the object for chaining
     */
    setScale: function(object, scale, direction) {
        if (direction !== undefined) {
            object.scale[direction] = scale;
        }
        else {
            object.scale.x = object.scale.y = scale;
        }
        return object;
    },

    /**
     * Set the pivot or registration point of an object
     * @memberof springroll.DisplayAdapter
     * @param {PIXI.DisplayObject} object The PIXI Display object
     * @param {object$number} pivot The object pivot point or the value if the direction is set
     * @param {number} [pivot.x] The x position of the pivot point
     * @param {number} [pivot.y] The y position of the pivot point
     * @param {string} [direction] Either "x" or "y" the value for specific direction, default
     *         will set using the object.
     * @return {PIXI.DisplayObject} Return the object for chaining
     */
    setPivot: function(object, pivot, direction) {
        if (direction !== undefined) {
            object.pivot[direction] = pivot;
        }
        object.pivot = pivot;
        return object;
    },

    /**
     * Set the hit area of the shape
     * @memberof springroll.DisplayAdapter
     * @param {PIXI.DisplayObject} object The PIXI Display object
     * @param {object} shape The geometry object
     * @return {PIXI.DisplayObject} Return the object for chaining
     */
    setHitArea: function(object, shape) {
        object.hitArea = shape;
        return object;
    },

    /**
     * Get the original size of a bitmap
     * @memberof springroll.DisplayAdapter
     * @param {PIXI.Bitmap} bitmap The bitmap to measure
     * @return {object} The width (w) and height (h) of the actual bitmap size
     */
    getBitmapSize: function(bitmap) {
        return {
            h: bitmap.height / bitmap.scale.y,
            w: bitmap.width / bitmap.scale.x
        };
    },

    /**
     * Remove all children from a display object
     * @memberof springroll.DisplayAdapter
     * @param {PIXI.DisplayObjectContainer} container The display object container
     */
    removeChildren: function(container) {
        container.removeChildren();
    },

    /**
     * If a container contains a child
     * @memberof springroll.DisplayAdapter
     * @param  {PIXI.DisplayObjectContainer} container The container
     * @param  {PIXI.DisplayObject} child  The object to test
     * @return {boolean} If the child contained within the container
     */
    contains: function(container, child) {
        while (child) {
            if (child === container) {
                return true;
            }
            child = child.parent;
        }
        return false;
    }
};
