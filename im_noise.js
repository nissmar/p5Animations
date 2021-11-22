


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

  add_contrast(x, y, exp = 0.5, dropout = 0.7) {
    return x * Math.pow((x / y), exp) * dropout;
  }

  add_index_pix(n_it = 1, p = 255, exp = 0.5, dropout = 0.7) { //n : number of shots p: circle intensity 


    fill(color(255, 255, 255));
    noStroke();

    if (this.index < this.img.length - 1) {
      for (let k = 0; k < n_it; k++) {
        if (random(0, this.max_val) < this.add_contrast(this.img[this.index], this.max_val, exp, dropout)) {
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
  img_0 = loadImage('./testimages/disp2.png');

}

function setup() {

  slider_exp = createSlider(0, 10, 2, 1);
  slider_exp.position(10, 10);
  slider_exp.style('width', '80px');

  slider_val = createSlider(0, 1, 0.7, 0.01);
  slider_val.position(10, 40);
  slider_val.style('width', '80px');

  dim_canvas = 600;
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

  if (key == 'r') {
    myIm.index = 0;
    background(0, 0, 0);
  }

  if (key == 'd') {
    dim_canvas = 2400;
    createCanvas(dim_canvas, dim_canvas);
    img_0.resize(dim_image, dim_image);
    img_1 = convertBW(img_0);
    myIm = new NoiseImage(dim_canvas, dim_image, img_1, 0.5, 2.0);
    background(color(0, 0, 0));
    myIm.index = 0;
    background(0, 0, 0);
  }
}
function draw() {
  let exp = slider_exp.value();
  let drop = slider_val.value();
  for (let i = 0; i < 10 * dim_image; i++) {
    myIm.add_index_pix(10, 255, exp, drop);
  }
}