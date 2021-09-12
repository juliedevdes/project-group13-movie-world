import * as basicLightbox from 'basiclightbox';
import modalMovieTpl from '../templates/card-movie';
import { modalFilmOpen, queueBtn, watchedBtn } from './refs';
import api from './apiService';
import renderWatchedBtn from './watched/render-watched-btn';
import renderQueueBtn from './queue/render-queue-btn';
import getWatched from './watched/get-watched';
import getQueue from './queue/get-queue';
import isWatched from './watched/is-watched';
import isInQueue from './queue/is-in-queue';
import renderGallery from './render-gallery';
import isLibraryEmpty from './my-library-set-bg-pic';

modalFilmOpen.addEventListener('click', onOpenModalFilm);
let currentId;
function onOpenModalFilm(event) {
  currentId = event.target.dataset.id;
  if (event.target.nodeName !== 'IMG') return;
  event.preventDefault();
  api.MovieSearchId(currentId).then(data => {
    const instance = basicLightbox.create(document.querySelector('template'), {
      onShow: instance => {
        document.body.style.overflow = 'hidden';
        instance.element().querySelector('svg').onclick = instance.close;
      },
      onClose: instance => {
        document.body.style.overflow = 'visible';
      },
    });
    instance.show();
    const genres = data.genres.map(item => item.name);

    data.genres = genres.join(', ');
    data.popularity = parseFloat(data.popularity).toFixed(1);

    const modalContainer = document.querySelector('.modal');

    const menuMarkup = modalMovieTpl(data);
    modalContainer.insertAdjacentHTML('afterbegin', menuMarkup);

    window.addEventListener('keydown', closeModalHand);

    function closeModalHand(event) {
      if (event.code === 'Escape') {
        instance.close();
        window.removeEventListener('keydown', closeModalHand);
      }
    }

    let watchedMovies = [];

    addWatched();

    function addWatched() {
      const addWatchedBtn = document.querySelector('.btn-watch');
      renderWatchedBtn(currentId, addWatchedBtn);
      addWatchedBtn.addEventListener('click', onAddWatchedClick);
    }

    function onAddWatchedClick(e) {
      const addWatchedBtn = e.target;

      if (localStorage.getItem('watchedMovies') === null) {
        watchedMovies = [];
      }

      if (localStorage.getItem('watchedMovies') !== null) {
        watchedMovies = getWatched();
      }

      if (isWatched(currentId)) {
        let index = watchedMovies.findIndex(element => {
          return element.id == currentId;
        });

        watchedMovies.splice(index, 1);

        if (watchedBtn.classList.contains('active-btn')) {
          renderGallery(watchedMovies);
        }

        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        addWatchedBtn.classList.toggle('watched');
        isLibraryEmpty();
        return;
      }

      watchedMovies.push(data);
      localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
      isLibraryEmpty();
      addWatchedBtn.classList.toggle('watched');
      if (watchedBtn.classList.contains('active-btn')) {
        renderGallery(watchedMovies);
      }
    }

    let queueMovies = [];

    addQueue();

    function addQueue() {
      const addQueueBtn = document.querySelector('.btn-queue');
      renderQueueBtn(currentId, addQueueBtn);
      addQueueBtn.addEventListener('click', onAddQueueClick);
    }

    function onAddQueueClick(e) {
      const addQueueBtn = e.target;

      if (localStorage.getItem('queueMovies') === null) {
        queueMovies = [];
      }

      if (localStorage.getItem('queueMovies') !== null) {
        queueMovies = getQueue();
      }

      if (isInQueue(currentId)) {
        let index = queueMovies.findIndex(element => {
          return element.id == currentId;
        });

        queueMovies.splice(index, 1);

        if (queueBtn.classList.contains('active-btn')) {
          renderGallery(queueMovies);
        }

        localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
        addQueueBtn.classList.toggle('queue');
        isLibraryEmpty();
        return;
      }

      queueMovies.push(data);
      localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
      isLibraryEmpty();
      addQueueBtn.classList.toggle('queue');
      if (queueBtn.classList.contains('active-btn')) {
        renderGallery(queueMovies);
      }
    }
    // ============ getting id for trailer search ==========
    const trailerBtn = document.querySelector('.trailer-btn');
    trailerBtn.addEventListener('click', showTrailer);
    function showTrailer() {
      instance.close();
      openNav();
    }
  });

  /* Open when someone clicks on the span element */
  function openNav() {
    api.MovieSearchId(currentId).then(response => {
      let movieId = response.id;
      const overlayRef = document.querySelector('.overlay-content');
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=4cd8eda69724fa63af45af35bb5db6f9`,
      )
        .then(response => response.json())
        .then(videoData => {
          console.log(videoData);
          const videoArr = videoData.results;
          console.log(videoArr);
          if (videoArr) {
            document.getElementById('myNav').style.width = '100%';
            if (videoArr.length > 0) {
              let embed = [];
              videoArr.forEach(video => {
                let { name, key, site } = video;
                if (site === 'YouTube') {
                  embed.push(`
                <iframe src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `);
                }
              });
              overlayRef.innerHTML = embed.join('');
              activeVideo = 0;
              showVideos();
            } else {
              overlayRef.innerHTML = `<h1 class="no-result">No video found!</h1>`;
            }
          }
        });
    });
  }

  // handle one video parse:
  var activeVideo = 0;
  function showVideos() {
    let embedClasses = document.querySelectorAll('.embed');
    embedClasses.forEach((embedTag, index) => {
      if (activeVideo === index) {
        embedTag.classList.add('show');
        embedTag.classList.remove('hide');
      } else {
        embedTag.classList.add('hide');
        embedTag.classList.remove('show');
      }
    });
  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById('myNav').style.width = '0%';
  }

  const closeOverlayIcon = document.querySelector('.closebtn');
  closeOverlayIcon.addEventListener('click', closeNav);
}
