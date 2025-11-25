let numArcs = 10;
let diam = 160;
let strW = 20;

let bckClr;
let planetEmojis = ['🪐', '🌍', '☄️', '🌑', '🌕', '🌀', '💫', '⭐', '✨', '🔥']; 

// --- Variables for Continuous Motion (Planet Properties) ---
let planets = []; // Array to store permanent properties like size/mass

// --- Variables for Interval-based Motion (Sun Change) ---
let sunStates = [
  { text: "☀️", size: 100, color: 'yellow' },
  { text: "🔥", size: 100, color: 'orange' },
  { text: "🌟", size: 100, color: 'red' },
  { text: "🔅", size: 100, color: 'white' }
];
let currentSunStateIndex = 0;
let sunInterval = 3500;
let previousTime = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, TWO_PI, 1, 1);
  bckClr = color(0, 0, 0);
  
  textAlign(CENTER, CENTER);

  // Initialize Planet Properties (Runs once)
  initializePlanets();
}

function initializePlanets() {
    // Determine the permanent radius and mass-related properties for each planet
    for (let i = 0; i < numArcs; i++) {
        // 1. Random Size (Mass)
        // Size will be between strW * 0.8 and strW * 3
        let size = random(strW * 0.8, strW * 3); 
        
        // 2. Fixed Orbital Radius
        let orbitalSpacing = 35;
        let revolutionRadius = diam + (i + 1) * orbitalSpacing;

        // 3. Unique Starting Phase
        let startPhase = random(TWO_PI);

        planets.push({
            size: size,
            radius: revolutionRadius,
            phase: startPhase,
            emoji: planetEmojis[i % planetEmojis.length],
            color: i * (TWO_PI / numArcs) // Store HSB hue for color
        });
    }
}

function draw() {
  background(bckClr);
  
  let centerX = width * 0.5;
  let centerY = height * 0.5;
  
  // Base speed multiplier
  const baseSpeed = 0.001; 
  // Noise influence factors
  const noiseSpeed = 0.0001;
  const noiseMagnitude = PI * 0.1;

  // ---------------------------------------------------
  // 1. Interval-based Motion: Change the Sun's Appearance
  // ---------------------------------------------------
  let currentTime = millis();
  
  if (currentTime - previousTime > sunInterval) {
    currentSunStateIndex = (currentSunStateIndex + 1) % sunStates.length;
    sunInterval = random(2500, 4500); 
    previousTime = currentTime;
  }

  // Draw the current Sun icon
  let currentSun = sunStates[currentSunStateIndex];
  textSize(currentSun.size);
  fill(currentSun.color); 
  noStroke();
  text(currentSun.text, centerX, centerY); 

  // ---------------------------------------------------
  // 2. Continuous Motion: Draw the Planets in Orbit
  // ---------------------------------------------------
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    
    // ⭐️ Key Change 1: Calculate Mass-Dependent Orbital Speed
    // Speed is inversely related to the planet's mass (represented by size)
    // and its distance from the sun. Smaller/closer planets move faster.
    // We use the reciprocal of size to make it mass-dependent.
    // The divisor 100 is for scaling the visual effect.
    let massFactor = map(planet.size, strW * 0.8, strW * 3, 1.5, 0.5); // Smaller size = higher factor
    let orbitalSpeed = (baseSpeed * massFactor) / (i + 1);

    // Styling for the Orbit Line
    noFill();
    strokeWeight(1);
    stroke(planet.color, 0.2, 0.5); 
    
    // Draw the Orbit Line
    circle(centerX, centerY, planet.radius * 2);

    // 3. Calculate the continuous base angle for the orbit
    let baseAngle = (millis() * orbitalSpeed) + planet.phase; // Use stored phase
    
    // 4. Introduce Perlin Noise perturbation
    let noiseVal = noise(millis() * noiseSpeed, i * 10);
    let randomOffset = map(noiseVal, 0, 1, -noiseMagnitude, noiseMagnitude);
    let angle = baseAngle + randomOffset;
        
    // 5. Calculate the (x, y) position of the planet
    let x = centerX + cos(angle) * planet.radius;
    let y = centerY + sin(angle) * planet.radius;

    // 6. Draw the Planet Image (Emoji)
    
    // ⭐️ Key Change 2: Use the stored, random size for the text icon
    textSize(planet.size);
    noStroke();
    
    // Draw the colored circle background behind the emoji (optional, for better visibility)
    fill(planet.color, 0.8, 0.8);
    circle(x, y, planet.size * 0.9);
    
    // Draw the emoji icon on top
    fill(0); // Black text for contrast
    text(planet.emoji, x, y);
    
  } //end of for loop
}