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
const elements = defaultGallery.map(img => {
  const createGalleryItems = document.createElement('li');

  createGalleryItems.insertAdjacentHTML(
    'afterbegin',
    `
  <img src="${img.preview}" data-source="${img.original}" alt="${img.description}">`,
  );
  return createGalleryItems;
});

refs.gallery.append(...elements);
refs.gallery.insertAdjacentHTML('afterbegin', createGalleryItems);

// < --- method 2 -- ->

// const galleryMarkup = createGalleryItems(defaultGallery);
// refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);
// function createGalleryItems(images) {
//   return images
//     .map(({ preview, original, description }) => {
//       return `
//       <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}" /></a>
//   </li>`;
//     })
//     .join('');
// }
