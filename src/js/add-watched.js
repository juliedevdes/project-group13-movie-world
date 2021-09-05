import { gallery } from './refs';

// === \/\/\/\/ пробная кнопка пока нет модалки \/\/\/\/ ===
const renderBtn =
  '<button class="add-watched-btn"  style="margin: 15px" type="button" id="add-watched-btn"></button>';
gallery.insertAdjacentHTML('afterend', renderBtn);
// === /\/\/\/\ пробная кнопка пока нет модалки /\/\/\/\ ===
// === \/\/\/\/ тестовые даные о фильме пока нет модалики. Будем получать из event при открытии карточки фильма \/\/\/\/ ===
let currentMovie = {
  adult: false,
  backdrop_path: '/hRMfgGFRAZIlvwVWy8DYJdLTpvN.jpg',
  belongs_to_collection: null,
  budget: 0,
  genres: [
    { id: 14, name: 'Fantasy' },
    { id: 10749, name: 'Romance' },
    { id: 35, name: 'Comedy' },
  ],
  homepage: 'https://www.amazon.com/dp/B097YYZ87F',
  id: 593910,
  imdb_id: 'tt10155932',
  original_language: 'en',
  original_title: 'Cinderella',
  overview:
    'Cinderella, an orphaned girl with an evil stepmother, has big dreams and with the help of her Fabulous Godmother, she perseveres to make them come true.',
  popularity: 440.353,
  poster_path: '/hRMfgGFRAZIlvwVWy8DYJdLTpvN.jpg',
  production_companies: [
    {
      id: 5505,
      logo_path: '/bo3CWheRp7to1hpkMM45DWuKsBH.png',
      name: 'Fulwell 73',
      origin_country: '',
    },
    {
      id: 5,
      logo_path: '/71BqEFAF4V3qjjMPCpLuyJFB9A.png',
      name: 'Columbia Pictures',
      origin_country: 'US',
    },
  ],
  production_countries: [{ iso_3166_1: 'US', name: 'United States of America' }],
  release_date: '2021-09-03',
  revenue: 0,
  runtime: 113,
  spoken_languages: [{ english_name: 'English', iso_639_1: 'en', name: 'English' }],
  status: 'Released',
  tagline: 'One shoe to rule them all.',
  title: 'Cinderella',
  video: false,
  vote_average: 6.6,
  vote_count: 137,
};
// === /\/\/\/\ тестовые даные о фильме пока нет модалики. Будем получать из event при открытии карточки фильма /\/\/\/\ ===

const addWatchedBtn = document.getElementById('add-watched-btn');

addWatchedBtn.addEventListener('click', onAddWatchedClick);
let watchedMovies = [];

function onAddWatchedClick() {
  if (localStorage.getItem('watchedMovies') === null) {
    watchedMovies = [];
  }
  if (localStorage.getItem('watchedMovies') !== null) {
    watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
  }

  watchedMovies.push(currentMovie);
  console.log(watchedMovies);
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
}
