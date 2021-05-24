function playGame() {
    
    $("#level-title").text("Level " + gameItems.level);
    var newItem = gameItems.map[Math.floor(Math.random()*4)];
    gameItems.seq.push(newItem);
    buttonPress(newItem);
    
    $(".btn").click(function() {
        console.log(gameItems.running);
        var color = $(this).attr("id");
        buttonPress(color);
        if(gameItems.running == 1) {
            if(color == gameItems.seq[gameItems.curr]) {
                gameItems.curr++;
            } else {
                wrongPress();
                $("#level-title").text("Game Over! Press any key to restart");
                reset();
            }
            if(gameItems.curr >= gameItems.seq.length && gameItems.running == 1) {
                nextLevel();
            }
        } else {
            wrongPress();
        }
    })
}

function nextLevel() {
    
    gameItems.level++;
    $("#level-title").text("Level " + gameItems.level);
    gameItems.curr = 0;

    var newItem = gameItems.map[Math.floor(Math.random()*4)];
    gameItems.seq.push(newItem);
    
    setTimeout(function() {
        buttonPress(newItem);
    },1000);

    console.log("Level list : " + gameItems.seq);
}

var gameItems = {
    map: ["green", "red", "yellow", "blue"],
    level : 1,
    seq : [],
    curr: 0,
    running : 0
};

function reset() {
    gameItems.level = 1;
    gameItems.seq = [];
    gameItems.curr = 0;
    gameItems.running = 0;
}

function playAudio(name) {
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function buttonPress(color) {
    var box = $("." + color);
    var color = box.attr("id");
    playAudio(color);
    box.addClass("pressed");
    setTimeout(function() {
        box.removeClass("pressed");
    }, 100);
}

function wrongPress(){
    playAudio("wrong");
    $("body").addClass("red");
    setTimeout(function() {
        $("body").removeClass("red");
    }, 100);
}

var start = 0;

$(".btn").click(function(){
    if(start == 0) {
        buttonPress($(this).attr("id"));
        wrongPress();
    }
})

$(document).keydown(function(){
    if(start == 0) {
        playGame();
        start = 1;
    } else if(gameItems.running == 0) {
        $("#level-title").text("Level " + gameItems.level);
        var newItem = gameItems.map[Math.floor(Math.random()*4)];
        gameItems.seq.push(newItem);
        buttonPress(newItem);
    }
    gameItems.running = 1;
});