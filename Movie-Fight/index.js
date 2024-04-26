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

autocomplete({
  root: document.querySelector(".autocomplete"),
});
autocomplete({
  root: document.querySelector(".autocomplete-two"),
});

const movieDetails = async (imdbID) => {
  const response = await axios.get(URL, {
    params: {
      apikey: "77523091",
      i: imdbID,
    },
  });

  document.getElementById("summary").innerHTML = movieTemplate(response.data);
};

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
    <p class="title">${movieData.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
  </article>
  `;
};
