song1 = "";
song2 = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreLeftWristY = 0;
status_song1 = "";
function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}
function setup(){
    canvas = createCanvas(500 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}
function draw(){
    image(video , 0 , 0 , 500 , 500);

    fill("#FF0000");
    stroke("#FF0000");
    status_song1 = song1.isPlaying();
    if(scoreLeftWristY > 0.2){
        circle(leftwristX , leftwristY , 25);
        song2.stop();
    }
    if(status_song1 == "false"){
        song1.play;
        document.getElementById("status").innerHTML = "Song no.1";
    }
}
function play(){
    song1.play();
}
function modelLoaded(){
    console.log('PoseNet is initialized');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log('left wrist x = '+leftwristX+"; left wrist y = "+leftwristY+'; right wrist x = '+rightwristX+"; right wrist y = "+rightwristY);
        scoreLeftWristY = results[0].pose.keypoints[9].score;

    }
}