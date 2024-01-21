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
var objEvents = {}               // object containing Events for the Timeblocks 
var currentHour_24format = 0

// constants 
const timesblocksArr =
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]  // array of timeblocks (24 hour clock) - edit to change Scheduler


// // Event Listeners 
$(".container").on('click', '.save-event-btn', function(event){

    // If a save event button has been clicked (a button with the class "save-event-button") Save Events for the related Timeblock
    var btnClicked = $(event.target)
    var selectedTimeblock = btnClicked.attr("data-timeblock")
    saveEvent(selectedTimeblock)
 
});




// MAIN Logic
// ----------

init()

function init(){

    // Initialise
    currentHour_24format = new Date().getHours()

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
    .addClass("table table-hover table-bordered custom-table")
    .css("background-color", "Cornsilk")
    .css("width","100%")
    .css("margin-top", "50px")
  
    // Create Table Headers
    // --------------------

    // create elements
    var tableHeadEl= $("<thead>")                   // Table Head element - header section of table
    var tableHeaderRowEl = $("<tr>")                // Table Head Row element

    var tableHeaderCellEl_Timeblock = $("<th>")     // Table Header Cell elements
    .addClass("p-2 text-center")
    .text("Time")
    .attr("scope", "col")
    .css("width","10%")

    var tableHeaderCellEl_Event = $("<th>")
    .addClass("p-2")
    .text("Event")
    .attr("scope", "col")
    .css("width","75%")

    var tableHeaderCellEl_Save = $("<th>")
    .addClass("p-2 text-center")
    .text("Save")
    .attr("scope", "col")
    .css("width","10%")

    // - append Table Header Cells to Table Header Row
    tableHeaderRowEl.append(tableHeaderCellEl_Timeblock, tableHeaderCellEl_Event, tableHeaderCellEl_Save)

    // - append Table Header Row to Table Head
    tableHeadEl.append(tableHeaderRowEl)



    // Create Table Rows for each Timeblock
    // -----------------

    var tableBodyEl= $("<tbody>")                       // Table Body element - body section of table

    // Repeat for Each Timeblock (ie. a timeslot that begins at a specified time)
    for (i = 0; i < timesblocksArr.length; i++) {

        // get selected Timeblock from array
        var selectedTimeblock = timesblocksArr[i]

        // create elements
        var tableBodyRowEl = $("<tr>")                  // Table Body Row element
         

        // (a) timeblock name                           // Table Body Cell elements
        var tableBodyCellEl_Timeblock = $("<td>")       
        .addClass("p-2 text-center")
        .attr("scope", "row")
        .text(formatTimeblock(selectedTimeblock))       // formatTimeblock converts 24 hour clock values to 12 hour display values
    
        // (b) event
        var tableBodyCellEl_Event = $("<td>")
        .addClass("p-2")

        var textAreaEl = $("<textarea>")                   // use <textarea> for multi-line input
        .css("background-color", selectBackgroundColour(selectedTimeblock))  // set background according to the Timeblock time
        .css("height","50px")
        .css("width","100%")
        .text("Event " + i )

        var inputDivEl = $("<div>")                     // append textarea to div AND div to Cell 

        inputDivEl.append(textAreaEl)
        tableBodyCellEl_Event.append(inputDivEl)



        // (c) save event utton
        var tableBodyCellEl_Save = $("<td>")
        .addClass("p-2 text-center save-event-btn")
        .text("X")
        .attr("data-timeblock", selectedTimeblock)      // store selectedTimeblock with delete event button

 

        // - append Table Body Cells to Table Body Row
        tableBodyRowEl.append(tableBodyCellEl_Timeblock, tableBodyCellEl_Event, tableBodyCellEl_Save)

        // - append Table Row to Table Body
        tableBodyEl.append(tableBodyRowEl)



    }


    // - append Table Header AND Body to Table
    tableEl.append(tableHeadEl, tableBodyEl)

    // - append Table to Webpage (at element <div class="container">)
    tableContainer.append(tableEl)


}


// Populate the Table with Events
function populateTableWithEvents() {

    // Read Events from Local Storage

    // Clear Existing Events from Table

    // Populate the Table with Events

}


// Save an Event for a TimeBlock
function saveEvent(timeblock) {

    // Save Event to Local Storage

    // Repopulate the Table with Events

    alert("Save EVENT Button click : " + timeblock)

}





// Utility Functions
// -----------------

// Format Timeblock 
function formatTimeblock(timeblock) {

    // Notes : 
    // this function formats a timeblock into a 12 hour display value (eg. "9 PM", "5 PM", etc.)
    // a timeblock is a 24 hour clock value in hours (eg. 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, etc.)

    if (timeblock < 1) {
        // midnight
        return "midnight"
    }
    else if (timeblock < 11) {
        // before midday
        return timeblock + " AM"
    } 
    else if(timeblock < 13) {
        return timeblock + " PM"
    }
    else {
        // 1pm and after
        return (timeblock - 12) + " PM"
    }

}


// Selects a Background Colour according to a timeblocks time of day
function selectBackgroundColour(timeblock) {

    // Notes :
    // this function selects a background colour for an element according to its timeblock time in relation to the Current Hour
    // a timeblock is a 24 hour clock value in hours (eg. 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, etc.)

    if (timeblock < currentHour_24format) {
        // past timeblock
        return "LightGrey"
    }
    else if (timeblock === currentHour_24format) {
        // current timeblock
        return "LightPink"
    }
    else {
        // future timeblock
        return "LightGreen"
    }

} 
