import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef, homeBtn, logoLink, loadMoreRef } from './refs';
import Spinner from './spinner';

document.addEventListener('DOMContentLoaded', startPage);
homeBtn.addEventListener('click', startPage);
logoLink.addEventListener('click', startPage);

const spinner = new Spinner();

let currentPage = 1 ;

async function startPage() {
  try {
     const data = await api.PopularMovie(currentPage);

    const cards = data.results;
    spinner.showSpinner();
    if (cards !== []) {
      spinner.hideSpinner();
    }
    clearInput();
   
   observer.observe(loadMoreRef)
  
   
  } catch (error) {}
}
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

// function createCard(movies) {
//   gallery.insertAdjacentHTML('beforeend', cardTpl(movies));
// }

function clearInput() {
  gallery.innerHTML = '';
}
const currentMovies = {
  movies: [],
};

// intersectionObserver for infinite scroll:
export  function  onEntry( entries )  {
  entries.forEach(entry => {
 
    if (entry.isIntersecting) {
     
        api.PopularMovie(currentPage).then(cards => {
        if (cards.length < 1) {
          window.alert('No images to display 😢');
          observer.unobserve(loadMoreRef);
          return;
        }
    
        if(cards.page >= 1 ) 
          cards.page = currentPage++;
       
        const moviesToRender = cards.results;
        // gallery.insertAdjacentHTML('beforeend', cardTpl(moviesToRender));
        cardsMarkUp(moviesToRender)
      });
     }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '200px',
});
