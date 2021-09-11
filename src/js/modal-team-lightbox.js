import * as basicLightbox from 'basiclightbox';
import { modalTeamOpen } from './refs';

import svgUrl from '../images/sprite.svg';

//all adaptive team-images imported to work with lightbox
import alexPMob from '../images/team/team-adaptive/mobile/alexander-ponomarenko.jpg';
import alexPTab from '../images/team/team-adaptive/tablet/alexander-ponomarenko.jpg';
import alexPDesk from '../images/team/team-adaptive/desktop/alexander-ponomarenko.jpg';

import valeraMob from '../images/team/team-adaptive/mobile/valerii-vitenko.jpg';
import valeraTab from '../images/team/team-adaptive/tablet/valerii-vitenko.jpg';
import valeraDesk from '../images/team/team-adaptive/desktop/valerii-vitenko.jpg';

import annaSMob from '../images/team/team-adaptive/mobile/anna-savchuck.jpg';
import annaSTab from '../images/team/team-adaptive/tablet/anna-savchuk.jpg';
import annaSDesk from '../images/team/team-adaptive/desktop/anna-savchuk.jpg';

import annaPMob from '../images/team/team-adaptive/mobile/anna-pavlova.jpg';
import annaPTab from '../images/team/team-adaptive/tablet/anna-pavlova.jpg';
import annaPDesk from '../images/team/team-adaptive/desktop/anna-pavlova.jpg';

import serMob from '../images/team/team-adaptive/mobile/serhii-nechytailenko.jpg';
import serTab from '../images/team/team-adaptive/tablet/serhii-nechytailenko.jpg';
import serDesk from '../images/team/team-adaptive/desktop/serhii-nechytailenko.jpg';

import alexBMob from '../images/team/team-adaptive/mobile/alexander-baran.jpg';
import alexBTab from '../images/team/team-adaptive/tablet/alexander-baran.jpg';
import alexBDesk from '../images/team/team-adaptive/desktop/alexander-baran.jpg';

import romaMob from '../images/team/team-adaptive/mobile/roma-leshenko.jpg';
import romaTab from '../images/team/team-adaptive/tablet/roma-leshenko.jpg';
import romaDesk from '../images/team/team-adaptive/desktop/roma-leshenko.jpg';

import juliaMob from '../images/team/team-adaptive/mobile/julia-okhrimenko.jpg';
import juliaTab from '../images/team/team-adaptive/tablet/julia-ohrimenko.jpg';
import juliaDesk from '../images/team/team-adaptive/desktop/julia-ohrimenko.jpg';

modalTeamOpen.addEventListener('click', onOpenModalTeam);

function onOpenModalTeam(event) {
  const instance = basicLightbox.create(markup, {
    onShow: instance => {
      instance.element().querySelector('svg').onclick = instance.close;
    },
  });

  instance.show();

  window.addEventListener('keydown', closeModalHand);

  function closeModalHand(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModalHand);
    }
  }
}

