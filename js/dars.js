const OMDB_API_KEY = '4f15fd7c';
const OMDB_SEARCH_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

const elSearchForm = document.querySelector('.js-search-form');
const elSearchInput = elSearchForm.querySelector('.js-search-input');
const elIdInput = elSearchForm.querySelector('.js-id-input');

const elMoviesList = document.querySelector('.movies-list');
const elMoviesItemTemplate = document.querySelector('#movies-item-template').content;

function showMovies (Search) {
  elMoviesList.innerHTML = '';

  const elMoviesListFragment = document.createDocumentFragment();
  for (movie of Search) {
    const elMoviesItem = elMoviesItemTemplate.cloneNode(true);

    elMoviesItem.querySelector('.movies-img').src = movie.Poster;
    elMoviesItem.querySelector('.movies-title').textContent = movie.Title;
    elMoviesItem.querySelector('p').textContent = movie.Type;
    elMoviesItem.querySelector('.movies-year').textContent = movie.Year;

    elMoviesListFragment.appendChild(elMoviesItem);
  };

  elMoviesList.appendChild(elMoviesListFragment);
}

function showMoviess (Search) {
  elMoviesList.innerHTML = '';

  const elMoviesListFragment = document.createDocumentFragment();
    const elMoviesItem = elMoviesItemTemplate.cloneNode(true);

    elMoviesItem.querySelector('.movies-img').src = Search.Poster;
    elMoviesItem.querySelector('.movies-title').textContent = Search.Title;
    elMoviesItem.querySelector('p').textContent = Search.Type;
    elMoviesItem.querySelector('.movies-year').textContent = Search.Year;

    elMoviesListFragment.appendChild(elMoviesItem);


  elMoviesList.appendChild(elMoviesListFragment);
}

function getNewsJSON (url, callbackFn) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.Response === 'True') {
      callbackFn(data.Search);
    }
  });
}

function getMoviesIDJSON (url, callbackFn) {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.Response === 'True') {
      callbackFn(data);
    }
  });
}

function onSearchFormSubmit (evt) {
  evt.preventDefault();

  if (elSearchInput.value !== '') {
    const urlForSearch = `${OMDB_SEARCH_URL}&s=${elSearchInput.value.trim()}`;
    elSearchInput.value = '';
    getNewsJSON(urlForSearch, showMovies);
  }

  if (elIdInput.value !== '') {
    const urlForId = `${OMDB_SEARCH_URL}&i=${elIdInput.value}`;
    elIdInput.value = '';
    getMoviesIDJSON(urlForId, showMoviess);
  }
}

if (elSearchForm) {
  elSearchForm.addEventListener('submit', onSearchFormSubmit);
}
