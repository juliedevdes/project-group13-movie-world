import * as basicLightbox from 'basiclightbox';
import modalMovieTpl from '../templates/card-movie';
import { modalFilmOpen } from './refs';
import api from './apiService';
import renderWatchedBtn from './render-watched-btn';
import getWatched from './get-watched';
import isWatched from './is-watched';
import { compile } from 'handlebars';

modalFilmOpen.addEventListener('click', onOpenModalFilm);
let currentId;
function onOpenModalFilm(event) {
  currentId = event.target.dataset.id;
  if (event.target.nodeName !== 'IMG') return;
  event.preventDefault();
  api
    .MovieSearchId(currentId)
    .then(data => {
      const instance = basicLightbox.create(document.querySelector('template'), {
        onShow: instance => {
          instance.element().querySelector('svg').onclick = instance.close;
        },
      });
      instance.show();
      const genres = data.genres.map(item => item.name);

      data.genres = genres.join(', ');
      data.popularity = parseFloat(data.popularity).toFixed(1);

      const modalContainer = document.querySelector('.modal');

      const menuMarkup = modalMovieTpl(data);
      modalContainer.insertAdjacentHTML('afterbegin', menuMarkup);

      window.addEventListener('keydown', closeModalHand);

      function closeModalHand(event) {
        if (event.code === 'Escape') {
          instance.close();
          window.removeEventListener('keydown', closeModalHand);
        }
      }

      let watchedMovies = [];

      addWatched();
      function addWatched() {
        const addWatchedBtn = document.querySelector('.btn-watch');
        if (isWatched(currentId)) {
          addWatchedBtn.classList.toggle('watched');
        }
        addWatchedBtn.addEventListener('click', onAddWatchedClick);
      }

      function onAddWatchedClick(e) {
        const addWatchedBtn = e.target;

        if (localStorage.getItem('watchedMovies') === null) {
          watchedMovies = [];
        }
        if (localStorage.getItem('watchedMovies') !== null) {
          watchedMovies = getWatched();
        }

        if (isWatched(currentId)) {
          let index = watchedMovies.findIndex(element => {
            return element.id == currentId;
          });
          console.log(currentId);
          console.log(watchedMovies);
          console.log(index);
          watchedMovies.splice(index, 1);
          localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
          addWatchedBtn.classList.toggle('watched');
          return;
        }
        watchedMovies.push(data);
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        addWatchedBtn.classList.toggle('watched');
      }
    })
    .catch(error => {
      console.log(error);
    });

  // refs.modalFilmOpen.removeEventListener('click', onOpenModalFilm);
}
