/* 
    Javascript for Challenge 07 
    Developer - Steve Hannay 
    First Created - 20th January 2024

    This code handles logic for the Work Day Scheduler

*/


// Define Variables and Event Listeners
// ------------------------------------

// create references to html elements (using element id's)
var divCurrentDate = document.querySelector("#currentDay")


// create references to audio files
var audioCorrect = new Audio("./assets/sfx/correct.wav")
var audioIncorrect = new Audio("./assets/sfx/incorrect.wav")


// module variables
var objTimeblock = {}               // object containing the currently selected Timeblock and its properties

/* 

// constants 
const lengthOfGameInSeconds = 60    // GAME SETTING - sets Game Length used by the Game Timer
const timePenaltyInSeconds = 10     // GAME SETTING - sets the Time Penalty applied to the Game Timer following an incorrect answer


// Event Listeners 
btnStart.addEventListener("click", startQuiz)

divChoices.addEventListener("click", function(event) {

    var element = event.target;      
    if (element.matches("button") === true) {   // If the clicked element is a button

        // Get the userAnswerIndex from the "clicked" button 
        userAnswerIndex = element.getAttribute("data-index");
            
        // Check the "user answer" (userAnswerIndex) against the "correct answer" (correctAnswerIndex)
        checkAnswer()
    }
})

btnSubmitHighScore.addEventListener("click", addHighScore)



// MAIN Logic
// ----------

// (1) Start Quiz (triggered by "Start" button)
function startQuiz() {

    // reset game variables 
    askedIndexArray = []        
    allQuestionsAsked = false   
    questionsAnswered = 0       
    correctAnswers = 0          

    // Hide the "start-screen" div 
    divStartScreen.setAttribute("class","hide")

    // Start Game Timer
    runGameTimer()

    // Display the First Question
    displayNextQuestion()

}


// (2) Check User Answer (triggered by an "answer" buttons)
function checkAnswer() {

    // Check the users answer and display the next question (or end game)
    // note : the event handler for the "answer" buttons sets the variable userAnswerIndex before calling this function

    var questionAnsweredCorrectly = false

    // Prevent multi-clicking of Answer buttons
    // note : this prevents the user from quickly clicking on Answer buttons to the same question multiple times
    if (answerAlreadySelected == false){
        // flag that an Answer has now been selected
        answerAlreadySelected = true
    } else {
        // do nothing if an Answer for this question has already been selected and processed
        console.log("button click after original user Answer button click")
        return
    }

    // increment Number of Questions the user has Answered
    questionsAnswered ++    

    // check user's answer against the correct answer and update the Number of Correct Answers
    if (userAnswerIndex == objQuestion.correctAnswerIndex){
        questionAnsweredCorrectly = true
        correctAnswers ++
    }  
    console.log(correctAnswers + " out of " + questionsAnswered) // debugging
    
    // If the answer was incorrect then subtract time from the clock
    if (questionAnsweredCorrectly === false) {
        applyGameTimerPenalty()
    }

    // Display Feedback ("correct" or "wrong" answer)
    if (questionAnsweredCorrectly) {
        divFeedback.textContent = "Correct!"
        audioCorrect.play()
    }
    else {
        divFeedback.textContent = "Wrong Answer! A " + timePenaltyInSeconds + " second time penalty has been applied"
        audioIncorrect.play()
    }

    // Show feedback div
    divFeedback.setAttribute("class","feedback")                
    
    // - wait a while for user to see feedback div 
    setTimeout(function() {                                     
        
        // - hide feedback div
        divFeedback.setAttribute("class","feedback hide")    
        
        // Display next question (if any)
        displayNextQuestion()

        // If user has Answered All Questions then End Quiz
        if (allQuestionsAsked == true) {endQuiz()}

        // reset flag (so that the next answer can be taken)
        answerAlreadySelected = false

    }, 1500) // timer set to run code after 1.5 second(s)

}


// (3) End Quiz (called when the timer runs out or all questions have been answered)
function endQuiz() {

    // Stop Game Timer and Clear any currently displayed Question
    stopGameTimer() 
    clearQuestion()

    // Hide the "questions" div
    divQuestions.setAttribute("class","hide")

    // Display "end-screen" div
    divEndScreen.setAttribute("class","show")

    // Display the Final Score 
    spanFinalScore.textContent = correctAnswers + " (out of " + questionsAnswered + " questions answered)"
    
}


// (4) Save this games score to the High Scores List (triggered by "Submit High Score" button)
function addHighScore(){

    // Get the users initials
    var userInitials = inputEnterInitails.value.trim().toUpperCase()    // initials are trimmer and converted to upper case
    userInitials = userInitials.substring(0,5)                          // limit user initials to a maximum of 5 characters
    if (userInitials == "") {                                           // checks that at least one initial has been entered
        alert("Please enter your initials")
        return
    }

    // Create an object for containing This Game's score
    var thisGamesScore = {
        score: correctAnswers,
        outof: questionsAnswered,
        initials: userInitials,
        date: new Date().toLocaleDateString('en-GB')
    };

    // Return the High Scores List array of objects from local memory
    var highScoresList = JSON.parse(localStorage.getItem('highScoresList')) || [];

    // Add This Game's score (object) to the High Scores List array of objects
    //highScoresList.push([thisGamesScore])
    highScoresList.push(thisGamesScore)

    // Update the High Scores List array of objects by writing it to local memory (as a string) for later recall
    localStorage.setItem("highScoresList", JSON.stringify(highScoresList));

    // Navigate to the High Scores Page
    window.location.href = "highscores.html"

}
 */


