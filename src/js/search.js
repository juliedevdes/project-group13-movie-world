import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef, successRef, noSuccessRef, homeBtn, logoLink, pagination } from './refs';
import debounce from 'lodash/debounce';
import Spinner from './spinner';
import { cardsMarkUp } from './genres';
import Pagination from 'tui-pagination';
import fPagination from './pagination';
import { fetchTopMovies } from './startpage';


let page = 1;
let arr = [];



// const pagination = new Pagination('#tui-pagination-container', options);

inputRef.addEventListener('input', debounce(searchMovie, 750));
homeBtn.addEventListener('click', backTooMain);
logoLink.addEventListener('click',backTooMain);

const spinner = new Spinner();
export function searchMovie(e) {
  e.preventDefault();
  const movie = e.target.value;
  resetPage();
  if (movie.length > 1) {
    api.MovieSearch(movie, page).then(res => {
      if (res.total_results === 0) {
        noResults();
        clearInput();
        fPagination().reset();
      } else {
        spinner.showSpinner();
        successRef.textContent = `Сongratulations!!! We found ${res.total_results} results of request "${movie}" `;
        setTimeout(function () {
          spinner.hideSpinner();
          successRef.textContent = '';
        }, 1500);
        const totalResult = res.total_results;
        const totalHits = res.total_pages;
        let currentPage = res.page;
         
        const instance = fPagination();
        instance.setItemsPerPage(20);
        instance.setTotalItems(totalResult);
        instance.movePageTo(currentPage);
         
        instance.on('afterMove', event => {
          const currentPage = event.page;
            
          onMore(movie, currentPage);
        });
        page = page + 1;
        
        const data = res.results;
        
       cardsMarkUp(data,currentPage)
        clearInput();
     
        return res.results;
        
      } ;
    })
      
      .catch(error => {
        console.dir(error);
      });
  } 
}
    
inputRef.addEventListener('input', getTopMoviesAgain);

function getTopMoviesAgain(e) {
  resetPage();
  if (!e.target.value.length) {
    clearInput();
    
   fetchTopMovies(page);
  }
  return;
}
  
function resetPage() {
  return (page = 1);
}
 
function noResults() {
  spinner.showSpinner();
  noSuccessRef.textContent =
    'Search result not successful. Enter the correct movie name and try again';
  setTimeout(function () {
    noSuccessRef.textContent = '';
    spinner.hideSpinner();
  }, 1500);
  clearInput();
}
function clearInput() {
  if (gallery.hasChildNodes() === true) {
    gallery.innerHTML = '';
  }
  return;
}
async function onMore(movie, currentPage) {
  try {
    
    
    const cards = await api.MovieSearch(movie, currentPage);
    const data = cards.results;
  
    clearInput();
    
   cardsMarkUp(data);
   
   
  } catch (error) {
    console.log(error);
  }
}
function clearSearch() {
 
  resetPage();
}
export function backTooMain() {
  clearInput();
  resetPage();
  fetchTopMovies(page);
}
