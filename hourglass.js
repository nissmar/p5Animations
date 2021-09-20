function setup() {
  createCanvas(400, 400);


  bars = []
  nbars = 9;
  for (let i = 0; i < nbars; i++)
    bars[i] = new Bar;
  for (let k = 1; k < nbars; k++)
    for (let i = 0; i < 10 * k; i++)
      bars[k].move();

  // frameRate(30)
  // createLoop({ duration: 3, gif: true, render: true })
}

function mouseReleased() {
  console.log('mouse');
}

function random_red() {
  return color(random(180, 255), random(50, 100), random(0, 10));
}


function random_blue() {
  return color(random(0, 10), random(50, 100), random(180, 255));
}
class Bar {
  constructor() {
    this.reset();
  }

  reset() {
    this.height = 1;
    this.width = width / 4;
    this.y = height / 2;
    this.life = 0;
    this.color = random_red();
  }

  draw() {
    fill(this.color);
    rect(width / 2 - this.width / 2, this.y, this.width, this.height);
    rect(width / 2 - this.width / 2, height - this.y, this.width, this.height);

  }

  move() {
    this.y *= 1.0082;
    this.height += 0.17;
    this.width = width / 4 + (this.y - height / 2) * 2;
    this.width = 120 * (atan(9 * (this.y / width - 0.75)) + PI / 2) + 20;

    this.life += 1;
    if (this.y > height + this.height) {
      console.log(this.life);
      this.reset();
    }
  }
}

function draw() {
  background(color(0, 0, 0));
  // bar0.draw();


  for (let i = 0; i < bars.length; i++) {
    bars[i].draw();
    bars[i].move();
  }
  // fill(color(255, 255, 255));
  // ellipse(width / 2, height / 2, height / 2);
  // fill(color(0, 0, 0));
  // ellipse(width / 2, height / 2, height / 4, height / 3);

  // draw_valleys(valleys);
  // valleys.move();

  // updatePixels();

}