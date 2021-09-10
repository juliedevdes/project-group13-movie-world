import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef, successRef, noSuccessRef, homeBtn, logoLink } from './refs';
import debounce from 'lodash/debounce';
import Spinner from './spinner';
import { cardsMarkUp } from './genres';
import Pagination from 'tui-pagination';
import { options } from './pagination';

const pagination = new Pagination('#tui-pagination-container', options);

inputRef.addEventListener('input', debounce(searchMovie, 750));
homeBtn.addEventListener('click', clearSearch);
logoLink.addEventListener('click', clearSearch);

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

function clearSearch() {
  inputRef.value = '';
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
    // console.log(res.total_pages)
    // pagination.reset(res.total_pages);
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




// pagination.on('afterMove', event => {
//   const currentPage = event.page;
//   window.scrollTo(scrollX, 0);

//   clearInput();
//   // api.MovieSearch(currentPage).then(res => {
//   //   cardsMarkUp(res.results);
//   //   currentMovies.movies = res.results;
//   //   console.log(res)
//   // });
// });

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

const currentMovies = {
  movies: [],
};
