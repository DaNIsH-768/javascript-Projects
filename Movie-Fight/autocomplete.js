const autocomplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
    <div class="dropdown-menu" >
        <div class="dropdown-content results"></div>
    </div>
    </div>
    `;

  const inputBox = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultBox = root.querySelector(".results");
  const onInput = async (e) => {
    const items = await fetchData(e.target.value);

    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultBox.innerHTML = ``;

    dropdown.classList.add("is-active");

    for (let item of items) {
      const itemTag = document.createElement("a");
      itemTag.classList.add("dropdown-item");

      itemTag.innerHTML = renderOption(item);

      itemTag.addEventListener("click", async () => {
        dropdown.classList.remove("is-active");
        inputBox.value = inputValue(item);

        onOptionSelect(item);
      });

      resultBox.appendChild(itemTag);
    }
  };

  inputBox.addEventListener("input", debounce(onInput, 500));
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
