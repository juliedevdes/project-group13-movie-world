import { myLibraryBtn, watchedBtn, queueBtn, galleryRef } from './refs';
import getWatched from './watched/get-watched';
import getQueue from './queue/get-queue';

export default function isLibraryEmpty() {
  let queue = getQueue();
  let watched = getWatched();
  console.log('вызов');
  if (!myLibraryBtn.classList.contains('is-active')) {
    galleryRef.classList.remove('empty');
    return;
  }
  if (watchedBtn.classList.contains('active-btn')) {
    if (watched === null) {
      galleryRef.classList.add('empty');
      return;
    } else if (watched.length === 0) {
      galleryRef.classList.add('empty');
      return;
    } else galleryRef.classList.remove('empty');
    return;
  }
  if (queueBtn.classList.contains('active-btn')) {
    if (queue === null) {
      galleryRef.classList.add('empty');
      return;
    } else if (queue.length === 0) {
      galleryRef.classList.add('empty');
      return;
    } else galleryRef.classList.remove('empty');
    return;
  } else galleryRef.classList.remove('empty');
  return;
}
