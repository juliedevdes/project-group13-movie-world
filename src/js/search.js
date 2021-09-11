import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef, successRef, noSuccessRef, homeBtn, logoLink } from './refs';
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
// homeBtn.addEventListener('click', clearSearch);
// logoLink.addEventListener('click', clearSearch);

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
        // successRef.textContent = `Сongratulations!!! We found ${data.total_results} results of request "${searchText}" `;
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
            
          // onMore(movie, currentPage);
        });
        page = page + 1;
        // // //получаем массив обЪектов фильмов, которые пришли по запросу
        const data = res.results.map(el => {
          return el;
        
        });
        clearInput();
      //  renderFilms(data);
        return res.results;
        // cardsMarkUp(res);
        renderFilms(data, arrOfGenres, totalResult);
      } cardsMarkUp(movie);
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
function renderFilms(data, arrOfGenres, totalResult) {
  //записываем массивы названия жанров в каждый обЪект фильма
  for (let index = 0; index < 20; index++) {
    data[index].genre_names = arrOfGenres[index];
    totalResult = totalResult - 1;
    if (totalResult === 0) {
      break;
    }
  }
}

// function searchMovie(e) {
//   e.preventDefault();
//   const page = 1;
//   const inputText = e.target.value;

//   if (inputText.length <= 1) {
//     return;
//   }
//   movieSearcher(inputText, page);
// }

// function clearSearch() {
//   inputRef.value = '';
// }

// async function movieSearcher(searchText, pageNumber) {
//   try {
//     const data = await api.MovieSearch(searchText, pageNumber);

//     const results = data.results;
//     if (results.length === 0) {
//       noResults();

//       return;
//     }
//     clearInput();
//     // console.log(res.total_pages)
//     // pagination.reset(res.total_pages);
//     cardsMarkUp(results);

//     if (results !== []) {
//       spinner.showSpinner();
//       successRef.textContent = `Сongratulations!!! We found ${data.total_results} results of request "${searchText}" `;
//       setTimeout(function () {
//         spinner.hideSpinner();
//         successRef.textContent = '';
//       }, 1500);
//     }
//   } catch (error) {}
// }




// // pagination.on('afterMove', event => {
// //   const currentPage = event.page;
// //   window.scrollTo(scrollX, 0);

// //   clearInput();
// //   // api.MovieSearch(currentPage).then(res => {
// //   //   cardsMarkUp(res.results);
// //   //   currentMovies.movies = res.results;
// //   //   console.log(res)
// //   // });
// // });

// function clearInput() {
//   gallery.innerHTML = '';
// }



// const currentMovies = {
//   movies: [],

