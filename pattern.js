

function setup() {
    createCanvas(400, 400);

    pixelDensity(1);
    loadPixels();
    init();

    for (let k = 0; k < 0; k++) {
        grad = new Gradient();
        grad.draw();
    }
    // noLoop();
    // GIF generation
    // createCanvas(400, 400);
    // pixelDensity(1);
    // valleys = new Valleys(40);
    // loadPixels();
    // noLoop();
    // frameRate(22)
    // createLoop({ duration: 8, gif: true, render: true })
}

function init() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            set(i, j, color(0, 0, 0));
        }
    }
}



class Gradient {
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.direction = createVector(random(-1, 1), random(-1, 1));
        this.direction.mult(5.0 / this.direction.mag());
        this.color = color(random(255), random(255), random(255));
        this.perp = createVector(this.direction.y, -this.direction.x);
    }

    draw_line(t, linewidth, blendColor) {
        let base_x = this.x + this.direction.x * t;
        let base_y = this.y + this.direction.y * t;
        for (let k = 0; k < linewidth; k++) {
            base_x += this.perp.x;
            base_y += this.perp.y;
            const pix = (int(base_x) + int(base_y) * width) * 4;
            // let c = pixels[pix];
            // if (red(color) < c) {
            set(base_x, base_y, blendColor);
            // }
            // pixels[pix] += red(blendColor);
            // pixels[pix + 1] += green(blendColor);
            // pixels[pix + 2] += blue(blendColor);
        }

    }
    draw() {
        let black = color(0, 0, 0);
        let size = 20;
        for (let k = 0; k < size; k++) {
            let fac = k * 1.0 / size;
            black = color(red(this.color) * fac, green(this.color) * fac, blue(this.color) * fac);
            this.draw_line(k, 10, black);

        }
    }
}

// function mouseReleased() {
//     valleys.add_dot(mouseX, mouseY);
// }

function draw() {
    grad = new Gradient();
    grad.draw();

    updatePixels();


}