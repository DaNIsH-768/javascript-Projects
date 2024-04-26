const autocomplete = ({ root }) => {
  root.innerHTML = `
    <label><b>Search for a Movie</b></label>
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
    const movies = await fetchData(e.target.value);

    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultBox.innerHTML = ``;

    dropdown.classList.add("is-active");

    for (let movie of movies) {
      const movieTag = document.createElement("a");
      movieTag.classList.add("dropdown-item");

      movieTag.innerHTML = `
        <img src="${movie.Poster}" />
        <p>${movie.Title}</p>
        `;

      movieTag.addEventListener("click", async () => {
        dropdown.classList.remove("is-active");
        inputBox.value = movie.Title;

        const movieData = await movieDetails(movie.imdbID);
        console.log(movieData);
      });

      resultBox.appendChild(movieTag);
    }
  };

  inputBox.addEventListener("input", debounce(onInput, 500));
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
