import isWatched from './is-watched';
import { addWatchedBtn } from './refs';

export default function renderWatchedBtn(id) {
  if (isWatched(id)) {
    addWatchedBtn.classList.toggle('watched');
    console.log(id);
  }
}
