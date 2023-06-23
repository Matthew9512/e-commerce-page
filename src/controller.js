import * as model from './model.js';
import { cartItemsAmount, productAmount, removeCartItem } from './modelShoppingCart.js';
import { renderSaleInfo } from './views/renderSaleInfo.js';
import { renderShoppingCart } from './views/renderShoppingCart.js';

const cart = document.querySelector('.cart');
const shopProducts = document.querySelector('.shop__products');
const noProductsMsg = document.querySelector('.no-products-msg');

const cartWrapper = document.querySelector('.cart__wrapper');
const input = document.querySelector('#inp__sort');
const header = document.querySelector('.header');
const sale = document.querySelector('.sale');
const carouselItems = document.querySelectorAll('.carousel__item');
const carouselBtnsLeft = document.querySelector('.carousel__btns-left');
const carouselBtnsRight = document.querySelector('.carousel__btns-right');
const navbar = document.querySelector('.navbar');

// btns
const btnShoppingCart = document.querySelector('.btn-shopping-cart');
const cartBtnClose = document.querySelector('.cart__btn-close');
const btnClear = document.querySelector('.btn-clear');

let currentItem = 0;
const navbarHeight = navbar.getBoundingClientRect().height;

// display sale timer
export const saleTimer = function () {
   const days = document.querySelector('.sale__days');
   const hours = document.querySelector('.sale__hours');
   const minutes = document.querySelector('.sale__minutes');
   const seconds = document.querySelector('.sale__seconds');

   const actualDate = new Date();

   let futureYear = actualDate.getFullYear();
   let futureMonth = actualDate.getMonth();
   let futureDay = actualDate.getDate();

   const futureDate = new Date(futureYear, futureMonth, futureDay + 10, 23, 59, 59);

   const timeDifference = futureDate.getTime() - actualDate.getTime();
   let secondsDiff = Math.floor(timeDifference / 1000);
   let minutesDiff = Math.floor(secondsDiff / 60);
   let hoursDiff = Math.floor(minutesDiff / 60);
   let daysDiff = Math.floor(hoursDiff / 24);

   secondsDiff %= 60;
   minutesDiff %= 60;
   hoursDiff %= 24;

   days.innerHTML = `${daysDiff}days`;
   hours.innerHTML = `${hoursDiff}h`;
   minutes.innerHTML = `${minutesDiff}m`;
   seconds.innerHTML = `${secondsDiff}s`;

   if (timeDifference <= 0) {
      clearInterval(timer);
      // remove sale timer
      header.removeChild(sale);
      // update UI by removing sale info
      removeSaleInfo();
   }
};

const timer = setInterval(saleTimer, 1000);

// lenght of carousel items
const carouselItemsLength = carouselItems.length;

// move carousel
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
setInterval(() => {
   moveRight();
}, 3000);

// show cart
const openCart = function () {
   cart.classList.toggle('hide');
   cart.classList.toggle('show');
};
// close cart
const closeCart = function () {
   cart.classList.toggle('show');
   cart.classList.toggle('hide');
};

// deley function
export const _debounce = function (fn, deley = 300) {
   let id;
   return (...args) => {
      if (id) clearInterval(id);
      id = setTimeout(() => {
         fn(...args);
      }, deley);
   };
};

// search shop products
const sort = function () {
   noProductsMsg.classList.add('hidden');
   const inputValue = input.value;
   const products = document.querySelectorAll('.shop__products-item');

   for (const product of products) {
      const title = product.dataset.title;
      if (title.includes(inputValue)) product.classList.remove('sorted');
      else product.classList.add('sorted');
   }

   const test = [...products].every((value) => value.classList.contains('sorted'));
   if (test) noProductsMsg.classList.remove('hidden');
};

// update shop products with sale info
export const activeSale = function () {
   const products = document.querySelectorAll('.shop__products-item');

   // render template sale info
   const html = renderSaleInfo();

   // add sale info based on data-category
   for (const product of products) {
      if (product.dataset.category === model.state.saleCategory) {
         product.insertAdjacentHTML('afterbegin', html);
         product.querySelector('.normal-price').classList.add('hidden');
         product.querySelector('.sale-price').classList.remove('hidden');
      }
   }
};

// remove sale info after sale timer ends
const removeSaleInfo = function () {
   const products = document.querySelectorAll('.shop__products-item');
   const lsArr = model.getLS();

   for (const product of products) {
      const child = product.firstElementChild;
      if (product.firstElementChild.classList.contains('sale__active')) {
         product.removeChild(child);
         product.querySelector('.normal-price').classList.remove('hidden');
         product.querySelector('.sale-price').classList.add('hidden');
      }
   }
   for (const item of lsArr) {
      if (item.category.includes(model.state.saleCategory)) {
         const updatedPrice = parseFloat(item.price / (model.state.sale / 100));
         item.price = updatedPrice;
         localStorage.setItem('shopping-cart', JSON.stringify(lsArr));
      }
   }

   model.state.saleCategory = ' ';
   renderShoppingCart();
};

// intersectionobserver function
const stickyNavbar = function (entries) {
   for (const entry of entries) {
      if (!entry.isIntersecting) navbar.classList.add('sticky');
      else navbar.classList.remove('sticky');
   }
};
// intersectionobserver
const observer = new IntersectionObserver(stickyNavbar, {
   root: null,
   threshold: 0,
   rootMargin: `-${navbarHeight}px`,
});
observer.observe(header);

const init = async function () {
   cartItemsAmount();
   // render shopping cart
   renderShoppingCart();
   // fetch list of products
   await model.getProductsList();
   // activate the sale timer
   saleTimer();
   // display sale template on specific elements
   activeSale();
   // display proper btn text on shop products
   model.properBtnText();
};
init();

// addEventListeners
carouselBtnsLeft.addEventListener('click', moveLeft);
carouselBtnsRight.addEventListener('click', moveRight);
btnShoppingCart.addEventListener('click', openCart);
cartBtnClose.addEventListener('click', closeCart);
shopProducts.addEventListener('click', model.takeProductsData);
cartWrapper.addEventListener('click', (e) => {
   if (e.target.classList.contains('fa-trash')) removeCartItem(e);
   else if (e.target.classList.contains('fas')) productAmount(e);
});
btnClear.addEventListener('click', model.clearCart);
input.addEventListener('input', _debounce(sort));
