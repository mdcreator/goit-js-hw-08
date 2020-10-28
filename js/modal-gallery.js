import defaultGallery from './gallery-items.js';

const images = document.querySelectorAll('#gallery');
const refs = {
  gallery: document.querySelector('.js-gallery'),
  jsLightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  prevBtn: document.querySelector('[data-action="prev-lightbox"]'),
  nextBtn: document.querySelector('[data-action="next-lightbox"]'),
};

const galleryMarkup = createGalleryItems(defaultGallery);
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);
function createGalleryItems(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-id="gallery"/></a>
  </li>`;
    })
    .join('');
}

// refs.gallery.addEventListener('click', onGalleryClick);

// function onGalleryClick(event) {
//   console.log(event.target);
//   if (!event.target.classList.gallery('lightbox__image')) {
//     return;
//   }
//   //   // console.log(event.target.dataset.sourse);
// }

refs.gallery.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();
  refs.jsLightbox.classList.add('is-open');
  refs.lightboxImage.setAttribute('src', event.target.dataset.source);
  refs.lightboxImage.setAttribute('data-id', event.target.dataset.id);
  // setActiveImage(index);

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeysPress);

  // refs.prevBtn.addEventListener('click', onArrowPrevBtnClick);
  // refs.nextBtn.addEventListener('click', onArrowNextBtnClick);
}

refs.closeBtn.addEventListener('click', onCloseBtn);
function onCloseBtn() {
  refs.jsLightbox.classList.remove('is-open');
  refs.lightboxImage.removeAttribute('src');

  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeysPress);
}

refs.lightboxOverlay.addEventListener('click', onLightboxOverlay);
function onLightboxOverlay(event) {
  if (event.currentTarget === event.target) {
    onCloseBtn();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  if (event.code === ESC_KEY_CODE) {
    onCloseBtn();
  }
}

refs.jsLightbox.insertAdjacentHTML(
  'beforeend',
  `<button
    type="button"
    class="lightbox__prev"
    data-action="prev-lightbox"
  ></button>`,
);

refs.jsLightbox.insertAdjacentHTML(
  'beforeend',
  `<button
    type="button"
    class="lightbox__next"
    data-action="next-lightbox"
  ></button>`,
);

function onArrowKeysPress(event) {
  console.log(event);
  const PREV_KEY_CODE = 'ArrowLeft';
  const NEXT_KEY_CODE = 'ArrowRight';

  if (event.code === PREV_KEY_CODE) {
    onArrowLeftImage();
  }

  if (event.code === NEXT_KEY_CODE) {
    onArrowRightImage();
  }
}

// refs.prevBtn.addEventListener('click', onArrowPrevBtnClick);
function onArrowPrevBtnClick(event) {
  console.log(event);
  const prevBtnClick = refs.prevBtn;
  if (event.target === prevBtnClick) {
    onArrowLeftImage();
  }
}

// refs.nextBtn.addEventListener('click', onArrowNextBtnClick);
function onArrowNextBtnClick(event) {
  console.log(event);
  const nextBtnClick = refs.nextBtn;
  if (event.target === nextBtnClick) {
    onArrowRightImage();
  }
}

let index = 0;
// setActiveImage(index);

function onArrowLeftImage() {
  // goToSlide(currentSlide + 1);
  // for (let i = 0; i < images.length - 1; i -= 1) {
  //   if (refs.lightboxImage.src === images[i].dataset.source) {
  //     refs.lightboxImage.src = images[i - 1].dataset.source;
  //   }
  // }
  // images[i];
  if (index - 1 < 0) {
    return;
  }
  index -= 1;
  refs.lightboxImage.setAttribute('src', gallery[index].dataset.source);
  // setActiveImage(index);
}

function onArrowRightImage() {
  // goToSlide(currentSlide + 1);

  // for (let i = 0; i < images.length - 1; i += 1) {
  // images[i];

  if (index + 1 >= images.length) {
    return;
  }

  index += 1;
  refs.lightboxImage.setAttribute('src', gallery[index].dataset.source);
}
