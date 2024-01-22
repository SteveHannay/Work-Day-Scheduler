/* 
    Javascript for Challenge 07 
    Developer - Steve Hannay 
    First Created - 20th January 2024

    This code handles logic for the Work Day Scheduler

*/


// Define Variables and Event Listeners
// ------------------------------------

// create references to html elements 
var divCurrentDate = document.querySelector("#currentDay")  // reference by id
var tableContainer = $(".container")                        // reference by class

// module variables
var eventsArray = []                                        // array containing Event objects (Timeblock and Event Description) 
var currentHour_24format = 0

// constants 
const timesblocksArr =
[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]           // array of timeblocks (24 hour clock) - edit values to change Scheduler

const defaultButtonColour =  "#06aed5"


// Event Listeners

// - Save Event button "click" event
tableContainer.on('click', '.save-event-btn', function(event){

    // If a "Save Event" button has been clicked (a button with the class "save-event-button") Save the Event for the selected Timeblock
    var btnClicked = $(event.target)
    var selectedTimeblock = btnClicked.attr("data-timeblock")   // get the timeblock Hour from the buttons "data-timeblock" attribute
    saveEvent(selectedTimeblock)
 
})

// - TextArea (containing "Event Description") value "change" event (due to user typing text)
tableContainer.on('change', '.textarea', function(event){

    // If an "Event description" textarea has been edited, Highlight the "Save Event" Button for the selected Timeblock
    var textareaChanged = $(event.target)
    var selectedTimeblock = textareaChanged.attr("id")          // get the timeblock Hour from the buttons "data-timeblock" attribute
    highlightSaveButton(selectedTimeblock)
 
})



// MAIN Logic
// ----------

init()

function init(){

    // Initialise
    currentHour_24format = new Date().getHours()

    // Display the current Date
    $("#currentDay").text(dayjs().format("dddd D MMMM YYYY"))

    // Populates the Events Array with data fron Local Storage
    getEventsFromLocalStorage()

    // Draw a Table of Timeblocks
    drawTableOfTimeblocks()

    console.log("init() completed")
}





