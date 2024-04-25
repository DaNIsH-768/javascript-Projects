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

const movieDetails = async (imdbID) => {
  const response = await axios.get(URL, {
    params: {
      apikey: "77523091",
      i: imdbID,
    },
  });

  document.getElementById("summary").innerHTML = movieTemplate(response.data);
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

const movieTemplate = (movieData) => {
  return `
  <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieData.Poster}"/>
      </p>
    </figure>
      <div class="media-content" >
        <div class="content" >
          <h1>${movieData.Title}</h1>
          <h4>${movieData.Genre}</h4>
          <p>${movieData.Plot}</p>
        </div>
      </div>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieData.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieData.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieData.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieData.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieData.Ratings[1].Value}</p>
    <p class="subtitle">Rotten Tomatoes</p>
  </article>
  <article class="notification is-primary">
    <p class="title">${movieData.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
