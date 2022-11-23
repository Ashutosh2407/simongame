buttonColors = ["red","blue","red","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animate(userChosenColor);
  checkAnswer(userClickedPattern.length-1)
});

$(document).keypress(function(){
  if (!started){
    nextSequence();
    started = true;
  }

});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
      userClickedPattern = [];
    }
  }
  else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, press any key to continue");
    },200);
    startOver();
  }
}

function startOver(){
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
}

function nextSequence(){
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animate(randomChosenColor);
  playSound(randomChosenColor);


}

function animate(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function playSound(name){
  const audio = new Audio("sounds/"+name+".mp3");
  audio.play()
}
