import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef } from './refs';
import Spinner from './spinner';

document.addEventListener('DOMContentLoaded', startPage);

const spinner = new Spinner();

let currentPage = 1;

async function startPage() {
  try {
    const data = await api.PopularMovie(currentPage);

    const movies = data.results;
    spinner.showSpinner();
    if (movies !== []) {
      spinner.hideSpinner();
    }
    clearInput();
    createCard(movies);
  } catch (error) {}
}

function createCard(movies) {
  gallery.insertAdjacentHTML('beforeend', cardTpl(movies));
}

function clearInput() {
  gallery.innerHTML = '';
}