import isWatched from './is-watched';

export default function renderWatchedBtn(id, addWatchedBtn) {
  if (isWatched(id)) {
    addWatchedBtn.classList.toggle('watched');
  }
}
