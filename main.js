let video;
let poseNet;
let poses = [];

function setup() {
  video = createCapture(VIDEO);
  video.size(320, 240); 
  video.hide(); 
  
  let tela = createCanvas(320, 240);
  tela.position(340, 0);
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('Modelo Posenet carregado!');
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  image(video, 0, 0, 320, 240);
  drawKeypoints();
  drawSkeleton();
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      fill(255, 0, 0);
      noStroke();
      ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let startPoint = skeleton[j][0];
      let endPoint = skeleton[j][1];
      stroke(0, 255, 0);
      line(startPoint.position.x, startPoint.position.y, endPoint.position.x, endPoint.position.y);
    }
  }
}
