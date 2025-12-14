
// ===== STATE =====
let timerId = null;
let targetTime = null;

// ===== DOM ELEMENTS =====
const dateInput = document.getElementById("targetDate");

const daysEl = document.getElementById("daysvalue");
const hoursEl = document.getElementById("hoursvalue");
const minutesEl = document.getElementById("minutesvalue");
const secondsEl = document.getElementById("secondsvalue");

const startBtn = document.querySelector(".n1");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");

// ===== START =====
startBtn.addEventListener("click", () => {

  // prevent multiple intervals
  if (timerId !== null) return;

  if (!dateInput.value) {
    alert("Please select a date and time");
    return;
  }

  targetTime = new Date(dateInput.value).getTime();

  if (targetTime <= Date.now()) {
    alert("Please choose a future date");
    return;
  }

  localStorage.setItem("targetTime", targetTime);
  localStorage.setItem("targetDateValue", dateInput.value);
  localStorage.setItem("isPaused", false);
  

  dateInput.disabled = true; // lock input
  startBtn.disabled =true;

  timerId = setInterval(updateCountdown, 1000);
  updateCountdown(); // run immediately
});

// ===== CORE LOGIC =====
function updateCountdown() {
  const now = Date.now();
  let diff = Math.floor((targetTime - now) / 1000);

  if (diff <= 0) {
    clearInterval(timerId);
    timerId = null;
    diff = 0;
  }

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

// ===== PAUSE =====
pauseBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  localStorage.setItem("isPaused", true);


});

// ===== RESET =====
resetBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  targetTime = null;

  localStorage.removeItem("targetTime");
  localStorage.removeItem("isPaused");

  dateInput.disabled = false;
  startBtn.disabled =false;
  
  dateInput.value = "";

  daysEl.textContent = 0;
  hoursEl.textContent = 0;
  minutesEl.textContent = 0;
  secondsEl.textContent = 0;
});


window.addEventListener("load", () => {
  const savedTarget = localStorage.getItem("targetTime");
  const savedDateValue = localStorage.getItem("targetDateValue");
  const savedPaused = localStorage.getItem("isPaused");

  if (!savedTarget || !savedDateValue) return;

  targetTime = Number(savedTarget);

  // If countdown already finished
  if (targetTime <= Date.now()) {
    localStorage.removeItem("targetTime");
    localStorage.removeItem("targetDateValue");
    localStorage.removeItem("isPaused");
    return;
  }

  //  Restore input value
  dateInput.value = savedDateValue;
  dateInput.disabled = true;
  

  if (savedPaused === "true") {
    isPaused = true;
    updateCountdown(); // show frozen UI
  } else {
    isPaused = false;
    timerId = setInterval(updateCountdown, 1000);
    updateCountdown();
  }
});
