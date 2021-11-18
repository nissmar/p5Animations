


function create_palette() {
  s = [];
  s.push(color(0, 0, 0));

  s.push(color(255, 0, 0));
  s.push(color(0, 255, 0));
  s.push(color(0, 0, 255));
  s.push(color(255, 255, 255));
  return s;
}


function convertBW(img) {
  let tab = new Array(img.height * img.width);
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let px = img.get(x, y);
      let r = px[0];
      let g = px[1];
      let b = px[2];
      let bright = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
      tab[x + y * img.width] = bright;
    }
  }
  return tab;
}


class NoiseImage {
  constructor(dim_canvas, dim_image, img_0, rand, r) {
    this.dim = dim_image;
    this.f = dim_canvas / dim_image;
    this.img = img_0;
    this.compute_distribution(); //this.max_val, this.sum_val;
    this.rand_move = rand;
    this.r = r;

    this.index = 0;
  }


  compute_distribution() {
    let c = 0;
    this.max_val = 0;
    this.distrib = new Array(this.img.length);
    for (let i = 0; i < (this.img.length); i++) {
      c += this.img[i] * this.img[i] * this.img[i] / 1000;
      this.distrib[i] = c;
      this.max_val = max(this.max_val, this.img[i]);
    }
    this.sum_val = this.distrib[this.distrib.length - 1];
  }

  random_pix() {

    const x = random(0, this.sum_val);

    const isLargeNumber = (element) => element > x;

    const index = this.distrib.findIndex(isLargeNumber);

    const i = this.f * (index % this.dim + random(-this.rand_move, this.rand_move));
    const j = this.f * (index / this.dim + random(-this.rand_move, this.rand_move));
    fill(palette[4]);
    noStroke();

    let fac = this.img[index] / 255;
    fac = 1;
    circle(this.r + i, this.r + j, this.f * this.r * fac);
  }

  add_contrast(x, y) {
    return x * (x / y) * (x / y) * (x / y) * (x / y);
  }

  add_index_pix(n_it = 1, p = 255) { //n : number of shots p: circle intensity 


    fill(color(255, 255, 255, p / sqrt(n_it)));
    noStroke();

    if (this.index < this.img.length - 1) {
      for (let k = 0; k < n_it; k++) {
        if (random(0, this.max_val) < this.add_contrast(this.img[this.index], this.max_val)) {
          const i = this.f * (this.index % this.dim + random(-this.rand_move, this.rand_move));
          const j = this.f * (this.index / this.dim + random(-this.rand_move, this.rand_move));
          // console.log(this.index);

          circle(this.r + i, this.r + j, this.f * this.r);
        }
      }
      this.index++;
      return true;
    }
    return false;
  }
}


function preload() {
  img_0 = loadImage('./testimages/disp1.png');

}

function setup() {
  dim_canvas = 1200;
  dim_image = 600;

  createCanvas(dim_canvas, dim_canvas);

  palette = create_palette();

  img_0.resize(dim_image, dim_image);

  img_1 = convertBW(img_0);

  myIm = new NoiseImage(dim_canvas, dim_image, img_1, 0.5, 2.0);
  background(color(0, 0, 0));

  // frameRate_ = 24;
  // numFrames = frameRate_ * 6;
  // frameRate(frameRate_);
  // createLoop({ duration: numFrames / frameRate_, gif: true, render: true })
}
function keyPressed() {

  // If you hit the s key, save an image
  if (key == 's') {
    saveCanvas('output.png');
  }
}
function draw() {

  // // random_pix
  // frameCount
  // if (frameCount < numFrames) {
  //   pix = 2000;
  //   if (pix < 4000) {
  //     pix = pix + 2000;
  //   }
  //   for (let i = 0; i < pix; i++) {
  //     myIm.random_pix();
  //   }
  // }

  // unifpix

  for (let i = 0; i < 4 * dim_image; i++) {
    myIm.add_index_pix(10, 255);
  }
  // while (myIm.add_index_pix(4, 255)) {

  // }
  // saveCanvas('output.png');
  // noLoop();
}