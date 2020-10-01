import defaultGallery from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  jsLightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxContent: document.querySelector('.lightbox__content'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
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
refs.closeBtn.addEventListener('click', onCloseBtn);
refs.lightboxOverlay.addEventListener('click', onLightboxOverlay);

function onOpenModal(event) {
  refs.jsLightbox.classList.add('is-open');
  window.addEventListener('keydown', onEscKeyDown);
  if (event.target.nodeName !== 'IMG') {
    return;
  }
}

function onCloseBtn(event) {
  window.removeEventListener('keydown', onEscKeyDown);
  refs.jsLightbox.classList.remove('is-open');
}

function onLightboxOverlay(event) {
  if (event.currentTarget === event.target) {
    onCloseBtn();
  }
}

function onEscKeyDown(event) {
  onCloseBtn();
}
