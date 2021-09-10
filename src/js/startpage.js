import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef, homeBtn, logoLink, loadMoreRef } from './refs';
import Spinner from './spinner';
import { cardsMarkUp } from './genres';
import Pagination from 'tui-pagination';
import { options } from './pagination';



document.addEventListener('DOMContentLoaded', startPage);
homeBtn.addEventListener('click', startPage);
logoLink.addEventListener('click', startPage);
 

const spinner = new Spinner();
const pagination = new Pagination('#tui-pagination-container', options);
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
    cardsMarkUp(cards);
    
  } catch (error) {}
}


function clearInput() {
  gallery.innerHTML = '';
}


api.PopularMovie(1).then(res => {
  pagination.reset(res.total_pages);
  
});

pagination.on('afterMove', event => {
  
  const currentPage = event.page;


 clearInput();
  api.PopularMovie(currentPage).then(res => {
    cardsMarkUp(res.results);
    currentMovies.movies = res.results;
  
  });
});
const currentMovies = {
  movies: [],
};




