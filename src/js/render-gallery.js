import { gallery } from './refs';
import cardTpl from '../templates/card-movie-home.hbs';
export default function renderGallery(movies) {
  clearInput();
  createCard(movies);

  function createCard(movies) {
    gallery.insertAdjacentHTML('beforeend', cardTpl(movies));
  }

  function clearInput() {
    gallery.innerHTML = '';
  }
}
