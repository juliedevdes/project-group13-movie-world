import isInQueue from './is-in-queue';

export default function renderQueueBtn(id, addQueueBtn) {
  if (isInQueue(id)) {
    addQueueBtn.classList.toggle('queue');
  }
}
