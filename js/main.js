// Create a countdown timer for work sessions and to remind you to get up and walk around

var secondsRemaining;
var timerInterval;
var stateSetting;
var paused = false;


function resetPage() {
  // reset background images
  stateSetting.classList.remove("state-rotate");
  // reset minutes input with placeholder text
  document.getElementById("minutes").value = "";
}

function startBreak() {

  // play sound when time is up!
  var audio = document.getElementsByTagName("audio")[0];
  audio.play();
  // rotate state setting
  stateSetting = document.getElementById("background-setting");
  stateSetting.classList.add("state-rotate");

  document.getElementById("minutes").value = "Enjoy your break!";
  setTimeout(resetPage, 5000);
}

function tick() {
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
  if (secondsRemaining === 58) {
    clearInterval(timerInterval);
    startBreak();
  }
  // reduce 1 second with each interval
  secondsRemaining--;
}


function startTimer() {
  var minutes = document.getElementById("minutes").value;

  // convert minutes to seconds
  secondsRemaining = minutes * 60;

  // validate minutes input
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

}

function pauseTimer() {
  if (secondsRemaining > 0) {
    if (paused === false) {
      paused = true;
      this.value = "Resume";
      clearInterval(timerInterval);
    } else {
      paused = false;
      this.value = "Pause";
      timerInterval = setInterval(tick, 1000);
    }
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("minutes").value = "";
  document.getElementById("time-display").innerHTML = "00:00";
}


// run code once window has loaded
window.onload = function () {

  // Event Listeners for Timer Controls
  var startButton = document.getElementById("start");
  startButton.addEventListener("click", startTimer);

  //var userInput = document.getElementById('minutes');
  //userInput.addEventListener("keypress", startTimer);

  var stopButton = document.getElementById('stop');
  stopButton.addEventListener("click", pauseTimer);

  var resetButton = document.getElementById('reset');
  resetButton.addEventListener("click", resetTimer);

};



// Bugs
// Nan:Nan issue when clicking start timer button multiple times..
// add pause and reset buttons
// add sound
// fade value in input when starting timer
