import {
  myLibraryBtn,
  bntlibrary,
  inpuForm,
  homeBtn,
  backgroundHome,
  watchedBtn,
  queueBtn,
  logoLink,
  pagination,
} from './refs';
import { onQueueClick } from './queue/renderQueue';
import isLibraryEmpty from './my-library-set-bg-pic';
import { fetchTopMovies } from './startpage';

function clickBtn() {
  activeBorderOn();
  addClassMyLibrary();
  onQueueClick();
  activeBtnQueue();
    
}

function clickBtnHome() {
  activeBorderHome();
  addClassHome();
  isLibraryEmpty();
  
}

myLibraryBtn.addEventListener('click', clickBtn);
homeBtn.addEventListener('click', clickBtnHome);
logoLink.addEventListener('click', clickBtnHome);
queueBtn.addEventListener('click', activeBtnQueue);
watchedBtn.addEventListener('click', activeBtnWatched);

function addClassMyLibrary() {
  // добавляет/убирает классы в хедере для правильной отрисовки
  backgroundHome.classList.remove('page-header');
  backgroundHome.classList.add('header-lib');

  bntlibrary.classList.remove('visually-hidden');
  inpuForm.classList.add('visually-hidden');
  pagination.classList.add('visually-hidden');
}

function activeBorderOn() {
  //   добавляет/убирает подчеркивание на HOME и MY LIBRERY
  homeBtn.classList.remove('is-active');
  homeBtn.classList.add('shd');
  myLibraryBtn.classList.remove('shd');
  myLibraryBtn.classList.add('is-active');
}

function activeBtnQueue() {
  //добавляет/убирает классы для кнопок в MY LIBRERY
  watchedBtn.classList.add('accent');
  queueBtn.classList.remove('primary-white');
  watchedBtn.classList.remove('active-btn');
  queueBtn.classList.add('active-btn');
  isLibraryEmpty();
}

function activeBtnWatched() {
  // при нажатии на кнопку Watched делает ее активной и добавляет розметку
  queueBtn.classList.add('primary-white');
  watchedBtn.classList.remove('accent');
  watchedBtn.classList.add('active-btn');
  queueBtn.classList.remove('active-btn');
  isLibraryEmpty();
}

function addClassHome() {
  // добавляет/убирает классы в хедере для правильной отрисовки
  backgroundHome.classList.add('page-header');
  backgroundHome.classList.remove('header-lib');

  bntlibrary.classList.add('visually-hidden');
  inpuForm.classList.remove('visually-hidden');
  watchedBtn.classList.remove('active-btn');
  queueBtn.classList.remove('active-btn');
}

function activeBorderHome() {
  //   добавляет/убирает подчеркивание на HOME и MY LIBRERY
  homeBtn.classList.add('is-active');
  myLibraryBtn.classList.remove('is-active');
  myLibraryBtn.classList.add('shd');
  homeBtn.classList.remove('shd');
}
