import { myLibraryBtn, bntlibrary, inpuForm, homeBtn, backgroundHome, watchedBtn, queueBtn, logoLink} from './refs';

function clickBtn() {
  activeBorderOn();
  addClassMyLibrary();
  activeBtnQueue();
}

function clickBtnHome() {
  activeBorderHome();
  addClassHome();
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
}

function activeBtnWatched() {
  // при нажатии на кнопку Watched делает ее активной и добавляет розметку
  queueBtn.classList.add('primary-white');
  watchedBtn.classList.remove('accent');
  watchedBtn.classList.add('active-btn');
  queueBtn.classList.remove('active-btn');
}


function addClassHome() {
  // добавляет/убирает классы в хедере для правильной отрисовки
  backgroundHome.classList.add('page-header');
  backgroundHome.classList.remove('header-lib');

  bntlibrary.classList.add('visually-hidden');
  inpuForm.classList.remove('visually-hidden');
}

function activeBorderHome() {
  //   добавляет/убирает подчеркивание на HOME и MY LIBRERY
  homeBtn.classList.add('is-active');
  myLibraryBtn.classList.remove('is-active');
  myLibraryBtn.classList.add('shd');
  homeBtn.classList.remove('shd');
}