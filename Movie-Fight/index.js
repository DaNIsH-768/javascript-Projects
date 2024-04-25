import debounce from "../Utils/debounce.js";

const URL = "http://www.omdbapi.com/";

const fetchData = async (movieName) => {
  const response = await axios.get(URL, {
    params: {
      apikey: "77523091",
      s: movieName,
    },
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
<label><b>Search for a Movie</b></label>
<input class="input" />
<div class="dropdown">
  <div class="dropdown-menu" >
    <div class="dropdown-content results"></div>
  </div>
</div>
`;

const inputBox = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultBox = document.querySelector(".results");

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
    resultBox.appendChild(movieTag);
  }
};

inputBox.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", (e) => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});
