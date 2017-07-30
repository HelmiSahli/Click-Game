var canvas;
var score;
var buttonIncrese;
var buttonDecrese;
var initialInput;
var submitButton;
var database;
function setup() {
  canvas=createCanvas(1344,300);
  canvas.parent('game');
  score=0;
  createP("CLICK The Buttons TO GET POINTS").parent('game');
  buttonIncrese = createButton('click here to increaseScore');
  buttonIncrese.mousePressed(increaseScore);

  buttonDecrese = createButton('click here to DecreaseScore');
  buttonDecrese.mousePressed(decreaseScore);
  buttonDecrese.parent('game');
  buttonIncrese.parent('game');
  initialInput = createInput('Who are you?');
  initialInput.parent('game');
  submitButton = createButton('submit to Firebase');
  submitButton.parent('game');
  submitButton.mousePressed(submitScore);

 var config = {
    apiKey: "AIzaSyC4zCtj4mc9sQv5lHuZ-LZt_J59flx4SXw",
    authDomain: "click-game-3de9e.firebaseapp.com",
    databaseURL: "https://click-game-3de9e.firebaseio.com",
    projectId: "click-game-3de9e",
    storageBucket: "",
    messagingSenderId: "951426475245"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  var ref = database.ref('scores');
  ref.on('value',gotData,errData);
}
function gotData(data){
  var scorelistings = selectAll('.scorelisting');
  for(var i=0;i<scorelistings.length;i++){
    scorelistings[i].remove();
  }

  var scores =data.val();
  var keys=Object.keys(scores);
  console.log(keys);
  for(var i=0;i<keys.length;i++){
    var k=keys[i];
    var initials=scores[k].initials;
    var score =scores[k].score;
    //console.log(initials, score);
  var li=createElement('li',initials +': '+ score);
  li.class('scorelisting');
  li.parent('scorelist');
  }
}
function errData(err){
  console.log('Error!');
  console.log(err);
}
function submitScore(){
  var data={
    initials:initialInput.value(),
    score:score
  }
  console.log(data);
  var ref = database.ref('scores');
  var result= ref.push(data);
  console.log(result.key);
}

function increaseScore(){
  score++;
}

function decreaseScore(){
  score--;
}

function draw() {
  background(100);
  textAlign(CENTER);
  textSize(40);
  fill(255);
  text(score,width /2,height / 2);
}

