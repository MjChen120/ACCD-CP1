let pentagons = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(2);
  angleMode(RADIANS);
  colorMode(HSB, 360, 100, 100, 100);

  // --- Set up the static pattern ---
  let numLayers = windowHeight/100; 
  for (let i = 0; i < numLayers; i++) {
    let layerRadius = i === 0 ? 0 : windowWidth/numLayers/2 * i; // center stays at 0
    let size = 40 + i * 15;                 // pentagon size
    let count = i === 0 ? 1 : windowWidth/100;         
    let rotation = i * 0.8;                 // rotation offset per layer
    let layerAngleOffset = i * 0.3;  

    for (let j = 0; j < count; j++) {
      let angle = TWO_PI * j / count + layerAngleOffset;
      pentagons.push({
        x: cos(angle) * layerRadius,
        y: sin(angle) * layerRadius,
        r: size,
        rot: angle + rotation
      });
    }
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // --- Animate the colors only ---
  let hueShift = (sin(frameCount * 0.02) + 1) * 180; // oscillates between 0–360

  for (let p of pentagons) {
    push();
    translate(p.x, p.y);
    rotate(p.rot);
    stroke((hueShift + p.r * 2) % 360, 60, 90, 60); // color based on size
    drawPentagon(p.r);
    pop();
  }
}

function drawPentagon(r) {
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = TWO_PI / 5 * i - PI / 2;
    vertex(cos(angle) * r, sin(angle) * r);
  }
  endShape(CLOSE);
}

function windowResized() {
  // Resize the canvas to match the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}