// Utility functions
// -----------------

// Display Next Question 
function displayNextQuestion(){

    // Clear any currently displayed Question
    clearQuestion()

    // If the timer has expired, do not show the next question
    if (gameCounterSeconds < 1) {return}

    // Get Next Question to Display 
    // - sets the objQuestion object to the next Question to ask user (if there is an unasked question)
    // - sets allQuestionsAsked to true if all questions have already been asked
    getNextQuestion()
    
    // If NOT All Qustions have already been asked
    if (allQuestionsAsked == false){

        // Display new Question

        // Display Question Title
        divQuestionTitle.textContent = objQuestion.question

        // Display Buttons for ALL possible Answers
        var possibleAnswers = objQuestion.possibleAnswers  // get an array of all possible answers

        for (var i = 0; i < possibleAnswers.length; i++) {
        
            var selectedPossibleAnswer = possibleAnswers[i]
            var button = document.createElement("button")

            button.textContent = selectedPossibleAnswer
            button.setAttribute("data-index", i)  // set the data-index to the the possition of the selected Possible Answer 
            divChoices.appendChild(button)
        }

        // Set Visibility of the "questions" div to "show"
        divQuestions.setAttribute("class","show")
    }

}

// Get Next Question
function getNextQuestion(){

    // Randomly selects a question and sets the objQuestion object to hold the question
    // Sets allQuestionsAsked to true if all questions have been asked

    var nextQuestionFound = false 

    // Set flag if All Questions have already been Asked
    if (askedIndexArray.length == javacriptQuestions.length){
        allQuestionsAsked = true
    }

    // Repeat while next question not yet found and all questions have not been asked 
    while (nextQuestionFound == false && allQuestionsAsked == false) {
        
        // Select a question at Random
        objQuestion = javacriptQuestions[(Math.floor(Math.random() * javacriptQuestions.length))]
        
        // If the question has Not been asked before
        if (askedIndexArray.indexOf(objQuestion.questionIndex) == -1) {

            // Select this question (by ending the while loop) and add its questionIndex to the array of asked questions
            askedIndexArray.push(objQuestion.questionIndex)
            nextQuestionFound = true
        }
    }

}

// Clear the current Question
function clearQuestion() {

    // reset variables used for managing a question
    objQuestion = {}
    userAnswerIndex = 0
    
    // reset screen
    divQuestionTitle.textContent = ""   // clear text from the "question title" div
    divChoices.innerHTML = ""           // remove buttons from the "choices" div
}


// Game Timer     
function runGameTimer() {

    // Start the Game Timer
    // note : the value of the constant lengthOfGameInSeconds can be changed to alter the Game Settings

    gameCounterSeconds = lengthOfGameInSeconds     // initialise counter
      
    // Start Timer
    gameTimerInterval = setInterval(() => {

        // Decrement Counter 
        gameCounterSeconds--

        // Display the Number of Seconds left 
        if (gameCounterSeconds > 0){
            spanTime.textContent = gameCounterSeconds 
        } else {
            spanTime.textContent = 0 // if gameCounterSeconds has a minus value (due to a time penalty) display a zero
        }
        
        // Check for End Of Countdown
        if (gameCounterSeconds < 1 ) {
        
            // Timer reached zero - Stop Timer and End Quiz
            console.log("Game Timer reached " + gameCounterSeconds)
            stopGameTimer()      
            endQuiz()
        }

    }, 1000);   // timer runs in 1 second intervals (1000 miliseconds)

}

function stopGameTimer() {
    // Stop the Game Timer
    clearInterval(gameTimerInterval)   
}

function applyGameTimerPenalty() {

    // Apply a Time Penalty in seconds (when the user selects a wrong answer)
    // note : the value of the constant timePenaltyInSeconds can be changed to alter the Game Settings

    var counterBeforePenalty = gameCounterSeconds

    // Apply Penalty
    gameCounterSeconds = gameCounterSeconds - timePenaltyInSeconds  
    
    // Display the Number of Seconds left
    if (gameCounterSeconds > 0){
        spanTime.textContent = gameCounterSeconds 
    }
    else {
        spanTime.textContent = 0 // if gameCounterSeconds has a minus value (due to a time penalty) display a zero
    }
    console.log(timePenaltyInSeconds + " second Penalty applied (from " + counterBeforePenalty + " to " + gameCounterSeconds + " seconds)") // debugging
}

