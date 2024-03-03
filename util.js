/** Global Parameters Object */
const params = {};

/**
 * @param {Number} n
 * @returns Random Integer Between 0 and n-1
 */
const randomInt = (n) => Math.floor(Math.random() * n);

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @returns String that can be used as a rgb web color
 */
const rgb = (r, g, b) => `rgba(${r}, ${g}, ${b})`;

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @param {Number} a Alpha Value
 * @returns String that can be used as a rgba web color
 */
const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

/**
 * @param {Number} h Hue
 * @param {Number} s Saturation
 * @param {Number} l Lightness
 * @returns String that can be used as a hsl web color
 */
const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

function distance(A, B) {
  return Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));
}

function collide(A, B) {
  return distance(A, B) < A.radius + B.radius;
}

function canSee(A, B) {
  // if A can see B
  return distance(A, B) < A.visualRadius + B.radius;
}

function getFacing(velocity) {
  // Use the sign of velocity.x to determine facing direction (negative for left, positive for right)
  return velocity.x < 0 ? 0 : 1;
}

function getRotationFacing(velocity) {
  if (velocity.x === 0 && velocity.y === 0) return 4;
  let angle = Math.atan2(velocity.y, velocity.x) / Math.PI;

  if (-0.875 <= angle && angle < -0.625) return 7;
  if (-0.625 <= angle && angle < -0.375) return 0;
  if (-0.375 <= angle && angle < -0.125) return 1;
  if (-0.125 <= angle && angle < 0.125) return 2;
  if (0.125 <= angle && angle < 0.375) return 3;
  if (0.375 <= angle && angle < 0.625) return 4;
  if (0.625 <= angle && angle < 0.875) return 5;
  if (angle >= 0.875 || angle < -0.875) return 6;
}


/** Creates an alias for requestAnimationFrame for backwards compatibility */
//function that tells us to do an action everytime monitor refreshes.
window.requestAnimFrame = (() => {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    /**
     * Compatibility for requesting animation frames in older browsers
     * @param {Function} callback Function
     * @param {DOM} element DOM ELEMENT
     */
    ((callback, element) => {
      window.setTimeout(callback, 1000 / 60);
    })
  );
})();

// add global parameters here
const PARAMS = {
  DEBUG: true,
};
/**
 * Returns distance from two points
 * @param {Number} p1, p2 Two objects with x and y coordinates
 * @returns Distance between the two points
 */
const getDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};
