import isInQueue from './is-in-queue';
// import { addWatchedBtn } from './refs';

export default function renderQueueBtn(id) {
  if (isInQueue(id)) {
    addQueueBtn.classList.toggle('queue');
  }
}
