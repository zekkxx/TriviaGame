# TriviaGame
A trivia game using jQuery and JavaScript timers. UofM Bootcamp assignment #5.

This project utilizes image files from external source: Sea and Sky - Fair Use: Educational/Not for Profit use

#Advanced Assignment: https://youtu.be/xhmmiRmxQ8Q
Create a trivia game that shows a question that shows only one question until the player answers it or time runs out (That's what a trivia game is after all)
Upon success:
    Screen congratulates them, automatically moves on after a few moments.
Upon failure:
    Time runs out: "Time is up" display correct answer, move on
    Player guess wrong: Tell player they chose wrong, display correct answer, move on
On the final screen, show the number of correct/incorrect answers and option to restart game (without reloading page)

#Design Choices
Minamalistic design, meaning no header although providing a footer is good for the link back to portfolio.
In addition, questionDiv will serve as both the location where the Questions are asked, as well as the Final Screen Correct/Incorrect display.
timerDiv serves as the timer, the Time is Up dsplay, and will also have the Restart Button on the final screen.
answersDiv serves as the location for the four different answers. Upon a good click, it will turn green, with the wrong answer it will turn red, and the correct answer will be highlighted in gold.

Originally I attempted to utilize a class in order to make a Game object that could hold all of my functions and information. Due to the constraints of data perpetuation and the seeming complexity of making buttons work with the object and make all data fit together nicely, I gave up on this approach and began to utilize myGame as an object instead, and approached the project differently. I have included the file with the code for my attempt in the class model as app-class.js for future reference.
--For the sake of posterity, I feel it necessary to include that you can use the class method. My issue wasn't in fact data perpetuation, but the fact that I called Math.random and not Math.random(). This has been reflected in app-class.

#Changes
On 5/21 code was introduced in order to add a content review section at the end of the game, as well as to clean up confusing code chunks.
Possible additional considerations to be made are different game lengths, and additional testing on the down time between questions.

#Important aspects -- Depreciated
Code has been added to remove the following aspects from my code. I chose to use indexOf() in an array which did not face the same limitations as it did for a string. In addition, myGame.isReadyToMoveOn proved to be too confusing of a code snippit to understand the intention of, so it was removed and replaced with the method of disabling upon click.
There are two really important aspects to this project that you'll run across in the project. I'd like to tackle explaining these in terms of difficulty, but these two points in particular are as follows:
myGame.isReadyToMoveOn  
myGame.askedQuestionIndex.search(" "+myGame.answerIndex+",")  

myGame.isReadyToMoveOn was originally an aspect that I created to identify and alert the application that the Answer buttons should be clickable, and while I could have settled this with a getElementsByClass("answerButton).disabled = true or another similar approach, I wanted to make sure that it was evident to anyone reading the code what the statement should be reading, and given the asynchronous aspect of the timer needing to disable the buttons as well, I chose to go for the boolean attribute of isReadyToMoveOn... is what I wish I could say. The honest truth is that I simply disliked the way that the buttons looked when I disabled them, and I didn't choose to spend the time on the CSS to improve that aspect.
If told to come back and refine my code and this project in general, this is definitely one aspect I would like to update.

myGame.askedQuestionIndex.search(" "+myGame.answerIndex+",") is a long, and complicated line. Although it isn't too difficult to understand. The object myGame which holds almost all of the variables from the program, has an attribute askedQuestionIndex (and in subsequent code there is a similar locally scoped variable for the answerButtons) which holds a string of the index points of all previous questions that have been asked in this instance of the game. Search is a method available to those strings which looks for the existence of the enclosed string within the string calling the method. However, it is flawed in that if searching a string containing "11" for "1", it will conclude that "1" is in this string because "11" is also considered "1"+"1". This was not acceptable for my parameters, so I needed a way to conclusively search for exactly that number in the string. Thus I concluded that I needed a preceding qualifier and a succeeding qualifier, and since humans tend to write lists with a comma at the end and a space in between that comma and the next item, I could use those as my qualifiers. Thus giving me the search term " "+myGame.answerIndex+",".
In addition, the askedQuestionIndex begins with a space for that very reason, such that the more human friendly concatination of myGame.answerIndex+", " could be added to askedQuestionIndex after every success.