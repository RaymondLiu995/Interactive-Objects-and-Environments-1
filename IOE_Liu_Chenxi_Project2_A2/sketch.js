let cam;
let poseNet;
let handL, handR;
let penColor;
let points = [];


setup = () => {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-holder');
    cam = createCapture(VIDEO);
    cam.hide();
    cam.size(windowWidth, windowHeight);
    poseNet = ml5.poseNet(cam, {
        flipHorizontal: true //flips interaction
    }, modelReady);
    poseNet.on('pose', gotPoses);

    handL = createVector(width / 2, height / 2);
    handR = createVector(width / 2, height / 2);

    noStroke();
    btn1 = new HButton(100, height - 100 , "green pen" , 'green', changePen);
    btn2 = new HButton(width - 100 , height - 100 , "blue pen" , 'blue', changePen);
    btn3 = new HButton(width/2, 100 , "clear" , 'red', clearCanvas);

    penColor = 'rgba(0, 200, 0, 100)';
}

//dont move
let gotPoses = (poses) => {
    if (poses.length > 0) {
        handL.x = lerp(poses[0].pose.keypoints[9].position.x, handL.x, 0.5);
        handL.y = lerp(poses[0].pose.keypoints[9].position.y, handL.y, 0.5);
        handR.x = lerp(poses[0].pose.keypoints[10].position.x, handR.x, 0.5);
        handR.y = lerp(poses[0].pose.keypoints[10].position.y, handR.y, 0.5);
        points.push({x:handR.x , y:handR.y , color:penColor})
    }
}


let modelReady = () => {
    console.log('model ready');
}

//this next part is just the set up for draw therefore it shouldn't change

draw = () => {

    //same as here
    fill(250, 250, 250, 255);
    rect(0, 0, width, height);


    //draw pen line
    drawPenLine();
    noStroke();

    //draw buttons, pass in hand positions to check if over
    btn1.update(handL.x, handL.y);
    btn2.update(handL.x, handL.y);
    btn3.update(handL.x, handL.y);

    //draw left hands circles
    fill(0, 200, 0, 100);
    ellipse(handL.x, handL.y, 100);

    //draw right hands circles
    fill(penColor);
    ellipse(handR.x, handR.y, 100);
}

let changePen = (color) => {
    penColor = color;
}

let clearCanvas = (color) => {
    points = [];
}

let drawPenLine = () => {
    strokeWeight(8);
    if(points.length > 1){
        for(var i = 1 ; i < points.length ; i++){
            stroke(points[i].color);
            line(points[i-1].x , points[i-1].y , points[i].x ,points[i].y);
        }
    }
}

class HButton {
    constructor(posX, posY, label , color , onclick) {
        this.x = posX;
        this.y = posY;
        this.label = label;
        this.color = color;
        this.hover = false;
        this.onclick = onclick;
    }

    update(lx, ly) {
        rectMode(CENTER);
        fill(this.color);
        rect(this.x, this.y, 220, 180);

        let ld = dist(this.x, this.y, lx, ly);
        if (ld < 100) {
            fill(255, 125, 0);
            rect(this.x, this.y, 220, 180);
            if(this.hover == false)
                this.onclick(this.color);
            this.hover = true;
        } else {
            fill(0, 200, 0, 100);
            rect(this.x, this.y, 220, 180);
            this.hover = false;
        }

        rectMode(CORNERS);
        fill(255);
        textAlign(CENTER);
        textSize(24);
        text(this.label, this.x, this.y + 9);
    }
}
