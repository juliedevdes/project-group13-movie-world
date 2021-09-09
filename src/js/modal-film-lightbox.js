import * as basicLightbox from 'basiclightbox';
import modalMovieTpl from '../templates/card-movie';
import { modalFilmOpen } from './refs';
import api from './apiService';
import renderWatchedBtn from './render-watched-btn';
import getWatched from './get-watched';
import getQueue from './queue/get-queue';
import isWatched from './is-watched';
import isInQueue from './queue/is-in-queue';
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
          document.body.style.overflow = 'hidden';
          instance.element().querySelector('svg').onclick = instance.close;
        },
        onClose: instance => {
          document.body.style.overflow = 'visible';
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
          watchedMovies.splice(index, 1);
          localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
          addWatchedBtn.classList.toggle('watched');
          return;
        }
        watchedMovies.push(data);
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        addWatchedBtn.classList.toggle('watched');
      }

      let queueMovies = [];

      addQueue();
      function addQueue() {
        const addQueueBtn = document.querySelector('.btn-queue');
        if (isInQueue(currentId)) {
          addQueueBtn.classList.toggle('queue');
        }
        addQueueBtn.addEventListener('click', onAddQueueClick);
      }

      function onAddQueueClick(e) {
        const addQueueBtn = e.target;

        if (localStorage.getItem('queueMovies') === null) {
          queueMovies = [];
        }
        if (localStorage.getItem('queueMovies') !== null) {
          queueMovies = getQueue();
        }

        if (isInQueue(currentId)) {
          let index = queueMovies.findIndex(element => {
            return element.id == currentId;
          });

          queueMovies.splice(index, 1);
          localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
          addQueueBtn.classList.toggle('queue');
          return;
        }
        queueMovies.push(data);
        localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
        addQueueBtn.classList.toggle('queue');
      }
    })
    .catch(error => {
      console.log(error);
    });

  // refs.modalFilmOpen.removeEventListener('click', onOpenModalFilm);
}
