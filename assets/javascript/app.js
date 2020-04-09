var constellationArray = ["andromeda", "aquarius", "aquila", "aries", "cancer", "canis-major", "capricornus", "carina", "centaurus", "cetus", "corona-borealis", "crater", "crux", "cygnus", "delphinus", "dorado", "draco", "eridanus", "gemini", "hercules", "hydra", "lacerta", "leo", "libra", "lupus", "lynx", "lyra", "orion", "pegasus", "perseus", "phoenix", "pisces", "sagittarius", "scorpius", "serpens-caput", "taurus", "ursa-major", "ursa-minor", "virgo"];
var timerInterval;
var myGame = new Object();

function applyStartScreen(){ //Creates start screen
    $("#questionDiv").html("<h1>Are You READY!?</h1>");
    $("#timerDiv").html('<button id="startButton">Start Game!</button>');
    $("#startButton").on("click", startNewGame); //Applys an on click function to the startButton
    $("#answersDiv").empty();
}

function startNewGame(){ //Sets game variables to new game stats
    myGame.correctAnswers = 0;
    myGame.askedQuestionArray = []; //Make blank question array
    myGame.givenAnswerArray = []; //Make blank response array
    getNewQuestion();
}

function getNewQuestion(){
    var newQuestion = false;
    while(newQuestion!=true){ //If answer index returns an answer already used, run again
        myGame.answerIndex = Math.floor(Math.random()*constellationArray.length); //get random number
        if(myGame.askedQuestionArray.indexOf(myGame.answerIndex)==-1){ //if random number hasn't been used yet
            newQuestion=true;
            //console.log("New Question Asked")
        } else {
            //console.log("Oops, we've already asked this question. Try again.");
        }
    }
    myGame.askedQuestionArray.push(myGame.answerIndex); //add new Question index to array
    updatePage();
}

function updatePage(){ //Updates page with new question information
    console.log("Updating Page: "+constellationArray[myGame.answerIndex]); //Turn this off if you don't want to console log answer
    $("#questionDiv").html("<h1>Name the constellation:</h1><img src='assets/images/"+constellationArray[myGame.answerIndex]+".jpg'>");
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
    $("#timerDiv").html("<span>Time Remaining: "+ Math.floor(myGame.timeRemaining/10) +" Seconds</span>");
    if(myGame.timeRemaining<=0){ //If time is up
        myGame.timeRemaining = 0;
        resetQuestionInteractivity();
        $("#timerDiv").html("<h1>Time is Up! Please wait a moment</h1>");
        illuminateRightAnswer();
        myGame.givenAnswerArray.push(null); //push a null response for later checks to response array
    }
}

function createAnswers(){ //Create random answer buttons available
    $("#answersDiv").empty();
    let answerUsed = false;
    let answerIndexArray = [myGame.answerIndex]; //create new answer Index string to compare new answers to.
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
                if(answerIndexArray.indexOf(index)==-1){ //if index value not used already
                    answerIndexArray.push(index); //add index value to list of values not to be used again for this question
                    newAnswer = true;
                } else {
                    //console.log("Oops, we've already used this answer!");
                }
            }
            answerButton.text(constellationArray[index].toUpperCase()); //Apply internal text of constellation
            answerButton.attr("id", index); //Apply index to ID
        }
        answerButton.attr("class", "answerButton"); //Apply class of answerButton to button
        $("#answersDiv").append(answerButton); //Place button in AnswersDiv
    }
}

function checkResponse(event){ //Check if answer is right or wrong
    resetQuestionInteractivity();
    if(event.target.id == myGame.answerIndex){ //If the button clicked has an ID value equal to the current answer's index
        $(event.target).attr("style", "background-color: green");
        $("#timerDiv").html("<h2>Correct!</h2>");
        myGame.correctAnswers++;
    } else { //If the button clicked does not have an ID value equal to the current answer's index
        $(event.target).attr("style", "background-color: red");
        illuminateRightAnswer();
        $("#timerDiv").html("<h2>Incorrect...</h2>");
    }
    myGame.givenAnswerArray.push(event.target.id); //push response into array of responses
}

function resetQuestionInteractivity(){
    $(".answerButton").attr("disabled", true); //disable answer buttons
    clearInterval(timerInterval);
    setTimeout(checkGameState, 2000); //Check game conditions after 3 seconds
        //TAs did not like this method. 5 seconds is too long? Possible mutation point
}

function checkGameState(){ //Check that the game is continuing or over
    if(myGame.askedQuestionArray.length >= 10){ //If 10 questions have been asked
        finishGame();
    } else {
        getNewQuestion();
    }
}

function illuminateRightAnswer(){ //Turns the correct answer gold when an incorrect answer is selected
    $("#"+myGame.answerIndex).attr("style", "background-color: gold"); 
}

function finishGame(){ //Creates end game screen
    $("#questionDiv").html("<h1>You got "+myGame.correctAnswers+" out of 10 questions correct!</h1>");
    $("#timerDiv").html('<button id="startButton">Restart Game!</button>') //Reskin of the start button
    $("#startButton").on("click", startNewGame);
    showAnswerKey();
}

function showAnswerKey(){ //a function which creates a reviewable answer key
    $("#answersDiv").empty();
    let resultsContainer = $("<div>");
    resultsContainer.attr("id", "resultsDiv");
    for(var i=0; i<10; i++){ //for the number of questions asked
        let imgContainer = makeImgContainer(i); //make a new result image
        resultsContainer.append(imgContainer); //append result to resultsDiv
    }
    $("#answersDiv").append(resultsContainer);
}

function makeImgContainer(index){ //makes new result image
    var container = $("<div>"); //create image container
    container.attr("class", "imgContainer");
    let answerImg = makeAnswerImg(index); //make image
    let answerText = makeAnswerText(index); //get true answer
    let responseText = makeResponseText(index); //get responded answer
    container.append(answerImg, answerText, responseText); //append all to contained
    return container;
}

function makeAnswerImg(index){ //makes image constellation image for container
    let img = $("<img>");
    img.attr("src", "assets/images/"+constellationArray[ //assigns constellation name from index
        myGame.askedQuestionArray[index] //based on the askedQuestion at that question number
    ]+".jpg")
    img.attr("class", "resultsImg");
    return img;
}

function makeAnswerText(index){ //makes the correct answer text
    var textSpan = makeText("answer");
    textSpan.text("Answer: " + constellationArray[ //writes the constellation name from index
        myGame.askedQuestionArray[index] //based on the askedQuestion at that question number
    ].toUpperCase()); //in the upper case
    return textSpan;
}

function makeResponseText(index){ //makes the responded answer text
    var textSpan = makeText("response");
    if(myGame.givenAnswerArray[index] == null){ //if no response was given
        textSpan.text("No answer given");
    } else {
        textSpan.text("Your Response: " + constellationArray[ //writes the constellation name from index
            myGame.givenAnswerArray[index] //based on the givenAnswer at that question number
        ].toUpperCase()); //in the upper case
    }
    if(myGame.askedQuestionArray[index] == myGame.givenAnswerArray[index]){ //if real answer and player answer match
        textSpan.attr("style", "background-color: green") //give green background to text
    } else { //if they don't match
        textSpan.attr("style", "background-color: red") //give red background to text
    }
    return textSpan;
}

function makeText(type){ //base template for text
    let textSpan = $("<span>"); //make a span
    textSpan.attr("class", type+" imgText"); //and assign two classes to it, answer/response and imgText
    return textSpan;
}

$(function(){ //on document ready
    $(document).on("click", ".answerButton", checkResponse); //Any button with class answerButton calls checkResponse on click
    applyStartScreen();
})
