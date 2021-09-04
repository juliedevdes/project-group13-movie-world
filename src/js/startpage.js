import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef } from './refs';

document.addEventListener('DOMContentLoaded', startPage);
let currentPage = 1;

async function startPage() {
  try {
    const data = await api.PopularMovie(currentPage);

    const movies = data.results;

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