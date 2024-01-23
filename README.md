# Challenge 7 - Work-Day-Scheduler

Challenge project for 07-third-party-apis-module
 
Task - Create javascript code for a "Work Day Scheduler" where the user can save Events for different Timeblocks (hours) 

Developer - Steve Hannay

Completed - 23rd Jan 2024


## Description

The aim of this project is to create a Work Day Scheduler for the user to type and save Events for different Timeblocks.

Note : A Timeblock represents an Hour of the day (9, 10, 11, 12, 13, 14, etc.)

The following acceptance criteria was set for the project :

--------------------------------------------------------------------------------------------------------------------------

    The app should:

    * Display the current day at the top of the calender when a user opens the planner.
 
    * Present timeblocks for standard business hours when the user scrolls down.
 
    * Color-code each timeblock based on past, present, and future when the timeblock is viewed.
 
    * Allow a user to enter an event when they click a timeblock

    * Save the event in local storage when the save button is clicked in that timeblock.

    * Persist events between refreshes of a page
  
--------------------------------------------------------------------------------------------------------------------------

During the process of working on this project I have learned more about the javascript coding, including the use of arrays of objects, local storage, html tables, element creation and event handling. 

Furthermore, I have become a little more familiar with working with GitHub and ReadMe files.


## Installation

Open the following webpage from any internet browser.

[Challenge 7 - link to Work Day Scheduler webpage](https://stevehannay.github.io/Work-Day-Scheduler)

No installation is necessary. 


## Usage

When the webpage loads the Current Date will be displayed in the header section and a Table of Timeblocks will appear below.

- Each Timeblock represents an Hour of the Day.

- Each Timeblock has a section for entering an Event description and a Save button for saving changes.

- Timeblocks are Colour Coded according to whether they are "Past", "Present" or "Future".

- Save buttons for any unsaved changes will be Highlighted (with a Red background).

- Clicking on a Save button saves changes to an Event to Local Storage (and resets the Save button).

- The webpage retains its Saved Values (held in Local Storage) during a page refresh.


Follow these instructions.

- Edit Event descriptions : Type within the Event description section of any Timeblock to add/edit/delete an event.

- Save Events : Once changes to Event descriptions have been made, use the Save buttons to save changes.


Here are screenshots of the Work Day Scheduler created for the project.

- This is the Work Day Scheduler with no Unsaved Events.
![Challenge 7 - screenshot of the Work Day Scheduler with no Unsaved Events](assets/images/no%20changes.png)

- This is the Work Day Scheduler with 1 Unsaved Event.
![Challenge 7 - screenshot of the Work Day Scheduler with 1 Unsaved Event](assets/images/change%201.png)

- This is the Work Day Scheduler with 2 Unsaved Events.
![Challenge 7 - screenshot of the Work Day Scheduler with 2 Unsaved Events](assets/images/change%202.png)

- This is the Work Day Scheduler with 1 Saved Event and data refresh.
![Challenge 7 - screenshot of the Work Day Scheduler with 1 Saved Event](assets/images/save%201.png)

- This is the Work Day Scheduler with 2 Saved Events and data refresh.
![Challenge 7 - screenshot of the Work Day Scheduler with 2 Saved Events](assets/images/save%202%20and%20webpage%20refresh.png)


## Credits

This is a single developer project, based upon what I have been taught by the Bootcamp team.

During the project I studied and used extracts of various code supplied by the Bootcamp when teaching the previous modules and I referenced various online resources including those listed below.

The following information was referenced while coding the project.

[w3 school - Javascript event listeners](https://www.w3schools.com/js/js_htmldom_eventlistener.asp)

[w3 school - JQuery](https://www.w3schools.com/jquery/default.asp)




## License

No licence is currently associated with this project.

