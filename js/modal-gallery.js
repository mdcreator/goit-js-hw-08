import defaultGallery from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  jsLightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  prevBtn: document.querySelector('[data-action="prev-lightbox"]'),
  nextBtn: document.querySelector('[data-action="next-lightbox"]'),
};

// < --- method 1 -- ->
// const elements = defaultGallery.map(img => {
//   const createGalleryItems = document.createElement('li');

//   createGalleryItems.insertAdjacentHTML(
//     'afterbegin',
//     `<img src="${img.preview}" data-source="${img.original}" alt="${img.description}"></a>
//   </li>`,
//   );
//   return createGalleryItems;
// });

// refs.gallery.append(...elements);
// refs.gallery.insertAdjacentHTML('afterbegin', createGalleryItems);

// < --- method 2 -- ->

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
      alt="${description}" /></a>
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

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onKeysPress);
}

refs.closeBtn.addEventListener('click', onCloseBtn);
function onCloseBtn() {
  refs.jsLightbox.classList.remove('is-open');
  refs.lightboxImage.removeAttribute('src');

  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onKeysPress);
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

let index = 0;

setActiveImage(index);

refs.prevBtn.addEventListener('click', onPrevBtnClick);
refs.nextBtn.addEventListener('click', onNextBtnClick);

function onPrevBtnClick() {
  if (index - 1 < 0) {
    return;
  }

  index -= 1;
  setActiveImage(index);
}

function onNextBtnClick() {
  if (index + 1 >= images.length) {
    return;
  }

  index += 1;
  setActiveImage(index);
}

function setActiveImage(imageIdx) {
  const activeImage = images[imageIdx];
  refs.imageOutput.textContent = activeImage;
}
