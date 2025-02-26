// Base URL for the OMDB API
const URL = "https://www.omdbapi.com/";

// Configuration for the autocomplete function
const AUTOCOMPLETECONFIG = {
  // Function to render movie options in the dropdown
  renderOption(movie) {
    return `
      <img src="${movie.Poster}" />
      <p>${movie.Title} (${movie.Year})</p>
    `;
  },

  // Function to set the input value when a movie is selected
  inputValue(movie) {
    return movie.Title;
  },

  // Async function to fetch movie data based on the movie name
  async fetchData(movieName) {
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
  },
};

// Autocomplete for the left dropdown
autocomplete({
  root: document.querySelector("#left-autocomplete"),
  ...AUTOCOMPLETECONFIG,
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    movieDetails(movie.imdbID, document.getElementById("left-summary"), "left");
  },
});

// Autocomplete for the right dropdown
autocomplete({
  root: document.querySelector("#right-autocomplete"),
  ...AUTOCOMPLETECONFIG,
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    movieDetails(
      movie.imdbID,
      document.getElementById("right-summary"),
      "right"
    );
  },
});

// Variables to hold the selected movies
let leftMovie;
let rightMovie;

// Async function to fetch and display movie details
const movieDetails = async (imdbID, summaryElem, side) => {
  const response = await axios.get(URL, {
    params: {
      apikey: "77523091",
      i: imdbID,
    },
  });

  summaryElem.innerHTML = movieTemplate(response.data);

  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    compareMovies();
  }
};

// Function to compare the selected movies
const compareMovies = () => {
  const leftStats = document.querySelectorAll("#left-summary .notification");
  const rightStats = document.querySelectorAll("#right-summary .notification");

  leftStats.forEach((leftStat, index) => {
    const rightStat = rightStats[index];

    const leftSideValue = parseFloat(leftStat.dataset.value);
    const rightSideValue = parseFloat(rightStat.dataset.value);

    if (leftSideValue < rightSideValue) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else if (rightSideValue < leftSideValue) {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
};

// Function to generate the HTML for the movie details
const movieTemplate = (movieData) => {
  const money = parseInt(
    movieData.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metascore = parseInt(movieData.Metascore);
  const imdbRating = parseFloat(movieData.imdbRating);
  const imdbVotes = parseInt(movieData.imdbVotes.replace(/,/g, ""));

  const awards = movieData.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) return prev;
    else return prev + value;
  }, 0);

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
  <article data-value=${awards} class="notification is-primary">
    <p class="title">${movieData.Awards}</p>
    <p class="subtitle">Awards</p>
  </article>
  <article data-value=${money} class="notification is-primary">
    <p class="title">${movieData.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
  </article>
  <article data-value=${metascore} class="notification is-primary">
    <p class="title">${movieData.Metascore}</p>
    <p class="subtitle">Metascore</p>
  </article>
  <article data-value=${imdbRating} class="notification is-primary">
    <p class="title">${movieData.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
  </article>
  <article data-value=${imdbVotes} class="notification is-primary">
    <p class="title">${movieData.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
