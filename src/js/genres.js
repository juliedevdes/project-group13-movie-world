import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { gallery } from './refs'


const currentMovies = {
  movies: [],
};
 export function cardsMarkUp(cards) {
  // Запрос списка жанров
  api.fetchGenre().then(genres => {
    cards.forEach((card, i) => {
      card.release_date = card.release_date.substring(0, 4);

      if (card.genre_ids.length > 3) {
        card.genre_ids = card.genre_ids.slice(0, 3);
      }

      card.genre_ids.forEach((genre, index) => {
        genres.forEach(genrCard => {
          if (genrCard.id === genre) card.genre_ids[index] = ' ' + genrCard.name;
        });
      });
    });

    gallery.insertAdjacentHTML('beforeend', cardTpl(cards));

    currentMovies.movies = cards;
  });
}

