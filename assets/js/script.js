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
var objEvents = {}               // object containing Events and their properties


// // constants 
// const lengthOfGameInSeconds = 60    // GAME SETTING - sets Game Length used by the Game Timer
// const timePenaltyInSeconds = 10     // GAME SETTING - sets the Time Penalty applied to the Game Timer following an incorrect answer


// // Event Listeners 
// btnStart.addEventListener("click", startQuiz)

// divChoices.addEventListener("click", function(event) {

//     var element = event.target;      
//     if (element.matches("button") === true) {   // If the clicked element is a button

//         // Get the userAnswerIndex from the "clicked" button 
//         userAnswerIndex = element.getAttribute("data-index");
            
//         // Check the "user answer" (userAnswerIndex) against the "correct answer" (correctAnswerIndex)
//         checkAnswer()
//     }
// })

// btnSubmitHighScore.addEventListener("click", addHighScore)



// MAIN Logic
// ----------

init()

function init(){

    // Display the current Date
    $("#currentDay").text(dayjs().format("dddd D MMMM YYYY"))

    // Draw a Table of Timeblocks
    drawTableOfTimeblocks()

    // Populate the Table with Events
    populateTableWithEvents()

    console.log("init() completed")
}

// Draw a Table of Timeblocks
function drawTableOfTimeblocks() {

    var tableContainer = $(".container")            // Container element - existing <div class="container"> element where table will be positioned
    
    var tableEl = $("<table>")                      // Table elemement - used to display the Work Day Scheduler
    .addClass("table table-hover")
    
    var tableHeadEl= $("<thead>")                   // Table Head element - header section of table
    var tableRowEl = $("<tr>")                      // Table Row element

 


    // Create Table Headers

    var tableHeaderCellEl_Timeblock = $("<th>")     // Table Header Cell elements
    .addClass("p-2")
    .text("Time")
    .attr("scope", "col")

    var tableHeaderCellEl_Event = $("<th>")
    .addClass("p-2")
    .text("Event")
    .attr("scope", "col")

    var tableHeaderCellEl_Save = $("<th>")
    .addClass("p-2")
    .text("Save")
    .attr("scope", "col")

    // - append Table Header Cells to Table Row
    tableRowEl.append(tableHeaderCellEl_Timeblock, tableHeaderCellEl_Event, tableHeaderCellEl_Save)

    // Create Table Rows


    // - append Table Row to Table Head
    tableHeadEl.append(tableRowEl)

    // - append Table Header to Table
    tableEl.append(tableHeadEl)

    // - append Table to Webpage (at element <div class="container">)
    tableContainer.append(tableEl)


}


// Populate the Table with Events
function populateTableWithEvents() {

    // Read Events from Local Storage

    // Clear Existing Events from Table

    // Populate the Table with Events

}


// Save an Event
function saveAndEvent() {

    // Save Event to Local Storage

    // Repopulate the Table with Events

}


// Delete an Event
function deleteAnEvent() {

    // Delete Event from Local Storage

    // Repopulate the Table with Events

}


// Utility Functions
// -----------------


