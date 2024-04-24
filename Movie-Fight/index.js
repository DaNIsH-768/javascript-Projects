import debounce from "../Utils/debounce.js";

const URL = "http://www.omdbapi.com/";

const fetchData = async (movieName) => {
  const response = await axios.get(URL, {
    params: {
      apikey: "77523091",
      s: movieName,
    },
  });

  console.log(response.data);
};

const onInput = (e) => {
  fetchData(e.target.value);
};

const inputBox = document.querySelector("input");
inputBox.addEventListener("input", debounce(onInput, 500));
