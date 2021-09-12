import api from './apiService';
import cardTpl from '../templates/card-movie-home.hbs';
import { modalOpen, gallery, inputRef, homeBtn, logoLink } from './refs';
import Spinner from './spinner';
import { cardsMarkUp } from './genres';
import Pagination from 'tui-pagination';
import fPagination from './pagination';
import renderGallery from './render-gallery';
import clickBtnHome from './my-library';
import { backTooMain } from './search';

const spinner = new Spinner();

// document.addEventListener('DOMContentLoaded', fetchTopMovies());

homeBtn.addEventListener('click', backTooMain);
logoLink.addEventListener('click', backTooMain);

let page = 1;

export async function fetchTopMovies(page) {
  try {
    const res = await api.PopularMovie(page);
    const movies = res.results;
    const totalResult = res.total_results;
    const totalHits = res.total_pages;
    let currentPage = res.page;
    console.log(res.results);
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
