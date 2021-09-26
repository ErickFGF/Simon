var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var playerPattern = [];
var level = 0;
var answer = true;

function startGame(key){
    if(level == 0){
        if(key == "a"){
            level = 1;
            switch(key){
                case "a":
                    $("h1").text("Level " + level);
                    nextSequence();
                    playerPattern = [];
                    break;
                default:
                    return;
            }
        }
    }
}

function checkAnswer(lvl){
    if(lvl > 0){
        for(i=0; i < playerPattern.length; i++){
            if(playerPattern[i] == gamePattern[i]){
                answer = true;
            } else{
                answer = false;
            }
        }
        if(answer == false){
        $("body").addClass("pressed");
            setTimeout(function(){
                $("body").removeClass("pressed");
            }, 200);
            $("h1").text("GAME OVER. Press A to Restart.");
            level = 0;
            gamePattern = [];
            playerPattern = [];
        }else if(playerPattern.length == gamePattern.length){
            level++;
            playerPattern = [];
            $("h1").text("Level " + level);
            setTimeout(function(){
                nextSequence();
            }, 1000);
        } else{
            return;
        }
    }
}

function playSound(colorSelected){
    var audio;
    if(answer == false){
        audio = audio = new Audio("sounds/wrong.mp3");
        audio.play();
    }else{
        audio = new Audio("sounds/" + colorSelected + ".mp3");
        audio.play();
    }
    
}

function animatePress(pressedButton){
    var activeButton = $("." + pressedButton);
    if(activeButton){
        activeButton.addClass("pressed");
        setTimeout(function(){
            activeButton.removeClass("pressed");
        }, 100);
    }
}

function nextSequence(){
    var randVar = Math.floor(Math.random() * 4 );
    var randChosenColor = buttonColors[randVar];
    gamePattern.push(randChosenColor);
    $("#" + randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randChosenColor);
}

document.addEventListener("keypress", function(event){
    startGame(event.key);
});

$(".btn").click(function(){
    var clickedButton = $(this).attr("id");
    playerPattern.push(clickedButton);
    animatePress(clickedButton);
    checkAnswer(level);
    playSound(clickedButton);
    answer = true;
});
