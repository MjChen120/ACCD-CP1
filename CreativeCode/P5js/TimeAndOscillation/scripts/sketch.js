let numArcs = 10;
let diam = 160;
let strW = 20;
let bckClr;

const SUN_URLS = [
  "https://png.pngtree.com/png-vector/20240914/ourmid/pngtree-scientifically-accurate-realistic-illustration-of-the-sun-isolated-on-black-background-png-image_13831928.png",
  "https://png.pngtree.com/png-vector/20250120/ourmid/pngtree-glowing-hot-sun-with-fiery-surface-in-high-resolution-png-image_15284014.png",
  "https://png.pngtree.com/png-vector/20240515/ourmid/pngtree-sun-planet-in-space-vibrant-and-glowing-3d-icon-with-radiating-png-image_12470925.png",
];

const PLANET_URLS = [
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Transparent_Mercury.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Venus_globe_-_transparent_background.png/2048px-Venus_globe_-_transparent_background.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/1200px-Earth_Western_Hemisphere_transparent_background.png", 
  "https://upload.wikimedia.org/wikipedia/commons/6/68/Mars_%2816716283421%29_-_Transparent_background.png",
  "https://upload.wikimedia.org/wikipedia/commons/e/e1/Jupiter_%28transparent%29.png",
  "https://upload.wikimedia.org/wikipedia/commons/4/43/Saturnx.png",
  "https://upload.wikimedia.org/wikipedia/commons/3/34/Transparent_Uranus.png",
  "https://upload.wikimedia.org/wikipedia/commons/7/7d/Transparent_Neptune.png", 
  "https://upload.wikimedia.org/wikipedia/commons/9/94/Pluto-transparent.png",
];

let sunImages = [];
let planetImages = []; // ⭐️ NEW: Array to hold all 10 loaded planet images

// --- Variables for Continuous Motion (Planet Properties) ---
let planets = [];

// --- Variables for Interval-based Motion (Sun Change) ---
let currentSunStateIndex = 0;
let sunInterval = 3500;
let previousTime = 0;

function preload() {
  // Load Sun Images
  for (let url of SUN_URLS) {
    sunImages.push(loadImage(url));
  }

  for (let url of PLANET_URLS) {
    planetImages.push(loadImage(url));
  }
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, TWO_PI, 1, 1);
  bckClr = color(0, 0, 0);
  imageMode(CENTER);

  initializePlanets();
}

function initializePlanets() {
  for (let i = 0; i < numArcs; i++) {
    // Random Size (Mass) - Size is slightly larger/smaller than the image size
    let size = random(strW * 1.5, strW * 4);

    // Fixed Orbital Radius
    let orbitalSpacing = 35;
    let revolutionRadius = diam + (i + 1) * orbitalSpacing;

    // Unique Starting Phase
    let startPhase = random(TWO_PI);

    planets.push({
      size: size,
      radius: revolutionRadius,
      phase: startPhase,
      color: i * (TWO_PI / numArcs), 
      imageIndex: i % planetImages.length, 
    });
  }
}

function draw() {
  background(bckClr);

  let centerX = width * 0.5;
  let centerY = height * 0.5;

  const baseSpeed = 0.001;
  const noiseSpeed = 0.0001;
  const noiseMagnitude = PI * 0.1;

  // ---------------------------------------------------
  // 1. Interval-based Motion: Change the Sun's Appearance
  // ---------------------------------------------------
  let currentTime = millis();

  if (currentTime - previousTime > sunInterval) {
    currentSunStateIndex = (currentSunStateIndex + 1) % sunImages.length;
    sunInterval = random(2500, 4500);
    previousTime = currentTime;
  }

  // Draw the current Sun image
  let currentSunImage = sunImages[currentSunStateIndex];
  noTint();
  image(
    currentSunImage,
    centerX,
    centerY,
    200,
    200
  );

  // ---------------------------------------------------
  // 2. Continuous Motion: Draw the Planets in Orbit
  // ---------------------------------------------------
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];

    // Calculate Mass-Dependent Orbital Speed
    let massFactor = map(planet.size, strW * 1.5, strW * 4, 1.5, 0.5);
    let orbitalSpeed = (baseSpeed * massFactor) / (i + 1);

    // Styling for the Orbit Line
    noFill();
    strokeWeight(1);
    stroke(planet.color, 0.2, 0.5);

    // Draw the Orbit Line
    circle(centerX, centerY, planet.radius * 2);

    // Calculate the continuous base angle for the orbit
    let baseAngle = millis() * orbitalSpeed + planet.phase;

    // Perlin Noise perturbation
    let noiseVal = noise(millis() * noiseSpeed, i * 10);
    let randomOffset = map(noiseVal, 0, 1, -noiseMagnitude, noiseMagnitude);
    let angle = baseAngle + randomOffset;
    //Calculate the (x, y) position of the planet
    let x = centerX + cos(angle) * planet.radius;
    let y = centerY + sin(angle) * planet.radius;

    // Draw the Unique Planet Image

    let currentPlanetImage = planetImages[planet.imageIndex];

    noTint();

    // Draw the planet image using its stored random size
    image(currentPlanetImage, x, y, planet.size, planet.size);
  } //end of for loop

  noTint();
}
