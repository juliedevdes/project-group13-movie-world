import getWatched from './get-watched';

export default function isWatched(id) {
  if (localStorage.getItem('watchedMovies') !== null) {
    let watchedArr = getWatched();
    console.log(watchedArr);

    let aaa = watchedArr.map(el => el.id);
    return aaa.includes(id);
  } else return false;
}
