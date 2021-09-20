

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  valleys = new Valleys(50);
  loadPixels();

  frameRate(22)
  createLoop({ duration: 10, gif: true, render: true })
}

function random_colors() {
  c_hue = random(0, 255);
  c_saturation = 100;
  c_value = 240;
  c1 = color(c_hue, c_saturation, 100);
  c2 = color((c_hue + 85) % 255, c_saturation, 150);
  c3 = color((c_hue + 170) % 255, c_saturation, 250);
  return [c1, c2, c3];
}

function new_wall_fronteer() {
  colors = random_colors();
  padding = windowHeight / 3;
  x = random(padding, windowHeight - padding);
  y = random(padding, windowHeight - padding);
  background(colors[0]);
  noStroke();
  fill(colors[1]);
  rect(0, 0, x, y);
  fill(colors[2]);
  rect(0, y, x, windowHeight);
}

function dot(x, y, cx = 200, cy = 200, fac = 0.5) {
  return 300.0 / (((x - cx) ** 2 / width * fac + (y - cy) ** 2 / height * fac + 1) ** 2);
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
        bright = min(bright, 255 * 3);
        pixels[pix + 0] = (bright - 255 * 2);
        pixels[pix + 1] = 0;
        pixels[pix + 2] = 255 - (bright - 255 * 2) / 4;
      }
      else if (bright > 255) {
        pixels[pix + 0] = 0;
        pixels[pix + 1] = 127.5 - (bright - 255) / 2;
        pixels[pix + 2] = 255;
      }
      else {
        pixels[pix + 0] = 255 - bright;
        pixels[pix + 1] = 255 - bright / 2;
        pixels[pix + 2] = 255;
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

}