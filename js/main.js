// Create a countdown timer for work sessions and to remind you to get up and walk around


// Global Variables
var secondsRemaining;
var timerInterval;


function tick() {
  // grab the timer
  var timeDisplay = document.getElementById("time-display");

  // convert seconds into MM:SS
  var min = Math.floor(secondsRemaining / 60);
  var sec = secondsRemaining - (min * 60);

  if (min < 10) {
    min = "0" + min;
  }

  // Check to see if seconds is less than 10
  if (sec < 10) {
    sec = "0" + sec;
  }
  // Concatenate MM:SS time display
  var message = min + ":" + sec;
  // set timer to display message string
  timeDisplay.innerHTML = message;

  // stop timer interval function when it reaches 0
  if (secondsRemaining === 0) {
    clearInterval(timerInterval);
  }
  // reduce 1 second with each interval
  secondsRemaining--;
}


function startCountdown() {
  // get value of input
  var minutes = document.getElementById("minutes").value;
  // calculate seconds remaining
  secondsRemaining = minutes * 60;

  // clear interval if in progress
  clearInterval(timerInterval);
  // set interval for each second of countdown
  timerInterval = setInterval(tick, 1000);

  // hide input
  document.getElementById("minutes").value = "";
}


// run code once window has loaded
window.onload = function () {

  // Create Input Element
  var inputMinutes = document.createElement("input");
  inputMinutes.setAttribute("id", "minutes");
  inputMinutes.setAttribute("type", "text");

  // Create Button Element
  var startButton = document.createElement("input");
  startButton.setAttribute("value","Start Timer");
  startButton.setAttribute("type","button");

  // Append new DOM elements
  document.getElementById('timer-area').appendChild(inputMinutes);
  document.getElementById('timer-area').appendChild(startButton);

  // CLick event for start button
  startButton.addEventListener("click", startCountdown);
};





// To Do:

// Make sure it's not
// add page styles
// add background image
// add pause and reset buttons
// add sound
// fade value in input when starting timer
