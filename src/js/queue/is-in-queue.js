import getQueue from './get-queue';

export default function isInQueue(id) {
  if (localStorage.getItem('queueMovies') !== null) {
    let queueArr = getQueue();
    let queueIdArr = queueArr.map(el => el.id);
    return queueIdArr.includes(Number(id));
  } else return false;
}
