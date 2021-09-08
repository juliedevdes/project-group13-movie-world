import * as basicLightbox from 'basiclightbox';
import modalMovieTpl from '../templates/card-movie';
import { modalFilmOpen } from './refs';
import api from './apiService';

modalFilmOpen.addEventListener('click', onOpenModalFilm);

function onOpenModalFilm(event) {
  console.log(event.target.dataset.id);
  event.preventDefault();

  api
    .MovieSearchId(event.target.dataset.id)
    .then(data => {
      if (event.target.nodeName !== 'IMG') return;

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
    })
    .catch(error => {
      console.log('oops!');
    });

  // refs.modalFilmOpen.removeEventListener('click', onOpenModalFilm);
}
