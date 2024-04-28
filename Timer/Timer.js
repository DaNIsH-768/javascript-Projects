/**
 * Timer class that encapsulates the functionality of a timer.
 */
class Timer {
  /**
   * Constructor for the Timer class.
   * @param {HTMLInputElement} durationInput - The input element that displays the remaining time.
   * @param {HTMLButtonElement} startButton - The button that starts the timer.
   * @param {HTMLButtonElement} pauseButton - The button that pauses the timer.
   * @param {Object} callbacks - An object containing optional callback functions.
   */
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    // If callbacks object is provided, assign each function to a property of the same name.
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    // Add event listeners to the start and pause buttons.
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  /**
   * Starts the timer.
   */
  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 20);
  };

  /**
   * Pauses the timer.
   */
  pause = () => {
    clearInterval(this.interval);
  };

  /**
   * Decreases the remaining time and calls the appropriate callbacks.
   */
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  /**
   * Getter for the remaining time.
   * @returns {number} The remaining time.
   */
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  /**
   * Setter for the remaining time.
   * @param {number} time - The time to set.
   */
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
