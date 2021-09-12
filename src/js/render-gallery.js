import { gallery } from './refs';
import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
export default function renderGallery(movies) {
  clearInput();
  createCard(movies);

  function createCard(movies) {
    api.fetchGenre().then(() => {
      movies.forEach(card => {
        card.release_date = card.release_date.substring(0, 4);
        card.genres = card.genres.split(',');
        if (card.genres.length > 3) {
          card.genres = card.genres.slice(0, 2) + ', other';
          console.log(card.genres);
        }
      });
      gallery.insertAdjacentHTML('beforeend', cardTpl(movies));
    });
  }

  function clearInput() {
    gallery.innerHTML = '';
  }
}