// Draw a Table of Timeblocks
function drawTableOfTimeblocks() {

    // Clear any existing Table HTML elements
    const existingTables = document.querySelectorAll('.table')
    for (const el of existingTables) {el.parentNode.removeChild(el)}

    // Create a new Table elemement - used to display the Work Day Scheduler
    var tableEl = $("<table>")                      
    .addClass("table table-hover table-bordered custom-table")
    .css("width","100%")
    .css("margin-top", "50px")
    .css("background-color", "Cornsilk")


    // Create Table HEADER
    // -------------------

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
    .text("Save")
    .attr("scope", "col")
    .css("width","10%")


    // Create a Row and Append Row to Table Header
    // - append Table Header Cells to Table Header Row
    tableHeaderRowEl.append(tableHeaderCellEl_Timeblock, tableHeaderCellEl_Event, tableHeaderCellEl_Save)
    // - append Table Header Row to Table Head
    tableHeadEl.append(tableHeaderRowEl)


    // Create Table BODY - Rows for each Timeblock (Hour)
    // --------------------------------------------------

    var tableBodyEl= $("<tbody>")                                   // Table Body element - body section of table

    // Repeat for Each Timeblock (ie. a timeslot that begins at a specified Hour)
    for (i = 0; i < timesblocksArr.length; i++) {

        // get selected Timeblock (Hour) from the Timeblocks Array 
        var selectedTimeblock = timesblocksArr[i]

        // create elements
        var tableBodyRowEl = $("<tr>")                              // Table Body Row element

        // (a) Timeblock Name                                       // Table Body Cell elements
        var tableBodyCellEl_Timeblock = $("<td>")       
        .addClass("p-2 time-block")
        .attr("scope", "row")
        .text(formatTimeblockHour(selectedTimeblock))               // formatTimeblock converts 24 hour clock values to 12 hour display values
    
        // (b) Event Description
        var textAreaEl = $("<textarea>")                            // use <textarea> for multi-line input
        .addClass("textarea")
        .css("background-color", selectBackgroundColour(selectedTimeblock))  // set background according to the Timeblock time
        .css("height","50px")
        .css("width","100%")
        .attr("id", selectedTimeblock)                              // store selectedTimeblock as an id for later reference 
        .text(getEventDescriptionFromTimeblock(selectedTimeblock))  // populate the Event description from Local Storage

        // (c) Save Event Button
        var tableBodyCellEl_Save = $("<td>")
        .addClass("p-2 text-center")
 
        var saveEventButtonEl = $("<button>")
        .addClass("p-2 text-center save-event-btn saveBtn fa fa-save")
        .css("width","100%")
        .attr("type", "button")
        .attr("data-timeblock", selectedTimeblock)                  // store selectedTimeblock with delete event button
 
        // - append Button to button Cell
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


// Save an Event for a TimeBlock Hour
function saveEvent(timeblock) {

    // Save Event to Local Storage
    // ---------------------------

    // - get the Event description related to the clicked "save" button (note : each Event description has the ID of the related timeblock)
    eventDescription = document.getElementById(timeblock).value

    // Update the Array of Events

    // - remove any existing Event for this timeslot from the Array of Events
    for (var i=0; i<eventsArray.length; i++){

        if (eventsArray[i].Saved_timeblock == timeblock) {
            // remove an element from the array by index
            console.log("Removing - Saved_timeblock : " + eventsArray[i].Saved_timeblock + ", Saved_eventDescription : " + eventsArray[i].Saved_eventDescription)
            eventsArray = eventsArray.slice(0, i).concat(eventsArray.slice(i+1))  
        }
    }

    // - add the selected Event to the Array of Events
    //   create an Event object and add the Event object to the Array of Events
    console.log("Adding - Saved_timeblock : " + timeblock + ", Saved_eventDescription : " + eventDescription)
    var eventToSaveObject = { Saved_timeblock: timeblock, Saved_eventDescription: eventDescription } 
    eventsArray.push(eventToSaveObject) // 
    console.log(eventsArray)

    // Save the Array of Events to Local Storage
    localStorage.setItem("eventsArray", JSON.stringify(eventsArray))

    // RE-Populates the Events Array with data from Local Storage
    getEventsFromLocalStorage()

    // Refresh the Data (using data returned from Local Storage) for the "Event Desription" (whose data has been saved)
    // note : only the data for a single textarea element is being refresh - not the whole table
    var textAreaEl = document.getElementById(timeblock)
    textAreaEl.value = getEventDescriptionFromTimeblock(timeblock)

    // Unhighlight the Save Button
    resetSaveButton(timeblock)

}



// Utility Functions
// -----------------


// Populate the Events Array with data fron Local Storage
function getEventsFromLocalStorage() {

    // Populates the eventsArray with the content of the "eventsArray" (string) variable in Local Storage 
    eventsArray = JSON.parse(localStorage.getItem('eventsArray')) || []
}


// Get the Event description (if any) for a timeblock Hour
function getEventDescriptionFromTimeblock(timeblock) {

    // Searches the Events Array (the array was populated from Local Storage)
    var eventDescription = ""

    for (var i=0; i < eventsArray.length; i++){
        if (eventsArray[i].Saved_timeblock == timeblock) {
            eventDescription = eventsArray[i].Saved_eventDescription
        }
    }
    return eventDescription 

}


// Format a Timeblock Hour
function formatTimeblockHour(timeblock) {

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


// Set Saved Button Background Colour 

function highlightSaveButton(timeblock) {

    // When an "Event description" textarea has been edited, Highlight the "Save Event" Button for the selected Timeblock

    var saveEventButtonEl = document.querySelector("[data-timeblock='" + timeblock + "']")
    saveEventButtonEl.style.background = "Red"
    console.log("Save button highlighted for timeblock : " + timeblock)

}

function resetSaveButton(timeblock) {

    // After a Save Button has been cllicked, Reset the Button for the selected Timeblock 

    var saveEventButtonEl = document.querySelector("[data-timeblock='" + timeblock + "']")
    saveEventButtonEl.style.background = defaultButtonColour
    console.log("Save button reset for timeblock : " + timeblock)

}