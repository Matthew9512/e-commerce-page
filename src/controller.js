import * as model from './model.js';

const cart = document.querySelector('.cart');

// btns
const btnShoppingCart = document.querySelector('.btn-shopping-cart');
const cartBtnClose = document.querySelector('.cart__btn-close');

// model.getShopItems();

const saleTimer = function () {
  const days = document.querySelector('.sale__days');
  const hours = document.querySelector('.sale__hours');
  const minutes = document.querySelector('.sale__minutes');
  const seconds = document.querySelector('.sale__seconds');
  const message = document.querySelector('.sale__message');

  // getting dealine time
  const futureDate = new Date();
  const futureYear = futureDate.getFullYear();
  const futureMonth = futureDate.getMonth();
  const futureDay = futureDate.getDate();

  // const deadline = new Date(;
  const deadline = new Date(futureYear, futureMonth, futureDay + 10, 23, 59, 59);
  const deadlineDay = deadline.getDate();
  const deadlineHour = deadline.getHours();
  const deadlineMinutes = deadline.getMinutes();
  const deadlineSeconds = deadline.getSeconds();

  // getting actual time
  const actualDate = new Date();
  const actualDay = actualDate.getDate();
  const actualHour = actualDate.getHours();
  const actualMinutes = actualDate.getMinutes();
  const actualSeconds = actualDate.getSeconds();

  // calculating how much time left till the end
  const finalDay = deadlineDay - actualDay;
  const finalHour = deadlineHour - actualHour;
  const finalMinutes = deadlineMinutes - actualMinutes;
  const finalSeconds = deadlineSeconds - actualSeconds;

  finalDay < 10 ? (days.innerHTML = `0${finalDay}days,`) : (days.innerHTML = `${finalDay}days,`);
  finalHour < 10 ? (hours.innerHTML = `0${finalHour}h`) : (hours.innerHTML = `${finalHour}h`);
  finalMinutes < 10 ? (minutes.innerHTML = `0${finalMinutes}m`) : (minutes.innerHTML = `${finalMinutes}m`);
  finalSeconds < 10 ? (seconds.innerHTML = `0${finalSeconds}s`) : (seconds.innerHTML = `${finalSeconds}s`);

  if (actualDate > deadline) {
    clearInterval(timer);
    message.textContent = `End of giveaway`;
    days.innerHTML = `00`;
    hours.innerHTML = `00`;
    minutes.innerHTML = `00`;
    seconds.innerHTML = `00`;
  }
};

// const timer = setInterval(saleTimer, 1000);
// saleTimer();

const carouselWrapper = document.querySelector('.carousel__wrapper');
const carouselItems = document.querySelectorAll('.carousel__item');
const carouselBtnsLeft = document.querySelector('.carousel__btns-left');
const carouselBtnsRight = document.querySelector('.carousel__btns-right');

let currentItem = 0;
// lenght of carousel items
const carouselItemsLength = carouselItems.length;

// // move carousel
const carousel = (currentItem) => {
  carouselItems.forEach((item, index) => {
    item.style.transform = `translateX(${100 * (index - currentItem)}%)`;
  });
};

// move carousel to the right side
const moveRight = () => {
  if (currentItem === carouselItemsLength - 1) {
    currentItem++;
    currentItem = 0;
  } else currentItem++;
  carousel(currentItem);
};

// move carousel to the left side
const moveLeft = () => {
  if (currentItem === 0) {
    currentItem--;
    currentItem = carouselItemsLength - 1;
  } else currentItem--;
  carousel(currentItem);
};

// automatically move carousel
// setInterval(() => {
//   moveRight();
// }, 3000);

// show cart
const openCart = function () {
  console.log(`openCart`);
  cart.classList.remove('hide');
  cart.classList.add('show');
};
// close cart
const closeCart = function () {
  console.log(`closeCart`);
  cart.classList.remove('show');
  cart.classList.add('hide');
};

carouselBtnsLeft.addEventListener('click', moveLeft);
carouselBtnsRight.addEventListener('click', moveRight);
btnShoppingCart.addEventListener('click', openCart);
cartBtnClose.addEventListener('click', closeCart);
