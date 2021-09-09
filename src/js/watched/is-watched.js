import getWatched from './get-watched';

export default function isWatched(id) {
  if (localStorage.getItem('watchedMovies') !== null) {
    let watchedArr = getWatched();
    let watchedIdArr = watchedArr.map(el => el.id);
    return watchedIdArr.includes(Number(id));
  } else return false;
}
