import { gallery, inputRef, yearPicker, genrePicker, filterInput } from './refs';
import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import Spinner from './spinner';
import { cardsMarkUp } from './genres';
import renderGallery from './render-gallery';

yearPickerMenu();

let yearValue = '';
let genreValue = '';
const spinner = new Spinner();

// function movieFilter() {
//   // api.fetchMovies();
//   // incrementPage() {
//   //   this._page += 1;
//   // }
//   // resetPage() {
//   //   this._page = 1;
//   // }
//   // decrementPage() {
//   //   this._page -= 1;
//   // }
//   // get page() {
//   //   return this._page;
//   // }
//   // set page(value) {
//   //   this._page = value;
//   // }
// }

filterInput.forEach(item => {
  item.addEventListener('change', event => {
    // api.fetchMovies();
    inputRef.value = '';
    yearValue = yearPicker.value;
    genreValue = genrePicker.value;
    createCard(genreValue, yearValue);
  });
});

// function createCard(genre, year) {
//   api.fetchMovies(genre, year);
//   const movies = res.results;
//   cardsMarkUp();
// }
function createCard(genre, year) {
  api.fetchMovies(genre, year).then(res => {
    gallery.innerHTML = '';
    cardsMarkUp(res.results);
  });
}

function yearPickerMenu() {
  let startYear = 1900;
  let endYear = new Date().getFullYear();
  let years = [];
  yearPicker.insertAdjacentHTML('beforeend', '<option value="">Choose year</option>');
  for (let i = endYear; i > startYear; i--) {
    years.push(`<option value="${i}">${i}</option>`);
  }
  yearPicker.insertAdjacentHTML('beforeend', years);
}
