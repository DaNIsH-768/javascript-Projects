// Select the duration input, start button, pause button, and circle elements from the DOM.
const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");

// Calculate the perimeter of the circle.
const perimeter = circle.getAttribute("r") * 2 * Math.PI;

// Set the stroke-dasharray attribute of the circle to the perimeter.
circle.setAttribute("stroke-dasharray", perimeter);

// Declare a variable to hold the total duration.
let duration;

// Create a new Timer instance.
const timer = new Timer(durationInput, startButton, pauseButton, {
  // The onStart callback sets the total duration.
  onStart(totalDuration) {
    duration = totalDuration;
  },
  // The onTick callback updates the stroke-dashoffset attribute of the circle.
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  // The onComplete callback logs a message to the console.
  onComplete() {
    console.log("Timer is completed");
  },
});
