// ДОПЗАДАНЕ - вывод фильмов с пагинацией (на случай большого кол-ва фильмов в библиотеке)

import { queueBtn } from '../refs';
import renderGallery from '../render-gallery';
import getQueue from './get-queue';
export { renderQueue, onQueueClick };
renderQueue();

function renderQueue() {
  queueBtn.addEventListener('click', onQueueClick);
}
function onQueueClick() {
  renderGallery(getQueue());
}
