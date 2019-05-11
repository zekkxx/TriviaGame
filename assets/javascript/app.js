var constellationArray = ["andromeda", "aquarius", "aquila", "aries", "cancer", "canis-major", "capricornus", "carina", "centaurus", "cetus", "corona-borealis", "crater", "crux", "cygnus", "delphinus", "dorado", "draco", "eridanus", "gemini", "hercules", "hydra", "lacerta", "leo", "libra", "lupus", "lynx", "lyra", "orion", "pegasus", "perseus", "phoenix", "pisces", "sagittarius", "scorpius", "serpens-caput", "taurus", "ursa-major", "ursa-minor", "virgo"];
var timerInterval;
var myGame = new Object(); /*Has the following fields: {
    correctAnswers, //The number of correct answers out of 10 questions
    wrongAnswers, //The number of incorrect answers out of 10 questions
    askedQuestionIndex, //The indexes of asked questions
    currentAnswer //The current correct answer
    answerIndex //The index of the current question
    timeRemaining //Remaining time for the timer
}*/

function applyStartScreen(){
    $("#questionDiv").html("<h1>Are You READY!?</h1>");
    $("#timerDiv").html('<button id="startButton">Start Game!</button>');
    $("#startButton").on("click", startNewGame);
    $("#answersDiv").empty();
}

function startNewGame(){
    myGame.correctAnswers = 0;
    myGame.wrongAnswers = 0;
    myGame.askedQuestionIndex = " ";
    getNewQuestion();
}

function getNewQuestion(){
    var newQuestion = false;
    while(newQuestion!=true){
        myGame.answerIndex = Math.floor(Math.random()*constellationArray.length);
        if(myGame.askedQuestionIndex.search(" "+myGame.answerIndex+",")==-1){
            newQuestion=true;
            //console.log("New Question Asked")
        } else {
            //console.log("Oops, we've already asked this question. Try again.");
        }
    }
    myGame.currentAnswer = constellationArray[myGame.answerIndex];
    myGame.askedQuestionIndex+=myGame.answerIndex+", ";
    console.log(myGame.askedQuestionIndex);
    updatePage();
}

function updatePage(){
    console.log("Updating Page: "+constellationArray[myGame.answerIndex]);
    $("#questionDiv").html("<h1>Name the following constellation:</h1><img src='assets/images/"+constellationArray[myGame.answerIndex]+".jpg'>");
    createTimer();
    createAnswers();
}

function createTimer(){
    clearInterval(timerInterval);
    myGame.timeRemaining = 100;
    timerInterval = setInterval(decreaseAnswerTime, 130);
}

function decreaseAnswerTime(){
    myGame.timeRemaining--;
    $("#timerDiv").html("<span>"+myGame.timeRemaining+"</span>");
    if(myGame.timeRemaining<=0){
        myGame.timeRemaining = 0;
        $("#timerDiv").html("<h1>Time is Up! Please wait 5 seconds</h1>");
        clearInterval(timerInterval);
        setTimeout(checkGameState, 5000);
        myGame.wrongAnswers++;
        illuminateRightAnswer();
        myGame.isReadyToMoveOn = false;
    }
}

function createAnswers(){
    $("#answersDiv").empty();
    let answerUsed = false;
    let answerIndexString = " "+myGame.answerIndex+", ";
    for(var i = 0; i<4; i++){
        let answerButton = $("<button>");
        if(answerUsed!=true && Math.floor(Math.random()*(4-i))==0){
            answerButton.text(constellationArray[myGame.answerIndex].toUpperCase());
            answerButton.attr("id", myGame.answerIndex);
            answerUsed = true;
        } else {
            var newAnswer = false;
            var index;
            while(newAnswer!=true){
                index = Math.floor(Math.random()*constellationArray.length);
                if(answerIndexString.search(" "+index+",")==-1){
                    newAnswer = true;
                    answerIndexString += index+", ";
                } else {
                    console.log("Oops, we've already used this answer!");
                }
            }
            answerButton.text(constellationArray[index].toUpperCase());
            answerButton.attr("id", index);
        }
        answerButton.attr("class", "answerButton");
        $("#answersDiv").append(answerButton);
        //console.log(answerButton);
    }
    myGame.isReadyToMoveOn = true;
    //console.log(answerIndexString);
}

function checkResponse(event){
    if(myGame.isReadyToMoveOn){
        myGame.isReadyToMoveOn = false;
        clearInterval(timerInterval);
        setTimeout(checkGameState, 5000);
        if(event.target.id == myGame.answerIndex){
            myGame.correctAnswers++;
            $(event.target).attr("style", "background-color: green");
            $("#timerDiv").html("<h2>Correct Answer! Please wait 5 seconds</h2>");
        } else {
            myGame.wrongAnswers++;
            $(event.target).attr("style", "background-color: red");
            $("#timerDiv").html("<h2>Wrong Answer! Please wait 5 seconds</h2>");
            illuminateRightAnswer();
        }
    }
}

function checkGameState(){
    if(myGame.wrongAnswers + myGame.correctAnswers >= 10){
        finishGame();
    } else {
        getNewQuestion();
    }
}

function illuminateRightAnswer(){
    $("#"+myGame.answerIndex).attr("style", "background-color: gold");
}

function finishGame(){
    $("#questionDiv").html("<h1>You got "+myGame.correctAnswers+" questions correct</h1>"
        +"<h1>&</h1>"+"<h1>You got "+myGame.wrongAnswers+" questions wrong!</h1>");
    $("#timerDiv").html('<button id="startButton">Restart Game!</button>')
    $("#startButton").on("click", startNewGame);
    $("#answersDiv").empty();
}

$(function(){
    $(document).on("click", ".answerButton", checkResponse);
    applyStartScreen();
    //console.log(myGame);
})
