

function setup() {
    dim = 400;
    createCanvas(dim, dim);
    pixelRatio = dim / 8;
    background(color(255, 255, 255));
    frameRate(20);

    squares = [];
    for (let i = 0; i < 200; i++) {
        squares.push(new Item(random(width), random(height), 0));
    }

    mesh = new Mesh(pixelRatio);
    mesh.add_items(10);
    // createLoop({ duration: 1, gif: true, render: true })
}

class Item {
    constructor(x, y, code = 1) {
        this.x = x;
        this.y = y;
        this.radius = random(10, 20);
        this.code = code;
        if (code == 0) {
            // this.r = random(100, 250);
            // this.g = random(30, 60);
            // this.b = random(10, 30);
            // this.a = random(10, 100);

            // this.r = random(10, 30);
            // this.g = random(30, 60);
            // this.b = random(100, 250);
            // this.a = random(10, 100);

            this.r = random(10, 30);
            this.g = random(100, 250);
            this.b = random(30, 60);
            this.a = random(10, 100);

            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = random(10, 100);
        }
        else {
            // this.r = random(200, 255);
            // this.g = random(100, 200);
            // this.b = random(10, 30);
            // this.a = random(200, 255);

            // this.r = random(100, 200);
            // this.g = random(10, 30);
            // this.b = random(200, 255);
            // this.a = random(200, 255);

            this.r = random(10, 30);
            this.g = random(200, 255);
            this.b = random(100, 200);
            this.a = random(200, 255);

            this.r = 255;
            this.g = 100;
            this.b = 100;
            this.a = random(100, 200);
        }
        this.period = random(width / 8.0, width / 7.0);
    }
    draw() {
        noStroke();
        fill(this.r, this.g, this.b, this.a);
        let c = Math.floor((max(this.x, this.y) / this.period)) * this.period;
        let x_p = this.x - c;
        let y_p = this.y - c;
        while (y_p < height) {
            // if (this.code == 0)
            circle(x_p, y_p, this.radius);
            // else
            //     circle(x_p, y_p, this.radius);
            x_p += this.period;
            if (x_p > width) {
                x_p = this.x - c;
                y_p += this.period;
            }
        }
    }
}


class Mesh {
    constructor(pixelRatio) {
        this.pixelRatio = pixelRatio;
        this.items = [];
    }
    add_items(n) {
        for (let i = 0; i < n; i++) {
            this.items.push(new Item(random(-this.pixelRatio, this.pixelRatio), random(-this.pixelRatio, this.pixelRatio), 1));
        }
    }
    wave(x_p, y_p, t, phi) {
        // in [0, 1]
        let r = sqrt((x_p - dim / 2) * (x_p - dim / 2) + (y_p - dim / 2) * (y_p - dim / 2));
        let s = 1 + cos(10 * r / dim - t / 20 * 2 * PI + phi);
        return s / 2;
    }
    draw(t) {
        for (let i = 0; i < dim / this.pixelRatio; i++) {
            for (let j = 0; j < dim / this.pixelRatio; j++) {
                fill(0, 0, 255);
                noStroke();
                let x_p = this.pixelRatio * i;
                let y_p = this.pixelRatio * j;
                // circle(x_p, y_p, radius);
                for (const it of this.items) {
                    let radius = this.wave(x_p, y_p, t, -it.a / 50);
                    fill(it.r, it.g, it.b, it.a * (radius + 1) / 2);
                    circle(x_p + it.x, y_p + it.y, (radius + 0.5) * 10);
                }
            }
        }
    }
}


function draw_squares(squares) {
    for (const circ of squares) {
        circ.draw();
    }
}

function draw() {
    background(color(255, 255, 255));
    draw_squares(squares);
    mesh.draw(frameCount);

}