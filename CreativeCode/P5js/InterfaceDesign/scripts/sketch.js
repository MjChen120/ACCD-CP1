// Copyright (c) 2019 ml5
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/sZTPHOVH9/";

// Video variables
let video; // Webcam
let musicVideo; // The video file to play
let label = "";
let dynamic = false;

// Load the model and media first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  
  musicVideo = createVideo(['Nina+Momoka.mp4']); 
  musicVideo.hide(); // Hide the default HTML DOM element so we can draw it on canvas
}

function setup() {
  createCanvas(640, 520);
  // Create the webcam video
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 520);
  video.hide();

  // Start classifying
  classifier.classifyStart(video, gotResult);
}

function draw() {
  background(0);

  // LOGIC: Check state to decide what to draw
  if (dynamic === true) {
    // Draw the music video if dynamic is true
    image(musicVideo, 0, 0, width, height);
  } else {
    // Otherwise draw the webcam feed
    image(video, 0, 0, width, height);
  }

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// When we get a result
function gotResult(results) {
  // Check if results exist and are not empty
  if (results && results.length > 0) {
    
    // 1. Get the label of the most confident result
    label = results,[object Object],label;
    
    // 2. Debugging: Print the actual label to the console to verify it works
    // console.log("Detected:", label);

    // 3. Your Logic
    if (label === "YOUR_PLUSHIE_LABEL") { 
      if (!dynamic) {
        dynamic = true;
        musicVideo.loop();
      }
    } else {
      if (dynamic) {
        dynamic = false;
        musicVideo.pause();
      }
    }
  }
}