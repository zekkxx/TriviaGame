# TriviaGame
A trivia game using jQuery and JavaScript timers. UofM Bootcamp assignment #5.

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