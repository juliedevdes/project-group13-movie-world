import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef,successRef, noSuccessRef } from './refs';
import debounce from 'lodash/debounce';
import Spinner from './spinner';
import { cardsMarkUp } from './startpage';


inputRef.addEventListener('input', debounce(searchMovie, 750));

const spinner = new Spinner();

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

    const results = data.results;
   

    if (results.length === 0) {
      noResults();
      
     return;
    }
    clearInput();
    cardsMarkUp(results);

    if (results !== []) {
      spinner.showSpinner();
      successRef.textContent = `Сongratulations!!! We found ${data.total_results} results of request "${searchText}" `;
      setTimeout(function () {
        spinner.hideSpinner();
    successRef.textContent = '';
  }, 1500);
    }

  } catch (error) {}
}

// function createCard(result) {
//   const markup = cardTpl(result);

//   gallery.insertAdjacentHTML('beforeend', markup);
// }

function clearInput() {
  gallery.innerHTML = '';
}


function noResults() {
  spinner.showSpinner();
  noSuccessRef.textContent =
    'Search result not successful. Enter the correct movie name and try again';
  setTimeout(function () {
    noSuccessRef.textContent = '';
    spinner.hideSpinner();
  }, 1500);
  clearInput();
}
