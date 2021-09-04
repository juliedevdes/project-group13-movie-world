import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef } from './refs';
import debounce from 'lodash/debounce';

inputRef.addEventListener('input', debounce(searchMovie, 750));

function searchMovie(e) {
  e.preventDefault();
  const page = 1;
  const inputText = e.target.value;

  if (inputText.length <= 1) {
    return;
  }
  movieSearcher(inputText, page);
}

async function movieSearcher(searchText, pageNumber) {
  try {
    const data = await api.MovieSearch(searchText, pageNumber);

    const result = data.results;

    if (result.length === 0) {
      return;
    }
    clearInput();
    createCard(result);
  } catch (error) {}
}

function createCard(result) {
  const markup = cardTpl(result);

  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearInput() {
  gallery.innerHTML = '';
}
