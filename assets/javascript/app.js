var constellationArray = ["andromeda", "aquarius", "aquila", "aries", "cancer", "canis-major", "capricornus", "carina", "centaurus", "cetus", "corona-borealis", "crater", "crux", "cygnus", "delphinus", "dorado", "draco", "eridanus", "gemini", "hercules", "hydra", "lacerta", "leo", "libra", "lupus", "lynx", "lyra", "orion", "pegasus", "perseus", "phoenix", "pisces", "sagittarius", "scorpius", "serpens-caput", "taurus", "ursa-major", "ursa-minor", "virgo"];
var myGame = new Object(); /*Has the following fields: {
    correctAnswers, //The number of correct answers out of 10 questions
    wrongAnswers, //The number of incorrect answers out of 10 questions
    askedQuestionIndex, //The indexes of asked questions
    currentAnswer //The current correct answer
}*/

function startNewGame(){
    myGame.correctAnswers = 0;
    myGame.wrongAnswers = 0;
    myGame.askedQuestionIndex = " ";
    for(var i=0; i<10; i++){
        getNewQuestion();
    }
    
}

function getNewQuestion(){
    var newQuestion = false;
    while(newQuestion!=true){
        var index = Math.floor(Math.random()*constellationArray.length);
        if(myGame.askedQuestionIndex.search(" "+index+",")==-1){
            newQuestion=true;
            console.log("New Question Asked")
        } else {
            console.log("Oops, we've already asked this question. Try again.");
        }
    }
    myGame.currentAnswer = constellationArray[index];
    myGame.askedQuestionIndex+=index+", ";
    console.log(myGame.askedQuestionIndex);
    console.log(myGame.currentAnswer);
}

startNewGame();
console.log(myGame);