

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  valleys = new Valleys(50);
  loadPixels();
  noLoop();
  // GIF generation
  // createCanvas(400, 400);
  // pixelDensity(1);
  // valleys = new Valleys(40);
  // loadPixels();
  // noLoop();
  // frameRate(22)
  // createLoop({ duration: 8, gif: true, render: true })
}

function dot(x, y, cx = 200, cy = 200, fac = 0.5) {
  return 255.0 / (((x - cx) ** 2 / width * fac + (y - cy) ** 2 / height * fac + 1) ** 2);
}


class DynamicPoint {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.phase = random(0, 2 * Math.PI);
    this.strength = 0;
    this.phase_speed = 0.05;

    this.speed = 3 * random(0.5, 1.5);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.life = 0;
  }

  rotate_speed() {
    let fac = 0.01
    let bfac = Math.sqrt(1 - fac ** 2);
    let nx = bfac * this.vx - fac * this.vy;
    let ny = fac * this.vx + bfac * this.vy;
    this.vx = nx;
    this.vy = ny;
  }

  out_of_bound() {
    let fac = 0
    if (this.x < -fac * width || this.x > (1 + fac) * width)
      this.vx *= -1;
    if (this.y < -fac * height || this.y > (1 + fac) * height)
      this.vy *= -1;
  }
  move() {
    this.out_of_bound();
    // this.rotate_speed();

    this.life += 1;
    // this.strength = 0.1 + Math.cos(this.phase + this.phase_speed * this.life) ** 2;
    let t = (this.life) * this.phase_speed + this.phase;
    this.strength = 0.1 + Math.cos(this.phase + this.phase_speed * this.life) + 1;

    this.speed = 2 * (this.strength) ** 0.5;
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;
  };

}

class Valleys {
  constructor(n) {
    this.n = 0;
    this.coeff = [];
    for (let i = 0; i < n; i++)
      this.add_dot();
  }

  coeffs() {
    for (let i = 0; i < this.n; i++) {
      this.coeff[i] = new DynamicPoint;
    }

  }

  get(x, y) {
    let c = 0;
    for (let i = 0; i < this.n; i++) {
      c += dot(x, y, this.coeff[i].x, this.coeff[i].y, this.coeff[i].strength)
    }
    return c;
  }

  move() {
    for (let i = 0; i < this.n; i++) {
      this.coeff[i].move();
    }
  }

  add_dot(x = -1, y = -1) {
    this.coeff[this.n] = new DynamicPoint;
    if (x != -1) {
      this.coeff[this.n].x = x;
      this.coeff[this.n].y = y;
    }
    this.coeff[this.n].move();
    this.n += 1;
  }

}

function draw_valleys(valleys) {
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const pix = (i + j * width) * 4;
      bright = valleys.get(i, j);

      if (bright > 255 * 2) {
        x = bright - 255 * 2;
        pixels[pix + 0] = 255;
        pixels[pix + 1] = 191.25 + x / 4;
        pixels[pix + 2] = 163.75;
      }
      else if (bright > 255) {
        x = (bright - 255);
        pixels[pix + 0] = 255;
        pixels[pix + 1] = 63.75 + x / 2;
        pixels[pix + 2] = 100 + x / 4;
      }
      else {
        pixels[pix + 0] = bright;
        pixels[pix + 1] = bright / 4;
        pixels[pix + 2] = 100;
      }
      pixels[pix + 3] = 255;
    }
  }
}

function mouseReleased() {
  valleys.add_dot(mouseX, mouseY);
}

function draw() {
  draw_valleys(valleys);
  valleys.move();

  updatePixels();
  save();


}