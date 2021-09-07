import * as basicLightbox from 'basiclightbox';
import { modalTeamOpen } from './refs';

modalTeamOpen.addEventListener('click', onOpenModalTeam);

function onOpenModalTeam(event) {
  // console.log(event);
  const instance = basicLightbox.create(
    `<div class="modal">
     <button class="modal__close-btn">
      <svg class="modal__close-icon" width="30" height="30">

        <use href="./images/sprite.svg#icon-close-modal"></use>

      </svg>
    </button>
    
    </div>`,
    {
      onShow: instance => {
        instance.element().querySelector('svg').onclick = instance.close;
      },
    },
  );

  instance.show();

  window.addEventListener('keydown', closeModalHand);

  function closeModalHand(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModalHand);
    }
  }
}
