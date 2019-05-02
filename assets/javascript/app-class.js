var myGame;
var constellationArray = ["andromeda", "aquarius", "aquila", "aries", "cancer", "canis-major", "capricornus", "carina", "centaurus", "cetus", "corona-borealis", "crater", "crux", "cygnus", "delphinus", "dorado", "draco", "eridanus", "gemini", "hercules", "hydra", "lacerta", "leo", "libra", "lupus", "lynx", "lyra", "orion", "pegasus", "perseus", "phoenix", "pisces", "sagittarius", "scorpius", "serpens-caput", "taurus", "ursa-major", "ursa-minor", "virgo"];

class Game{
    constructor(){
        this.correctAnswers;
        this.wrongAnswers;
        this.question;
        this.timerInterval;
        this.timeRemaining;
        this.index;
        this.applyStartScreen();
    }

    applyStartScreen(){
        $("#questionDiv").html("<h1>Are You READY!?</h1>");
        $("#timerDiv").html('<button id="startButton">Start Game!</button>');
        $("#startButton").on("click", nextQuestion);
        $("#answersDiv").empty();
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
    }

    nextQuestion(){
        this.newQuestion();
        this.applyQuestion();
    }

    newQuestion(){
        this.index = Math.floor(Math.random()*constellationArray.length);
        this.question = constellationArray[this.index];
        console.log(this.question);
    }

    applyQuestion(){
        $("#questionDiv").html("<h1>Name the following constellation:<img src='assets/images/"+this.question+".jpg'</h1>");
        this.applyTimer();
        this.applyAnswers();
    }

    applyTimer(){
        clearInterval(this.timerInterval);
        this.timeRemaining = 100;
        this.timerInterval = setInterval(decreaseTime, 130);
    }

    applyAnswers(){
        for(var i=1; i<=4; i++){
            var buttonString = '<button class="triviaAnswer">';
            var temporaryIndex = Math.floor(Math.random()*constellationArray.length);
            console.log(constellationArray[temporaryIndex]);
            buttonString+=constellationArray[temporaryIndex];
            buttonString +='</button>';
            console.log(buttonString);
            $("#answersDiv").append(buttonString);
        }//I decided to stop programming inside of the class at this point in time.
        //No more than 15 minutes later, I found that my issues had been not calling Math.random()
        //In line 50 I was using Math.random without the function call.
    }

    checkResponse(event){
        clearInterval(myGame.timerInterval);
        if(event==0){
            console.log("You timed out");
        } else {
            console.log(event.target.id);
        }
    }

    getScore(){
        return "Answers Correct: " + this.correctAnswers +
        " :: Answers Incorrect: " + this.wrongAnswers;
    }
}

$(function(){
    myGame = new Game();
    console.log(myGame.getScore());
    $(document).on("click", ".triviaAnswer", myGame.checkResponse);
})

function nextQuestion(){
    myGame.nextQuestion();
}

function decreaseTime(){
    myGame.timeRemaining--;
    $("#timerDiv").html("<span>"+myGame.timeRemaining+"</span>");
    if(myGame.timeRemaining<=0){
        myGame.timeRemaining = 0;
        $("#timerDiv").html("<span>Time is Up!</span>");
        clearInterval(myGame.timerInterval);
        myGame.checkResponse(0);
    }
}