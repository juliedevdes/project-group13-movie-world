import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { gallery } from './refs'


// const currentMovies = {
//   movies: [],
// };
 export function cardsMarkUp(movie) {
  
  api.fetchGenre().then(genres => {
   movie.map((card, i) => {
      card.release_date = card.release_date.substring(0, 4);
      card.vote_average = ' ';

      if (card.genre_ids.length > 3) {
          card.genre_ids = card.genre_ids.slice(0, 2)
            card.genre_ids[2]= ' other';
        }
      card.genre_ids.forEach((genre, index) => {
        genres.forEach(genreCard => {
            if (genreCard.id === genre) card.genre_ids[index] = ' ' + genreCard.name;
           
        });
         
      });
    });

    gallery.insertAdjacentHTML('beforeend', cardTpl(movie));

    // currentMovies.movies = cards;
  });
    
}

