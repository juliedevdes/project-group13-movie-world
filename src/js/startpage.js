import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef, homeBtn, logoLink, loadMoreRef } from './refs';
import Spinner from './spinner';
import { cardsMarkUp } from './genres';
import Pagination from 'tui-pagination';
import fPagination from './pagination';


const spinner = new Spinner();

// document.addEventListener('DOMContentLoaded', startPage);
// homeBtn.addEventListener('click', startPage);
// logoLink.addEventListener('click', startPage);

let page = 1

 
export async function fetchTopMovies(page) {
  try {
    const res = await api.PopularMovie(page);
    const movies = res.results;
    const totalResult = res.total_results;
    const totalHits = res.total_pages;
    let currentPage = res.page;

    const instance = fPagination();
    instance.setItemsPerPage(20);
    instance.setTotalItems(totalResult);
    instance.movePageTo(currentPage);

    instance.on('afterMove', event => {
      currentPage = event.page;
      clearInput();
      fetchTopMovies(currentPage);
    });
    spinner.showSpinner();
    if (totalResult !== []) {
      spinner.hideSpinner();
    }
    cardsMarkUp(movies);
   
    
  } catch (error) {
    console.log(error);
  }
}

fetchTopMovies(page);

 function clearInput() {
      if (gallery.hasChildNodes() === true) {
    gallery.innerHTML = '';
  }
}


 

// const spinner = new Spinner();
// const pagination = new Pagination('#tui-pagination-container', options);


// async function startPage() {
//   try {
//      const data = await api.PopularMovie(currentPage);

//     const cards = data.results;
//     spinner.showSpinner();
//     if (cards !== []) {
//       spinner.hideSpinner();
//     }
    
//     clearInput();
//     cardsMarkUp(cards);
    
//   } catch (error) {}
// }


   

// api.PopularMovie(1).then(res => {
//   pagination.reset(res.total_pages);
  
// });

// pagination.on('afterMove', event => {
  
//   const currentPage = event.page;


//  clearInput();
//   api.PopularMovie(currentPage).then(res => {
//     cardsMarkUp(res.results);
//     currentMovies.movies = res.results;
  
//   });
// });


// const currentMovies = {
//   movies: [],
// };








