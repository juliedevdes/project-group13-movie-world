// import { addWatchedBtn } from './refs';
// import getWatched from './get-watched';
// import isWatched from './is-watched';
// import renderWatchedBtn from './render-watched-btn';

// let watchedMovies = [];
// export default function asd() {
//   const addWatchedBtn = document.querySelector('.btn-watch');
//   console.log(addWatchedBtn);

//   addWatchedBtn.addEventListener('click', onAddWatchedClick);
// }

// function onAddWatchedClick(e) {
//   const addWatchedBtn = e.target;
//   let currentId = addWatchedBtn.dataset.id;
//   if (localStorage.getItem('watchedMovies') === null) {
//     watchedMovies = [];
//   }
//   if (localStorage.getItem('watchedMovies') !== null) {
//     watchedMovies = getWatched();
//   }
//   if (isWatched(currentId)) {
//     let index = watchedMovies.findIndex((element, index, array) => {
//       return element.id === currentId;
//     });
//     watchedMovies.splice(index, 1);
//     localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
//     addWatchedBtn.classList.toggle('watched');
//     return;
//   }
//   watchedMovies.push(data);
//   // console.log(watchedMovies);
//   localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
//   addWatchedBtn.classList.toggle('watched');
// }
