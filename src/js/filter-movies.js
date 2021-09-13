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
import fPagination from './pagination';

yearPickerMenu();

let yearValue = '';
let genreValue = '';
const spinner = new Spinner();

myLibraryBtn.addEventListener('click', closeFilter);
homeBtn.addEventListener('click', openFilter);
logoLink.addEventListener('click', openFilter);

filterInput.forEach(item => {
  item.addEventListener('change', event => {
    inputRef.value = '';
    yearValue = yearPicker.value;
    genreValue = genrePicker.value;

    createCard(genreValue, yearValue);
  });
});

function createCard(genre, year) {
  api.fetchMovies(genre, year).then(res => {
    gallery.innerHTML = '';

   
  
    const currentPage = res.page;
    const totalResult = res.total_results;
    const instance = fPagination();
    instance.setItemsPerPage(20);

    instance.setTotalItems(totalResult);
    instance.movePageTo(currentPage);
    instance.on('afterMove', event => {
      const currentPage = event.page;
      onMore(genre, currentPage);
      clearInput();
      api.increment();
     
    });
    cardsMarkUp(res.results,currentPage);
  });
}
async function onMore(genre, currentPage) {
  try {
    const cards = await api.fetchMovies(genre, currentPage);
    const data = cards.results;
    clearInput();

    cardsMarkUp(data);
  } catch (error) {
    console.log(error);
  }
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
function clearInput() {
  if (gallery.hasChildNodes() === true) {
    gallery.innerHTML = '';
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
