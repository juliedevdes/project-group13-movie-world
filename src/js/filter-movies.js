import { gallery, inputRef, yearPicker, genrePicker, filterInput } from './refs';
import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import Spinner from './spinner';
import { cardsMarkUp } from './genres';

yearPickerMenu();

let yearValue = '';
let genreValue = '';

filterInput.forEach(item => {
  item.addEventListener('change', event => {
    api.fetchGenre().resetPage();
    inputRef.value = '';
    yearValue = yearPicker.value;
    genreValue = genrePicker.value;
    createCard(genreValue, yearValue);
  });
});

function createCard(genre, year) {
  fetchMovies(genre, year).then(res => {
    gallery.innerHTML = cardTpl(cardsMarkUp(cards));
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
