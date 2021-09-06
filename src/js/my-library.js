import { myLibraryBtn, bntlibrary, inpuForm, homeBtn, backgroundHome, watchedBtn, queueBtn} from './refs';

function clickBtn(evt) {
  activeBorderOn();
  addClassMyLibrary();
}

let arrQueueFilms;

myLibraryBtn.addEventListener('click', clickBtn);

queueBtn.addEventListener('click', activeBtnQueue);
watchedBtn.addEventListener('click', activeBtnWatched);

function addClassMyLibrary() {
  // добавляет/убирает классы в хедере для правильной отрисовки
  backgroundHome.classList.remove('page-header');
  backgroundHome.classList.add('header-lib');

  bntlibrary.classList.remove('visually-hidden');
  inpuForm.classList.add('visually-hidden');
}

function activeBorderOn() {
  //   добавляет/убирает подчеркивание на HOME и MY LIBRERY
  homeBtn.classList.remove('is-active');
  myLibraryBtn.classList.add('is-active');
}

function activeBtnQueue(evt) {
  //добавляет/убирает классы для кнопок в MY LIBRERY
  watchedBtn.classList.add('accent');
  queueBtn.classList.remove('primary-white');
  watchedBtn.classList.remove('active-btn');
  queueBtn.classList.add('active-btn');
}

function activeBtnWatched(evt) {
  // при нажатии на кнопку Watched делает ее активной и добавляет розметку
  queueBtn.classList.add('primary-white');
  watchedBtn.classList.remove('accent');
  watchedBtn.classList.add('active-btn');
  queueBtn.classList.remove('active-btn');
}

