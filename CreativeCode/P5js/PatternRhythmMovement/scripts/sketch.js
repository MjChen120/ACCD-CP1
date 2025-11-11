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
    let size = 40 + i * 15;
    let count = i === 0 ? 1 : windowWidth/100;         
    let rotation = i * 0.8; 
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
  let hueShift2 = (sin(frameCount * 0.04 + PI / 2) + 1) * 180;
  let hueLine     = (sin(frameCount * 0.011 + PI) + 1) * 180;

  for (let p of pentagons) {
    push();
    translate(p.x, p.y);
    rotate(p.rot);
    stroke((hueShift + p.r * 2) % 360, 60, 90, 60); // color based on size
    drawPentagon(p.r);
    pop();
    
    push();
    translate(p.x, p.y)
    noStroke()
    fill((hueShift + p.r * 3) % 360,  60, 90, 60)
    circle(0, 0, p.r*0.5);
    pop();
    
    push();
    translate(p.x, p.y);
    rotate(p.rot);               
    strokeWeight(5);               // thickness of the added lines
    stroke((hueLine + p.r * 3) % 360, 40, 60, 70);  
    // draw a centered bar; change *0.9 to taste, or make it constant
    let L = p.r * 0.9;
    line(-L / 3, 0, L / 3, 0);
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


