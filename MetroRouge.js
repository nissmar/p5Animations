

function setup() {
  createCanvas(400, 300);
  pixelDensity(1);
  loadPixels();

  // custom var;
  painting = false;
  cursorY = new DynamicPoint();
  influenceRadius = 30;
  influenceRatio = 1.6;
  backgroundColor = color(38, 26, 91);
  firstShade = color(219, 41, 41);
  secondShade = color(81, 188, 35);

  init();
  for (let j = 0; j < width; j++) {
    shift_pix();
    // cursorY.step_spring();
  }
  // noLoop();
  frameRate(30);
  // createLoop({ duration: 8, gif: true, render: true })
}



function init() {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      set(i, j, backgroundColor);
    }
  }
}



class DynamicPoint {
  constructor() {
    this.x = 0;
    this.y = height / 3;
    this.vx = 0;
    this.vy = 0;
    this.springStrength = 0.005;
    this.step = 0.1;
  }

  step_spring() {
    this.vy += -(this.y - height / 2) * this.springStrength * this.step + randomGaussian(0, 0.5) * this.step;
    this.vy *= 0.995;
    this.y += this.vy * this.step;
  }
}

function shift_pix() {
  for (let i = width - 1; i > 0; i--) {
    for (let j = 0; j < height; j++) {
      const pix = (i + j * width) * 4;
      const left_pix = ((i - 1) + j * width) * 4;

      pixels[pix + 0] = pixels[left_pix + 0];
      pixels[pix + 1] = pixels[left_pix + 1];
      pixels[pix + 2] = pixels[left_pix + 2];
      pixels[pix + 3] = pixels[left_pix + 3];


      if (painting) {
        dist = (i - mouseX) * (i - mouseX) + (j - mouseY) * (j - mouseY);
        if (dist < influenceRadius * influenceRadius) {
          // pixels[pix + 0] = (influenceRadius - abs(j - mouseY)) / influenceRadius * 255;
          set(i, j, firstShade);
          // pixels[pix + 3] = 
        }
      }
    }
  }
  // first column
  for (let j = 0; j < height; j++) {
    const pix = (0 + j * width) * 4;
    dist = (j - cursorY.y);
    dist2 = (j + 1.2 * influenceRatio * influenceRadius - cursorY.y);

    if (dist * dist < influenceRadius * influenceRadius) {
      alpha = (influenceRadius - abs(dist)) / influenceRadius;
      set(0, j, lerpColor(backgroundColor, firstShade, sqrt(alpha)));
    }
    else if (dist2 * dist2 < influenceRadius * influenceRadius / influenceRatio / influenceRatio) {
      alpha = (influenceRadius / influenceRatio - abs(dist2)) / influenceRadius * influenceRatio;
      set(0, j, lerpColor(backgroundColor, secondShade, sqrt(alpha)));
    }
    else {
      set(0, j, backgroundColor);
    }
  }
}

function draw() {
  for (let j = 0; j < 50; j++) {
    shift_pix();
    cursorY.step_spring();

  }
  updatePixels();
}


function mousePressed() {
  painting = true;
}
function mouseReleased() {
  painting = false;
}