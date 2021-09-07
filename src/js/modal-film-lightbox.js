import * as basicLightbox from 'basiclightbox';
import modalMovieTpl from '../templates/card-movie';
import { modalFilmOpen } from './refs';

modalFilmOpen.addEventListener('click', onOpenModalFilm);

function onOpenModalFilm(event) {
  console.log(event);

  const instance = basicLightbox.create(document.querySelector('template'), {
    onShow: instance => {
      instance.element().querySelector('svg').onclick = instance.close;
    },
  });
  instance.show();

  const modalContainer = document.querySelector('.modal');
  // modalContainer.innerHTML = '';

  const menuMarkup = createMenuMarkup(data);

  function createMenuMarkup(data) {
    return data.map(modalMovieTpl).join('');
  }
  modalContainer.insertAdjacentHTML('afterbegin', menuMarkup);

  // refs.modalFilmOpen.removeEventListener('click', onOpenModalFilm);
}
