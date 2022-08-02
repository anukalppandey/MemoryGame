var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var randomChosenColour;
var resume;
var i = 1;
var m = 0;

function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour)
        .animate({ opacity: 0.0 }, 100)
        .animate({ opacity: 1 }, 100);
}

function continueGame() {
    m = 0;
    userClickedPattern.length = 0;
    $("#level-title").text("Level " + i++);
    nextSequence();
}

function resultHandler() {
    if (userClickedPattern[m] === gamePattern[m]) {
        if (userClickedPattern.length === gamePattern.length) {
            resume = setTimeout(function () {
                continueGame();
            }, 1000);
        } else {
            m++;
        }
    } else {
        gameOver();
    }
}

function clickHandler() {
    if(userClickedPattern.length === gamePattern.length)
    {
        gameOver();
        clearTimeout(resume);
        return;
    }
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    resultHandler();
}

function gameOver() {
    playSound("wrong");
    $("body").toggleClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document).on("keydown", startGame);
    $(".btn").off("click");
    setTimeout(function () {
        $("body").toggleClass("game-over");
    }, 200);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startGame() {
    $(document).off("keydown");
    $(".btn").on("click", clickHandler);
    i = 1;
    gamePattern.length = 0;
    continueGame();
}

$(document).on("keydown", startGame);
