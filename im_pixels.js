


function preload() {
  dim = 600;

  img_0 = loadImage('test4.jpeg');

}
function setup() {
  createCanvas(dim, dim);

  palette = create_palette();


  f = 15;

  img_0.resize(dim / f, dim / f);

  myIm = new PixImage(dim, f, img_0);
}


function create_palette() {
  s = [];
  s.push(color(0, 0, 0)); //white

  s.push(color(255, 0, 0));
  s.push(color(0, 255, 0));
  s.push(color(0, 0, 255));
  return s;
}


class PixImage {
  constructor(dim, f, img_0) {
    this.dim = dim;
    this.f = f;
    this.tab = new Array((dim / f) * (dim / f));
    this.pixels = new Array((dim / f) * (dim / f) * 4);
    img_0.loadPixels();
    this.img = img_0.pixels;
    console.log(this.img);

    for (let i = 0; i < dim / f; i++) {
      for (let j = 0; j < dim / f; j++) {
        this.tab[i + this.dim / f * j] = new Pixelo(this.f * i, this.f * j, this.f);
      }
    }
    this.init();
  }

  init() {
    for (let i = 0; i < this.dim / this.f; i++) {
      for (let j = 0; j < this.dim / this.f; j++) {
        let pix = 4 * (i + j * this.dim / this.f);
        this.pixels[pix] = random(0, 255);
        this.pixels[pix + 1] = random(0, 255);
        this.pixels[pix + 2] = random(0, 255);
      }
    }
  }

  drawe() {
    for (let i = 0; i < this.dim / this.f; i++) {
      for (let j = 0; j < this.dim / this.f; j++) {
        let pix = 4 * (i + j * this.dim / this.f);
        for (let k = 0; k < 3; k++) {
          this.pixels[pix + k] += (this.img[pix + k] - this.pixels[pix + k]) * random(20) / 200;
        }

        this.tab[pix / 4].drawe(this.pixels[pix] / 255, this.pixels[pix + 1] / 255, this.pixels[pix + 2] / 255);

      }
    }
  }

  compute_mean() {
    let pix = 0;
    let c = 0;
    for (let i = 0; i < this.dim / this.f; i++) {
      for (let j = 0; j < this.dim / this.f; j++) {
        pix = 4 * (i + j * this.dim / this.f);
        c += (this.img[pix] + this.img[pix + 1] + this.img[pix + 2]) / 3;
      }
    }
    return c / (this.dim / this.f) / (this.dim / this.f);
  }
}

class Pixelo {
  constructor(_x, _y, _r) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.dx = _r;
  }
  drawe(r, g, b) {
    fill(palette[1]);
    noStroke();
    circle(this.x + this.r / 4, this.y + this.r / 4, r * this.r / 2);

    fill(palette[2]);
    noStroke();
    circle(this.x + this.r / 4, this.y + 3 * this.r / 4, g * this.r / 2);

    fill(palette[3]);
    noStroke();
    circle(this.x + 3 * this.r / 4, this.y + this.r / 4, b * this.r / 2);
  }
}


function draw() {
  // const x = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109].find(function (el) {
  //   return el > 105;
  // });
  // console.log(x);

  background(palette[0]);
  myIm.drawe();
  // noLoop();
}