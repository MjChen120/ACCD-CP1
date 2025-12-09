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
function gotResult(results, error) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  //console.log(results);
  label = results[0].label;

  if (label === "Nina+Momoka") {
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