let timers = [];

function addTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  
  if (totalSeconds > 0) {
    createTimer(totalSeconds);
  } else {
    alert("Please enter valid time values.");
  }
}

function createTimer(totalSeconds) {
  const timerId = Date.now();
  timers.push({
    id: timerId,
    totalSeconds: totalSeconds,
    remainingSeconds: totalSeconds,
    running: true
  });

  const timerElement = document.createElement("div");
  timerElement.id = timerId;
  timerElement.classList.add("timer");
  document.getElementById("timers").appendChild(timerElement);

  updateTimerDisplay(timerId);

  const intervalId = setInterval(() => {
    const index = timers.findIndex(timer => timer.id === timerId);
    if (index !== -1) {
      if (timers[index].running) {
        timers[index].remainingSeconds--;
        updateTimerDisplay(timerId);
        if (timers[index].remainingSeconds <= 0) {
          clearInterval(intervalId);
          timerElement.textContent = "Time's up!";
        }
      }
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function updateTimerDisplay(timerId) {
  const index = timers.findIndex(timer => timer.id === timerId);
  if (index !== -1) {
    const timer = timers[index];
    const hours = Math.floor(timer.remainingSeconds / 3600);
    const minutes = Math.floor((timer.remainingSeconds % 3600) / 60);
    const seconds = timer.remainingSeconds % 60;
    const timerElement = document.getElementById(timerId);
    timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

document.getElementById("addTimerBtn").addEventListener("click", addTimer);
