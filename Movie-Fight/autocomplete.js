/**
 * The autocomplete function is a higher order function that takes an object as an argument.
 * This object contains the following properties:
 * - root: The root element where the autocomplete widget will be attached.
 * - renderOption: A function that determines how each dropdown option will be rendered.
 * - onOptionSelect: A function that will be called when a dropdown option is selected.
 * - inputValue: A function that will extract the input value from the selected dropdown option.
 * - fetchData: A function that will fetch the data for the autocomplete dropdown based on the input.
 *
 * @param {Object} options - The options for the autocomplete function.
 */
const autocomplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  // Set the root's innerHTML to a template string containing the HTML structure for the autocomplete widget.
  // This includes a label, an input field, and a dropdown menu which will contain the results.
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  // Get references to the input box, dropdown, and result box elements.
  const inputBox = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultBox = root.querySelector(".results");

  // Define an async function that will be called when the input box receives input.
  const onInput = async (e) => {
    // Fetch the data based on the input value.
    const items = await fetchData(e.target.value);

    // If there are no items, remove the "is-active" class from the dropdown and return.
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    // Clear the result box.
    resultBox.innerHTML = ``;

    // Add the "is-active" class to the dropdown.
    dropdown.classList.add("is-active");

    // For each item, create a new dropdown option.
    for (let item of items) {
      // Create a new "a" element and add the "dropdown-item" class to it.
      const itemTag = document.createElement("a");
      itemTag.classList.add("dropdown-item");

      // Set the innerHTML of the item tag to the result of the renderOption function.
      itemTag.innerHTML = renderOption(item);

      // Add an event listener to the item tag that will be called when it is clicked.
      itemTag.addEventListener("click", async () => {
        // Remove the "is-active" class from the dropdown.
        dropdown.classList.remove("is-active");

        // Set the value of the input box to the result of the inputValue function.
        inputBox.value = inputValue(item);

        // Call the onOptionSelect function with the item as an argument.
        onOptionSelect(item);
      });

      // Append the item tag to the result box.
      resultBox.appendChild(itemTag);
    }
  };

  // Add an event listener to the input box that will be called when it receives input.
  // The onInput function will be debounced with a delay of 500 milliseconds.
  inputBox.addEventListener("input", debounce(onInput, 500));

  // Add an event listener to the document that will be called when it is clicked.
  document.addEventListener("click", (e) => {
    // If the click event's target is not contained within the root, remove the "is-active" class from the dropdown.
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};