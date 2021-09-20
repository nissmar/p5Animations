

function setup() {
    createCanvas(400, 400);
    background(color(255, 255, 255));
    squares = [];
    framereverse = 6;
    frameRate(2 * framereverse);

    up_g = false;
    for (let i = 0; i < 200; i++) {
        squares.push(new Item(random(width), random(height), 0));
    }



    createLoop({ duration: 4, gif: true, render: true })
}

class Item {
    constructor(x, y, code = 1) {
        this.x = x;
        this.y = y;
        this.radius = random(10, 20);
        this.code = code;
        if (code == 0) {
            this.r = random(100, 250);
            this.g = random(30, 60);
            this.b = random(10, 30);
            this.a = random(10, 100);

            // this.r = random(10, 30);
            // this.g = random(30, 60);
            // this.b = random(100, 250);
            // this.a = random(10, 100);

            // this.r = random(10, 30);
            // this.g = random(100, 250);
            // this.b = random(30, 60);
            // this.a = random(10, 100);
        }
        else {
            this.r = random(200, 255);
            this.g = random(100, 200);
            this.b = random(10, 30);
            this.a = random(200, 255);

            // this.r = random(100, 200);
            // this.g = random(10, 30);
            // this.b = random(200, 255);
            // this.a = random(200, 255);

            // this.r = random(10, 30);
            // this.g = random(200, 255);
            // this.b = random(100, 200);
            // this.a = random(200, 255);
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
            square(x_p, y_p, this.radius);
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


function draw_squares(squares) {
    for (const circ of squares) {
        circ.draw();
    }
}

function draw() {
    if (frameCount % framereverse == 1)
        up_g = !(up_g);

    if (frameCount % framereverse == 0)
        up_g = up_g;
    else if (up_g)
        squares.push(new Item(random(width), random(height)));
    else
        squares.pop();

    draw_squares(squares);

    console.log(up_g);

    // updatePixels();

}