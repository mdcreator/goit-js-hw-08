import defaultGallery from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  jsLightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxContent: document.querySelector('.lightbox__content'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
};

// const galleryItems = document.createElement('li');
// item.classList.add('gallery-item');
// galleryItems.insertAdjacentHTML(
//   'afterbegin',
//   `<img src="${img.url}" alt="${img.alt}">`,
// );

// refs.gallery = document.querySelector("#js-gallery");

// gallery.insertBefore;

// const galleryItems = document.createElement('li');
// galleryItems.insertAdjacentHTML(
//   'beforeend',
//   `<img src="${img.url}" alt="${img.alt}">`,
// );

const elements = defaultGallery.map(img => {
  const galleryItems = document.createElement('li');
  galleryItems.insertAdjacentHTML(
    'afterbegin',
    `<img src="${img.preview}" data-source="${img.original}" alt="${img.description}">`,
  );
  return galleryItems;
});

refs.gallery.append(...elements);
refs.gallery.insertAdjacentHTML('afterbegin', galleryItems);
