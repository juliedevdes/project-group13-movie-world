import {
  homeBtn,
  logoLink,
  myLibraryBtn,
  gallery,
  inputRef,
  yearPicker,
  genrePicker,
  filterInput,
  filterSection,
} from './refs';
import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import Spinner from './spinner';
import { cardsMarkUp } from './genres';
import renderGallery from './render-gallery';

yearPickerMenu();

let yearValue = '';
let genreValue = '';
const spinner = new Spinner();

myLibraryBtn.addEventListener('click', closeFilter);
homeBtn.addEventListener('click', openFilter);
logoLink.addEventListener('click', openFilter);

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

// adds release years of films to select for filtering
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

//to clear genres select ► import yearPicker, genrePicker from refs to make it work
export default function clearFilter() {
  yearPicker.value = '';
  genrePicker.value = '';
}

//removes the filter from the page layout
function closeFilter() {
  filterSection.classList.add('visually-hidden');
}

//add a filter from the page markup
function openFilter() {
  filterSection.classList.remove('visually-hidden');
}
