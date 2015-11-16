// Create a countdown timer for work sessions and to remind you to get up and walk around


// Global Variables
var secondsRemaining;
var timerInterval;
var focusBackground;
var breakBackground;


function resetTimer() {
  // reset background images
  focusBackground.classList.remove("slideAway");
  breakBackground.classList.remove("slideUp");
  // reset minutes input with placeholder text
  document.getElementById("minutes").value = "";
}

function startBreak() {
  // play sound when time is up!
  var audio = document.getElementsByTagName("audio")[0];
  audio.play();
  // hide desk
  focusBackground = document.getElementById('focus-background');
  focusBackground.classList.add("slideAway");
  // show coffee cup
  breakBackground = document.getElementById('break-background');
  breakBackground.classList.add("slideUp");
  document.getElementById("minutes").value = "Enjoy your break!";

  setTimeout( resetTimer, 5000);

}

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
  if (secondsRemaining === 59) {
    clearInterval(timerInterval);
    startBreak();
  }
  // reduce 1 second with each interval
  secondsRemaining--;
}


function startCountdown() {
  // get value of input
  var minutes = document.getElementById("minutes").value;
  // calculate seconds remaining
  secondsRemaining = minutes * 60;


  // Check to make sure it's a positive number
  if (secondsRemaining < 0 || isNaN(minutes) || minutes === "") {
    document.getElementById("minutes").value = "";
    document.getElementById("time-display").innerHTML = "00:00";
    clearInterval(timerInterval);
    return;
  }

  // clear interval if already in progress
  clearInterval(timerInterval);
  // set interval for each second of countdown
  timerInterval = setInterval(tick, 1000);

  // set message for input while working
  if (minutes === "1") {
    document.getElementById("minutes").value = "Working for " + minutes + " minute";
  } else {
    document.getElementById("minutes").value = "Working for " + minutes + " minutes";
  }
}


// run code once window has loaded
window.onload = function () {

  var startButton = document.getElementById("start");
  // Cick event for start button
  startButton.addEventListener("click", startCountdown);
};



// Bugs
// Nan:Nan issue when clicking start timer button multiple times..
// add pause and reset buttons
// add sound
// fade value in input when starting timer
