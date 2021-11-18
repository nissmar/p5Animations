function setup() {
  dim = 600;
  createCanvas(dim, dim);

  palette = create_palette();

  mskin = new MSkin(dim, 20, palette);



  // frameRate(24);
  // createLoop({ duration: 1, gif: true, render: true })
}

function create_palette() {
  s = [];
  s.push(color(233, 235, 231)); //white

  s.push(color(224, 220, 155)); //yellow
  s.push(color(198, 28, 85)); //red
  s.push(color(89, 19, 53)); //brown
  return s;
}

function mouseReleased() {
  console.log('mouse');
}


function sqdist(x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y2 - y1) * (y2 - y1);
}

class MSkin {
  constructor(dim, n, palette) {
    this.dim = dim;
    this.palette = palette;
    this.skins = [];
    this.n = n;

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        let skin = new Skin(this.dim / this.n, this.palette);
        for (let i = 0; i < 400; i++) {
          skin.add_random_patch();
        }
        for (const p of skin.patchs) {
          p.x = p.x + i * this.dim / this.n;
          p.y = p.y + j * this.dim / this.n;
        }
        this.skins.push(skin);
      }

    }
  }

  draw(mouseX, mouseY) {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        this.skins[i * this.n + j].draw(mouseX, mouseY);
      }
    }
  }

  draw_callback(call) {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        this.skins[i * this.n + j].draw_callback(call);
      }
    }
  }

}
class Skin {
  constructor(dim, palette) {
    this.patchs = [];
    this.dim = dim;
    this.minradius = 3;
    this.maxradius = 6;
    this.facspace = 1.6;
    this.palette = palette;
  }

  add_random_patch() {
    let x = random(this.maxradius, this.dim - this.maxradius);
    let y = random(this.maxradius, this.dim - this.maxradius);
    let rmin = 4 * this.dim * this.dim;

    for (const p of this.patchs) {
      rmin = min(rmin, sqrt(sqdist(x, y, p.x, p.y)) - p.r);
    }
    rmin = rmin - this.facspace * this.minradius;
    if (rmin > this.minradius) {
      let r = random(this.minradius, min(this.maxradius, this.minradius + rmin));
      let patch = new Patch(x, y, r, this.palette[int(random(1, this.palette.length))]);
      this.patchs.push(patch);
    }
  }

  draw(x, y) {
    for (const p of this.patchs) {
      p.draw(x, y);
    }
  }
  draw_callback(call) {
    for (const p of this.patchs) {
      p.draw_callback(call);
    }
  }
}

class Patch {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.noise = 1;
  }

  draw(x, y) {
    this.noise = (this.noise + randomGaussian() / 2);
    this.noise += (1 - this.noise) / 1.2;
    this.noise = 1;
    let r_obj = sqrt(sqdist(x, y, this.x, this.y));
    let fac = (1 / (10 * r_obj / width + 1) + this.noise) / 1.6;


    let sp = 10;
    let dx = sp * (x - this.x) / (r_obj + 20);
    let dy = sp * (y - this.y) / (r_obj + 20);
    fill(this.color);
    noStroke();

    // pentagon
    beginShape();
    let angle = TWO_PI / 5;
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = this.x + dx + cos(a * this.noise) * this.r * fac;
      let sy = this.y + dy + sin(a * this.noise) * this.r * fac;
      vertex(sx, sy);
    }
    endShape(CLOSE);


    //   circle(this.x, this.y, this.r * 2 * fac);
  }
  draw_callback(call) {
    this.noise = 1 + randomGaussian() / 40;
    let fac = call(this.x, this.y) * this.noise;
    let sp = 10;
    let dx = -sp * call(this.x, this.y) + sp;
    let dy = sp * call(this.x, this.y) - sp;

    fill(this.color);
    noStroke();
    circle(this.x + dx, this.y + dy, this.r * 2 * fac);
  }
}
function sine(x, y) {
  let speed = 0.01;
  return 1 + cos(4 * x * x / dim / dim + 4 * y * y / dim / dim - 2 * PI * frameCount * speed) / 4;
}
function draw() {
  background(palette[0]);
  mskin.draw(mouseX, mouseY);


  // mskin.draw_callback(sine);

}