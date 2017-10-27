
class BezierAnimation {
  /**
   * This class make a HTML element to move in a certain bezier route. Target
   * `element` has to be set as "position: fixed".
   */
  constructor(element, route) {
    this.updatePosition = this.updatePosition.bind(this);

    const [ startPoint, p1, p2, endPoint ] = route;

    this.cx = 3 * (p1.x - startPoint.x);
    this.bx = 3 * (p2.x - p1.x) - this.cx;
    this.ax = endPoint.x - startPoint.x - this.cx - this.bx;

    this.cy = 3 * (p1.y - startPoint.y);
    this.by = 3 * (p2.y - p1.y) - this.cy;
    this.ay = endPoint.y - startPoint.y - this.cy - this.by;

    this.startx = startPoint.x;
    this.starty = startPoint.y;

    this.element = element;
    this.requestId = null;

    this.speed = 0.01;
    this.t = 0;
  }


  /**
   * This function calculate the bezier route. And trigger the next drawing
   * operation through requestAnimationFrame.
   */
  updatePosition() {
    const { ax, bx, cx, ay, by, cy, startx, starty, t } = this;
    const tSquared = t * t;
    const tCubed = t ** 3;

    const x = ax * tCubed + bx * tSquared + cx * t + startx;
    const y = ay * tCubed + by * tSquared + cy * t + starty;

    this.element.style.left = this.num2pix(x);
    this.element.style.top = this.num2pix(y);

    this.t += this.speed;

    if (this.t <= 1)
      this.requestId = requestAnimationFrame(this.updatePosition);
    else
      this.stop();
  }


  /**
   * The postion you pass to `e.style.left` or `e.style.top` have to be
   * string like "1px", Number objects will not work.
   */
  num2pix(num) {
    return Math.floor(num) + "px";
  }


  /**
   * Stop the drawing process and reset `this.t`, so that the animation can
   * start again.
   */
  stop() {
    cancelAnimationFrame(this.requestId);
    this.t = 0;
  }


  /**
   * This is the only method that users need to call.
   */
  start() {
    requestAnimationFrame(this.updatePosition);
  }
}

