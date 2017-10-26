
class BezierElement {
  /**
   * This class can make any html element to move in a certain bezier route.
   * The target element has to be "position: fixed".
   *
   * e.g.
   * const r1 = [{x:30, y:400}, {x:50, y:300}, {x:-50, y:150}, {x:30, y:0}];
   * const ele = document.querySelector("#e");
   * const a = new BezierElement(ele, r1);
   *
   * a.start();
   *
   */
  constructor(element, route) {
    this.speed = 0.008;
    this.t = 0;

    this.element = element;
    this.route = route;

    this.timer = null;
  }

  /**
   * This function calculate the bezier routes throught time. And trigger the
   * next draw operation through requestAnimationFrame.
   */
  draw() {
    const p0 = this.route[0];
    const p1 = this.route[1];
    const p2 = this.route[2];
    const p3 = this.route[3];

    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;

    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;

    const t = this.t;

    const xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
    const yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

    this.element.style.left = this.numToPosition(xt);
    this.element.style.top = this.numToPosition(yt);

    this.t += this.speed;

    if (this.t <= 1)
      this.timer = requestAnimationFrame(() => this.draw());
    else
      this.stop();
  }

  /**
   * The postion you pass to `element.style` have to be string like "1px".
   */
  numToPosition(num) {
    return Math.floor(num) + "px";
  }

  stop() {
    cancelAnimationFrame(this.timer);
    this.t = 0;
  }

  start() {
    requestAnimationFrame(() => this.draw());
  }
}

