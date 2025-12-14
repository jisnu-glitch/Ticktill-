# Ticktill

A simple, date-based countdown timer built using **plain JavaScript**. The goal of this project was to understand how real-world countdowns work by calculating time differences using actual dates instead of manually decrementing seconds.

The app allows a user to select a target date and time and then shows how much time is left in **days, hours, minutes, and seconds**. It also supports pausing, resetting, and restoring the countdown after a page refresh.

---

## Features

* Select a **target date and time** using a single input
* Live countdown display (days / hours / minutes / seconds)
* Pause and resume the countdown
* Input is locked once the countdown starts to avoid accidental changes
* Countdown state is preserved across page refresh using `localStorage`
* Prevents invalid inputs such as empty or past dates

---

## Tech Used

* HTML
* CSS
* JavaScript (ES6)

No frameworks or external libraries were used. The focus of this project is on core JavaScript logic and browser APIs.

---

## Project Structure

```
├── index.html   # Markup and layout
├── style.css    # Styling
├── app.js       # Countdown logic
└── README.md
```

---

## How It Works

1. The user selects a target date and time
2. The selected value is converted into a timestamp
3. Every second, the remaining time is calculated using:

```
remainingTime = targetTime - currentTime
```

4. The remaining seconds are converted into days, hours, minutes, and seconds
5. The UI is updated based on the calculated values

Because the countdown is based on the current system time, it remains accurate even if the tab is inactive or the page is refreshed.

---

## Handling Refresh and Pause

* The target timestamp is stored in `localStorage`
* On page reload, the app checks if a countdown was already running
* If the countdown was paused, the paused state is restored
* Reset clears all stored values and unlocks the input

---

## Edge Cases Considered

* Starting without selecting a date
* Selecting a date in the past
* Clicking start multiple times
* Pausing and resuming the countdown
* Refreshing the page while the countdown is active

---

## Possible Improvements

* Browser notifications when the countdown finishes
* Allow naming the countdown event
* Improve mobile responsiveness
* Convert the logic into a reusable JavaScript class

---

## Author

jisnu-glitch

---

## License

MIT License

