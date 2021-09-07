import * as basicLightbox from 'basiclightbox';
import modalMovieTpl from '../templates/card-movie';
import { modalFilmOpen } from './refs';
import api from './apiService';
import { cardsMarkUp }  from './startpage'

modalFilmOpen.addEventListener('click', onOpenModalFilm);

function onOpenModalFilm(event) {
  
  event.preventDefault();
  api.MovieSearchId(event.target.dataset.id)
    .then(data => {
      if (event.target.nodeName !== 'IMG') return;

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
      modalContainer.insertAdjacentHTML('afterbegin', menuMarkup );

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

