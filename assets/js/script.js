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
    .css("width","100%")
    .css("margin-top", "50px")
    .css("background-color", "Cornsilk")


    // Create Table Headers
    // --------------------

    // create elements
    var tableHeadEl= $("<thead>")                   // Table Head element - header section of table
    var tableHeaderRowEl = $("<tr>")                // Table Head Row element

    var tableHeaderCellEl_Timeblock = $("<th>")     // Table Header Cell elements
    .addClass("p-2 time-block")
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
    .text("Changes")
    .attr("scope", "col")
    .css("width","10%")


    // Create a Row and Append Row to Table Header

    // - append Table Header Cells to Table Header Row
    tableHeaderRowEl.append(tableHeaderCellEl_Timeblock, tableHeaderCellEl_Event, tableHeaderCellEl_Save)

    // - append Table Header Row to Table Head
    tableHeadEl.append(tableHeaderRowEl)



    // Create Table Rows for each Timeblock (Hour)
    // -------------------------------------------

    var tableBodyEl= $("<tbody>")                       // Table Body element - body section of table

    // Repeat for Each Timeblock (ie. a timeslot that begins at a specified time)
    for (i = 0; i < timesblocksArr.length; i++) {

        // get selected Timeblock from array
        var selectedTimeblock = timesblocksArr[i]

        // create elements
        var tableBodyRowEl = $("<tr>")                  // Table Body Row element

        // (a) timeblock name                           // Table Body Cell elements
        var tableBodyCellEl_Timeblock = $("<td>")       
        .addClass("p-2 time-block")
        .attr("scope", "row")
        .text(formatTimeblock(selectedTimeblock))       // formatTimeblock converts 24 hour clock values to 12 hour display values
    
        // (b) event description
        var textAreaEl = $("<textarea>")                   // use <textarea> for multi-line input
        .css("background-color", selectBackgroundColour(selectedTimeblock))  // set background according to the Timeblock time
        .css("height","50px")
        .css("width","100%")
        .text("Event " + i )
        .attr("id", selectedTimeblock)                  // set the event descriptions id for later reference when saving changes

        // (c) save event utton
        var tableBodyCellEl_Save = $("<td>")
        .addClass("p-2 text-center")
 
        var saveEventButtonEl = $("<button>")
        .addClass("p-2 text-center save-event-btn saveBtn")
        .attr("type", "button")
        .attr("data-timeblock", selectedTimeblock)      // store selectedTimeblock with delete event button
        .text("Save")
 
        tableBodyCellEl_Save.append(saveEventButtonEl)


        // Create a Row and Append Row to Table Body

        // - append Table Body Cells to Table Body Row
        tableBodyRowEl.append(tableBodyCellEl_Timeblock, textAreaEl, tableBodyCellEl_Save)

        // - append Table Row to Table Body
        tableBodyEl.append(tableBodyRowEl)

    }

    // Final Appends

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
    // ---------------------------

    // - get the Event description related to the clicked "save" button (note : each Event description has the ID of the related timeblock)
    eventDescriptions = document.getElementById(timeblock).value

    // Update the Array of Events

    // - remove any existing Event description for this timeslot from the Array of Events

    // - add the selected Event to the Array of Events

    // - save the Array of Events to Local Storage

    

    // Repopulate the html Table with Events (refresh screen)



    alert("Save EVENT Button click : timeblock = " + timeblock + ", eventDesciption = " + eventDescriptions)

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
    
    // this functions sets customised colours, but the CSS file could have been employed to set colours instead 

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