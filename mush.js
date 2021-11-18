function setup() {
    dim = 400;
    createCanvas(dim, dim);

    palette = create_palette();
    background(palette[0]);
    shrooms = [];
    for (let i = 0; i < 100; i++) {
        shrooms.push(new Shroom(random(dim), random(dim)));
    }



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

class Shroom {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.n = int(random(5, 20));
        this.color = palette[int(random(1, palette.length))];
    }

    create_shape(f = 200, r = 0.1) {
        let theta = 0;
        r /= f;
        let dx, dy, dx2, dy2;
        // noStroke();
        stroke(this.color);
        fill(this.color);

        circle(this.x, this.y, 2 * r * f);
        while (theta < 2 * PI) {
            dx = f * cos(theta);
            dy = f * sin(theta);

            theta += 2 * PI / this.n;
            dx2 = f * cos(theta);
            dy2 = f * sin(theta);

            curve(this.x + dx, this.y + dy,
                this.x - r * dx, this.y - r * dy,
                this.x - r * dx2, this.y - r * dy2,
                this.x + dx2, this.y + dy2);


        }

        // translate(x, y);
        // // noStroke();
        // fill(palette[1]);
        // for (let i = 0; i < 10; i++) {
        //     ellipse(0, 30, 20, 80);
        //     rotate(PI / 5);

        // }
    }
}
function mousePressed() {
    s.x = mouseX;
    s.y = mouseY;
}
function mouseReleased() {

}

function draw() {
    background(palette[0]);
    for (const s of shrooms) {
        s.create_shape((dim - (s.x - mouseX) ** 2 / dim) + 10, 20 * abs(s.y - mouseY) / dim + 0.01);
    }

    // mskin.draw_callback(sine);

}