import './sass/main.scss';

import onOpenModalFilm from './js/modal-film-lightbox';
import onOpenModalTeam from './js/modal-team-lightbox';
import refs from './js/refs';
import api from './js/apiService';
import modalMovieTpl from './templates/card-movie';

refs.modalFilmOpen.addEventListener('click', onOpenModalFilm);
refs.modalTeamOpen.addEventListener('click', onOpenModalTeam);
