/**
 * Creates and returns a debounced function that delays invoking `func` until after `delay` milliseconds have elapsed
 * since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} [delay=1000] - The number of milliseconds to delay the invocation of `func`.
 * @returns {Function} - Returns the new debounced function.
 */
const debounce = (func, delay = 1000) => {
  // Declare a variable to hold the timeout ID.
  let timeoutId;

  // Return a function that accepts any number of arguments.
  return (...args) => {
    // If timeoutId is truthy, clear the timeout.
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set timeoutId to the ID of a new timeout that will invoke `func` after `delay` milliseconds.
    // `func` is invoked with the arguments of the returned function.
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};
