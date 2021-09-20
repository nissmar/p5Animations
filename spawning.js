function setup() {
    dim = 60;
    pS = 10;

    let currentX = 0;
    let currentY = 0;

    //colors
    houseColor = color(200, 100, 0);
    gardenColor = color(100, 150, 100);
    fenceColor = color(100, 100, 100);

    createCanvas(dim * pS, dim * pS);
    init();
    frameRate(10);
    noLoop();
    myCity = new City()
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
    background(color(100, 50, 50));
    for (let i = 1; i < dim; i++) {
        strokeWeight(0.2);
        stroke(color(255, 255, 255));
        line(0, i * pS, dim * pS, i * pS);
        line(i * pS, 0, i * pS, dim * pS);
    }
}

class City {
    constructor() {
        this.houses = [new House()];
        this.roads = [];
    }

    draw() {
        for (const house of this.houses) {
            house.draw();
        }
    }
}

class House {
    constructor(x = null, y = null, houseWidth = 5, houseHeight = 5) {
        if (x == null) {
            x = floor(random((dim - houseWidth - 1)));
            y = floor(random((dim - houseHeight - 1)));
        }
        this.x = x;
        this.y = y;

        this.width = houseWidth;
        this.height = houseHeight;

        this.houseX = x + 1 + floor(random(houseWidth - 2));
        this.houseY = y + 1 + floor(random(houseHeight - 2));
        console.log(x, y, this.houseX, this.houseY)
    }

    draw() {
        noStroke();

        // fence
        fill(fenceColor);
        rect(pS * this.x, pS * this.y, pS * this.width, pS * this.height);

        // garden
        fill(gardenColor);
        rect(pS * (this.x + 1), pS * (this.y + 1), pS * (this.width - 2), pS * (this.height - 2));

        // house
        fill(houseColor);
        rect(pS * this.houseX, pS * this.houseY, pS * 1, pS * 1);


    }
}
function mousePressed() {
    currentX = int(mouseX / pS);
    currentY = int(mouseY / pS);
}
function mouseReleased() {
    let x = int(mouseX / pS) + 1;
    let y = int(mouseY / pS) + 1;

    if (x < currentX)
        [x, currentX] = [currentX, x];
    if (y < currentY)
        [y, currentY] = [currentY, y];
    myCity.houses.push(new House(currentX, currentY, x - currentX, y - currentY));
    myCity.draw();
}

function draw() {
    myCity.draw();
}