//html for team modal here
const markup = `<div class='team-modal'>
<button type='button' class='team-modal__close-btn'>
  <svg class='team-modal__close-icon' width='20' height='20'>
    <use href='${svgUrl}#icon-close-modal'></use>
  </svg>
</button>
<h1 class='team-modal__title'>“Team, Scream and Two Smoking Mentors”</h1>

<ul class='team-modal__list'>
  <li class='team-modal__list__item'>
    <picture>
      <source srcset='${alexPDesk}' media='(min-width:1024px)' />
      <source srcset='${alexPTab}' media='(min-width:768px)' />
      <source srcset='${alexPMob}' media='(min-width:320px)' />
      <img src='${alexPMob}' alt='aleksandr ponomarenko' class='team-modal__img' />
    </picture>

    <div class='team-modal__list--side-info'>
      <p class='team-modal__role-title'>scrum-master</p>
      <h2 class='team-modal__name'>Alexander Ponomarenko</h2>
      <p class='team-modal__quote'>
        “A minute ago this was the safest job in the world. Now it's turning into a bad day in
        Bosnia.”
      </p>
      <a href='https://www.linkedin.com/in/ponomalex/' target='_blank' class='team-modal__soc-link link'><svg
          class='team-modal__icon'
          width='35'
          height='35'
        >
          <use href='${svgUrl}#icon-linkedin'></use></svg></a>
      <a href='https://github.com/Ponomaleks' target='_blank' class='team-modal__soc-link link'>
        <svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-github'></use></svg></a>
    </div>
  </li>

  <li class='team-modal__list__item'>
    <picture>
      <source srcset='${valeraDesk}' media='(min-width:1024px)' />
      <source srcset='${valeraTab}' media='(min-width:768px)' />
      <source srcset='${valeraMob}' media='(min-width:320px)' />
      <img src='${valeraMob}' alt='valerii-vitenko' class='team-modal__img' />

    </picture>
    <div class='team-modal__list--side-info'>
      <p class='team-modal__role-title'>team lead</p>
      <h2 class='team-modal__name'>Valerii Vitenko</h2>
      <p class='team-modal__quote'>“Guns for show, knives for a pro.”</p>
      <a href='https://www.linkedin.com/in/leroviten/' target='_blank' class='team-modal__soc-link link'><svg
          class='team-modal__icon'
          width='35'
          height='35'
        >
          <use href='${svgUrl}#icon-linkedin'></use></svg></a>
      <a href='https://github.com/LeroViten' target='_blank' class='team-modal__soc-link link'>
        <svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-github'></use></svg></a>
    </div>
  </li>

  <li class='team-modal__list__item'>
    <picture>
      <source srcset='${annaSDesk}' media='(min-width:1024px)' />
      <source srcset='${annaSTab}' media='(min-width:768px)' />
      <source srcset='${annaSMob}' media='(min-width:320px)' />
      <img src='${annaSMob}' alt='anna-savchuck' class='team-modal__img' />
    </picture>

    <div class='team-modal__list--side-info'>
      <p class='team-modal__role-title'>developer</p>
      <h2 class='team-modal__name'>Anna Savchuk</h2>
      <p class='team-modal__quote'>
        “All right, son: roll them guns up, count the money, and put your seat belt on.”
      </p>
      <a
        href='https://www.linkedin.com/in/anna-savchuk-b1759221b/' target='_blank'
        class='team-modal__soc-link link'
      ><svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-linkedin'></use></svg></a>
      <a href='https://github.com/nensi-n' target='_blank' class='team-modal__soc-link link'>
        <svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-github'></use></svg></a>
    </div>
  </li>

  <li class='team-modal__list__item'>
    <picture>
      <source srcset='${annaPDesk}' media='(min-width:1024px)' />
      <source srcset='${annaPTab}' media='(min-width:768px)' />
      <source srcset='${annaPMob}' media='(min-width:320px)' />
      <img src='${annaPMob}' alt='anna-pavlova' class='team-modal__img' />
    </picture>

    <div class='team-modal__list--side-info'>
      <p class='team-modal__role-title'>developer</p>
      <h2 class='team-modal__name'>Anna Pavlova</h2>
      <p class='team-modal__quote'>“It’s been emotional”</p>
      <a href='https://www.linkedin.com/in/anna-pavlova-80b88321b/' target='_blank' class='team-modal__soc-link link'><svg
          class='team-modal__icon'
          width='35'
          height='35'
        >
          <use href='${svgUrl}#icon-linkedin'></use></svg></a>
      <a href='https://github.com/HPavlova' target='_blank' class='team-modal__soc-link link'>
        <svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-github'></use></svg></a>
    </div>
  </li>

  <li class='team-modal__list__item'>
    <picture>
      <source srcset='${serDesk}' media='(min-width:1024px)' />
      <source srcset='${serTab}' media='(min-width:768px)' />
      <source srcset='${serMob}' media='(min-width:320px)' />
      <img
        src='${serMob}'
        alt='serhii-nechytailenko'
        class='team-modal__img'
      />
    </picture>

    <div class='team-modal__list--side-info'>
      <p class='team-modal__role-title'>developer</p>
      <h2 class='team-modal__name'>Serhii Nechytailenko</h2>
      <p class='team-modal__quote'>“You're not funny, Valera.”</p>
      <a
        href='https://www.linkedin.com/in/%D1%81%D0%B5%D1%80%D0%B3%D0%B5%D0%B9-%D0%BD%D0%B5%D1%87%D0%B8%D1%82%D0%B0%D0%B9%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE-0ab499215/'
        target='_blank' class='team-modal__soc-link link'
      ><svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-linkedin'></use></svg></a>
      <a href='https://github.com/serjneo' target='_blank' class='team-modal__soc-link link'>
        <svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-github'></use></svg></a>
    </div>
  </li>

  <li class='team-modal__list__item'>
    <picture>
      <source srcset='${alexBDesk}' media='(min-width:1024px)' />
      <source srcset='${alexBTab}' media='(min-width:768px)' />
      <source srcset='${alexBMob}' media='(min-width:320px)' />
      <img src='${alexBMob}' alt='alexander-baran' class='team-modal__img' />
    </picture>

    <div class='team-modal__list--side-info'>
      <p class='team-modal__role-title'>developer</p>
      <h2 class='team-modal__name'>Alexander Baran</h2>
      <p class='team-modal__quote'>“If you hold back anything, I'll kill ya.”</p>
      <a
        href='https://www.linkedin.com/in/alexander-baran-415091212/' target='_blank'
        class='team-modal__soc-link link'
      ><svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-linkedin'></use></svg></a>
      <a href='https://github.com/lidanko12' target='_blank' class='team-modal__soc-link link'>
        <svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-github'></use></svg></a>
    </div>
  </li>

  <li class='team-modal__list__item'>
    <picture>
      <source srcset='${romaDesk}' media='(min-width:1024px)' />
      <source srcset='${romaTab}' media='(min-width:768px)' />
      <source srcset='${romaMob}' media='(min-width:320px)' />
      <img src='${romaMob}' alt='roma-leshenko' class='team-modal__img' />
    </picture>

    <div class='team-modal__list--side-info'>
      <p class='team-modal__role-title'>developer</p>
      <h2 class='team-modal__name'>Roman Leshenko</h2>
      <p class='team-modal__quote'>“You're lucky you're still breathing”</p>
      <a
        href='https://www.linkedin.com/in/roman-leshchenko-467149220/' target='_blank'
        class='team-modal__soc-link link'
      ><svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-linkedin'></use></svg></a>
      <a href='https://github.com/xetyri' target='_blank' class='team-modal__soc-link link'>
        <svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-github'></use></svg></a>
    </div>
  </li>

  <li class='team-modal__list__item'>
    <picture class='team-modal__img'>
      <source srcset='${juliaDesk}' media='(min-width:1024px)' />
      <source srcset='${juliaTab}' media='(min-width:768px)' />
      <source srcset='${juliaMob}' media='(min-width:320px)' />
      <img
        src='${juliaMob}'
        alt='julia-okhrimenko'
        class='team-modal__img'
      />
    </picture>

    <div class='team-modal__list--side-info'>
      <p class='team-modal__role-title'>developer</p>
      <h2 class='team-modal__name'>Julia Okhrimenko</h2>
      <p class='team-modal__quote'>
        “If the milk turns out to be sour, I ain't the kinda pussy to drink it.”
      </p>
      <a
        href='https://www.linkedin.com/in/julia-ohrimenko-97281515b/' target='_blank'
        class='team-modal__soc-link link'
      ><svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-linkedin'></use></svg></a>
      <a href='https://github.com/juliedevdes' target='_blank' class='team-modal__soc-link link'>
        <svg class='team-modal__icon' width='35' height='35'>
          <use href='${svgUrl}#icon-github'></use></svg></a>
    </div>
  </li>
</ul>
</div>`;
