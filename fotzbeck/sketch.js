function touchStarted() {
  click();
  return false;
}

function mousePressed() {
  click();
  return false;
}

function click() {
  ellipse(mouseX, mouseY, 5, 5);
}

function setup() {
  createCanvas(800, 600);
  background(153);
  line(0, 0, width, height);
}

function draw() {
  // put drawing code here
}