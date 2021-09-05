import { toTop } from './refs';

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 1000) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});
