var constellationArray = ["andromeda", "aquarius", "aquila", "aries", "cancer", "canis-major", "capricornus", "carina", "centaurus", "cetus", "corona-borealis", "crater", "crux", "cygnus", "delphinus", "dorado", "draco", "eridanus", "gemini", "hercules", "hydra", "lacerta", "leo", "libra", "lupus", "lynx", "lyra", "orion", "pegasus", "perseus", "phoenix", "pisces", "sagittarius", "scorpius", "serpens-caput", "taurus", "ursa-major", "ursa-minor", "virgo"];
var timerInterval;
var myGame = new Object(); /*Has the following fields: {
    correctAnswers, //The number of correct answers out of 10 questions
    wrongAnswers, //The number of incorrect answers out of 10 questions
    askedQuestionIndex, //The indexes of asked questions
    answerIndex //The index of the current question
    timeRemaining //Remaining time for the timer
}*/

function applyStartScreen(){ //Creates start screen
    $("#questionDiv").html("<h1>Are You READY!?</h1>");
    $("#timerDiv").html('<button id="startButton">Start Game!</button>');
    $("#startButton").on("click", startNewGame); //Applys an on click function to the startButton
    $("#answersDiv").empty();
}

function startNewGame(){ //Sets game variables to new game stats
    myGame.correctAnswers = 0;
    myGame.wrongAnswers = 0;
    myGame.askedQuestionIndex = " "; //Use a space here, for reasons why see getNewQuestion or ReadMe
    getNewQuestion();
}

function getNewQuestion(){
    var newQuestion = false;
    while(newQuestion!=true){ //If answer index returns an answer already used, run again
        myGame.answerIndex = Math.floor(Math.random()*constellationArray.length);
        //Because search returns true for 11 when searching for 1:
        if(myGame.askedQuestionIndex.search(" "+myGame.answerIndex+",")==-1){ //Force exact number between space and comma elements
            newQuestion=true;
            //console.log("New Question Asked")
        } else {
            //console.log("Oops, we've already asked this question. Try again.");
        }
    }
    //Because askedQuestionIndex begins with " "
    myGame.askedQuestionIndex+=myGame.answerIndex+", "; //add new Question index with " " and "," identifiers written in
    //console.log(myGame.askedQuestionIndex); //A console log for string of questions asked so far
    updatePage();
}

function updatePage(){ //Updates page with new question information
    console.log("Updating Page: "+constellationArray[myGame.answerIndex]); //Turn this off if you don't want to console log answer
    $("#questionDiv").html("<h1>Name the following constellation:</h1><img src='assets/images/"+constellationArray[myGame.answerIndex]+".jpg'>");
    createTimer();
    createAnswers();
}

function createTimer(){ //Create timer for question
    clearInterval(timerInterval);
    myGame.timeRemaining = 100; //This should equate out to the number of perceived seconds players get
    timerInterval = setInterval(decreaseAnswerTime, 130); //Give player slightly longer than a 10th of a second per decrease
}

function decreaseAnswerTime(){ //Decrease time and check for lose conditions
    myGame.timeRemaining--;
    $("#timerDiv").html("<span>"+myGame.timeRemaining+"</span>");
    if(myGame.timeRemaining<=0){ //If time is up
        myGame.timeRemaining = 0;
        $("#timerDiv").html("<h1>Time is Up! Please wait 5 seconds</h1>");
        clearInterval(timerInterval);
        setTimeout(checkGameState, 5000); //Check game state (end game conditions) after 5 seconds
            //TAs did not like this method. 5 seconds is too long? Possible mutation point
        myGame.wrongAnswers++;
        illuminateRightAnswer();
        myGame.isReadyToMoveOn = false; //Set button.clickable condition to false
    }
}

function createAnswers(){ //Create random answer buttons available
    $("#answersDiv").empty();
    let answerUsed = false;
    //Because search returns true for 11 when searching for 1:
    let answerIndexString = " "+myGame.answerIndex+", "; //create new answer Index string to compare new answers to.
    for(var i = 0; i<4; i++){ //Loop to run 4 times
        let answerButton = $("<button>"); //create new button
        if(answerUsed!=true && Math.floor(Math.random()*(4-i))==0){ //Formula to ensure that the true answer is used randomly, see ReadMe
            answerButton.text(constellationArray[myGame.answerIndex].toUpperCase()); //Apply internal text of constellation
            answerButton.attr("id", myGame.answerIndex); //Apply index to ID
            answerUsed = true; //Do not reuse this asnwer
        } else {
            var newAnswer = false; //This is not a new answer yet
            var index; //This is a temporary index value
            while(newAnswer!=true){ //If index returns a previously used answer, run again
                index = Math.floor(Math.random()*constellationArray.length); //Get random index
                if(answerIndexString.search(" "+index+",")==-1){ //Force exact number between space and comma elements
                    newAnswer = true;
                    answerIndexString += index+", "; //add new Question index with " " and "," identifiers written in
                } else {
                    //console.log("Oops, we've already used this answer!");
                }
            }
            answerButton.text(constellationArray[index].toUpperCase()); //Apply internal text of constellation
            answerButton.attr("id", index); //Apply index to ID
        }
        answerButton.attr("class", "answerButton"); //Apply class of answerButton to button
        $("#answersDiv").append(answerButton); //Place button in AnswersDiv
        //console.log(answerButton);
    }
    myGame.isReadyToMoveOn = true; //Set button.clickable condition to true
    //console.log(answerIndexString);
}

function checkResponse(event){ //Check if answer is right or wrong
    if(myGame.isReadyToMoveOn){
        myGame.isReadyToMoveOn = false; //Set button.clickable condition to false
        clearInterval(timerInterval);
        setTimeout(checkGameState, 5000); //Check game conditions after 5 seconds
        if(event.target.id == myGame.answerIndex){ //If the button clicked has an ID value equal to the current answer's index
            myGame.correctAnswers++;
            $(event.target).attr("style", "background-color: green");
            $("#timerDiv").html("<h2>Correct Answer! Please wait 5 seconds</h2>");
        } else { //If the button clicked does not have an ID value equal to the current answer's index
            myGame.wrongAnswers++;
            $(event.target).attr("style", "background-color: red");
            $("#timerDiv").html("<h2>Wrong Answer! Please wait 5 seconds</h2>");
            illuminateRightAnswer();
        }
    }
}

function checkGameState(){ //Check that the game is continuing or over
    if(myGame.wrongAnswers + myGame.correctAnswers >= 10){ //If 10 questions have been asked
        finishGame();
    } else {
        getNewQuestion();
    }
}

function illuminateRightAnswer(){ //Turns the correct answer gold when an incorrect answer is selected
    $("#"+myGame.answerIndex).attr("style", "background-color: gold"); 
}

function finishGame(){ //Creates end game screen
    $("#questionDiv").html("<h1>You got "+myGame.correctAnswers+" questions correct</h1>"
        +"<h1>&</h1>"+"<h1>You got "+myGame.wrongAnswers+" questions wrong!</h1>");
    $("#timerDiv").html('<button id="startButton">Restart Game!</button>') //Reskin of the start button
    $("#startButton").on("click", startNewGame);
    $("#answersDiv").empty();
}

$(function(){
    $(document).on("click", ".answerButton", checkResponse); //Any button with class answerButton calls checkResponse on click
    applyStartScreen();
    //console.log(myGame);
})
