
var video;
var clear;
var dec;
var frames = [];
var counter = 0;
var total;
var pictures = [];
var multiplier = 1;

function setup() {
  var neutral = "neutral";
  sessionStorage.setItem("multplier", neutral)
  createCanvas(800, 360);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  change = createButton('Change Size');
  change.mousePressed(function(){
    if (multiplier <= 0.25){
      clearScreen();
    }
    else{
      multiplier/=2
    }
  });
}
function draw() {
  var w = 160*multiplier;
  var h = 120*multiplier;
  var x = 0;
  var y = 0;

  total = floor(width / w) * floor(height / h);

  frames[counter] = video.get();
  counter++;
  if (counter == total) {
    counter = 0;
  }

  for (var i = 0; i < frames.length; i++) {

    var index = (i + frameCount) % frames.length;
    pictures[index] = image(frames[index], x, y, w, h);
    x = x + w;
    if (x >= width) {
      x = 0;
      y = y + h;
    }
  }
}

function clearScreen(){
  location.reload();
}

//credits
//https:github.com/CodingTrain/Rainbow-Code/blob/master/Tutorials/P5JS/p5.js_video/11.2_p5.js_photoBooth/sketch.js
