import './sass/main.scss';
import 'animate.css';

import onOpenModalFilm from './js/modal-film-lightbox';
import onOpenModalTeam from './js/modal-team-lightbox';
// import refs from './js/refs';
import { modalFilmOpen, modalTeamOpen } from './js/refs';
import api from './js/apiService';
import modalMovieTpl from './templates/card-movie';
import teamModal from './js/team-modal';
import cardTpl from './templates/card-movie-home.hbs';
import search from './js/search';
import startpage from './js/startpage';
import watched from './js/watched';
import addWatched from './js/add-watched';
import theme from './js/theme';
import spinner from './js/spinner';
import './js/render-watched-btn';
import toTop from './js/to-top';
import lib from './js/my-library';
import isWatched from './js/is-watched';

modalFilmOpen.addEventListener('click', onOpenModalFilm);
modalTeamOpen.addEventListener('click', onOpenModalTeam);
