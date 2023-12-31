'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
const images = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const slideBtnLeft = document.querySelector('.slider__btn--left');
const slideBtnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots')



const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(button => button.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (){
  section1.scrollIntoView({behavior: 'smooth'});
});

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e){
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  });
});



tabContainer.addEventListener('click', function (e){
  const clicked = e.target.closest('.operations__tab');
  if (clicked) {
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(t => t.classList.remove('operations__content--active'));
    clicked.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).
    classList.add('operations__content--active');
  }
});


const opacity = function (e, opacity){
  if (e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', e => opacity(e, 0.5));
nav.addEventListener('mouseout', e => opacity(e, 1));

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries){
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const revealSection = function (entries, observer){
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(function (section){
  // section.classList.add('section--hidden');
  // sectionObserver.observe(section);
});

const loadImg = function (entries, observer){
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

let curSlide = 0;
const maxSlides = slides.length;

images.forEach(img => imgObserver.observe(img));

const createDots = function (){
  slides.forEach(function (_, i){
    dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`);
  }
  );
};

createDots();

const activateDot = function (slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
const goToSlide = function (slide){
  activateDot(curSlide)
  slides.forEach(
      (s, i) => ( s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

const nextSlide = function (){
  curSlide === maxSlides - 1 ? curSlide = 0 : curSlide ++;
  goToSlide(curSlide);
};

const prevSlide = function (){
  curSlide === 0 ? curSlide = maxSlides - 1 : curSlide--;
  goToSlide(curSlide);
};

slideBtnRight.addEventListener('click', nextSlide);
slideBtnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e){
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e){
  if (e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    curSlide = Number(slide);
    goToSlide(slide);
  }
});