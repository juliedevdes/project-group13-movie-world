import * as basicLightbox from 'basiclightbox';

export default function onOpenModal(event) {
  const dataImgSource = event.target.dataset.src;
  console.log(dataImgSource);

  if ((event.classList = modalOpen)) {
    return;
  }

  const instance = basicLightbox.create(
    `
  <div class="modal">
    <button class="modal__close-btn">
            <svg class="modal__close-icon" width="30" height="30">
                <use href="./sprite/sprite.svg#icon-close"></use>
            </svg>
        </button>
    <a>Close</a>
  </div>`,
    {
      onShow: instance => {
        instance.element().querySelector('a').onclick = instance.close;
      },
    },
  );
  instance.show();
}
