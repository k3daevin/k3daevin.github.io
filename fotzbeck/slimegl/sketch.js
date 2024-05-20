function setup() {
  let c = createCanvas(400, 400, WEBGL);
  console.log(webglVersion)
  document.body.append(document.createTextNode(webglVersion))
}
let angle = 0.0
function draw() {
  background(220);
  rotateX(angle*2)
  rotateY(angle*3)
  rotateZ(angle*5)
  
  box(50,50,50)
  angle += 0.01
}
