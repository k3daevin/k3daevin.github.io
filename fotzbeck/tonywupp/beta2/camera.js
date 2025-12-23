class Camera {
  constructor(viewWidth, viewHeight, deadzoneFactor = 0.7) {
    this.x = 0;
    this.y = 0;

    this.viewWidth = viewWidth;
    this.viewHeight = viewHeight;

    this.deadzoneWidth  = viewWidth  * deadzoneFactor;
    this.deadzoneHeight = viewHeight * deadzoneFactor;
  }

  update(targetX, targetY) {
    const dzLeft =
      this.x + (this.viewWidth - this.deadzoneWidth) / 2;
    const dzRight = dzLeft + this.deadzoneWidth;

    const dzTop =
      this.y + (this.viewHeight - this.deadzoneHeight) / 2;
    const dzBottom = dzTop + this.deadzoneHeight;

    if (targetX < dzLeft) {
      this.x = targetX - (this.viewWidth - this.deadzoneWidth) / 2;
    } else if (targetX > dzRight) {
      this.x = targetX - (this.viewWidth + this.deadzoneWidth) / 2;
    }

    if (targetY < dzTop) {
      this.y = targetY - (this.viewHeight - this.deadzoneHeight) / 2;
    } else if (targetY > dzBottom) {
      this.y = targetY - (this.viewHeight + this.deadzoneHeight) / 2;
    }
  }

  worldToScreen(wx, wy) {
    return {
      x: wx - this.x,
      y: wy - this.y
    };
  }

  screenToWorld(sx, sy) {
    return {
      x: sx + this.x,
      y: sy + this.y
    };
  }

  isVisible(wx, wy, margin = 0) {
    return (
      wx + margin >= this.x &&
      wx - margin <= this.x + this.viewWidth &&
      wy + margin >= this.y &&
      wy - margin <= this.y + this.viewHeight
    );
  }
}
