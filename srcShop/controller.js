import * as model from './model.js';
import { cartItemsAmount, productAmount, removeCartItem } from './modelShoppingCart.js';
import { renderSaleInfo } from './views/renderSaleInfo.js';
import { renderShoppingCart } from './views/renderShoppingCart.js';

const cart = document.querySelector('.cart');
const shopProducts = document.querySelector('.shop__products');
const cartWrapper = document.querySelector('.cart__wrapper');
const input = document.querySelector('#inp__sort');
const header = document.querySelector('.header');
const sale = document.querySelector('.sale');

// btns
const btnShoppingCart = document.querySelector('.btn-shopping-cart');
const cartBtnClose = document.querySelector('.cart__btn-close');

// display sale timer
export const saleTimer = function () {
  const days = document.querySelector('.sale__days');
  const hours = document.querySelector('.sale__hours');
  const minutes = document.querySelector('.sale__minutes');
  const seconds = document.querySelector('.sale__seconds');

  // getting dealine time
  const futureDate = new Date();
  const futureYear = futureDate.getFullYear();
  const futureMonth = futureDate.getMonth();
  const futureDay = futureDate.getDate();

  const deadline = new Date(futureYear, futureMonth, futureDay + 0, 22, 52, 59);
  // const deadline = new Date(futureYear, futureMonth, futureDay + 10, 23, 59, 59);
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
    // remove sale timer
    header.removeChild(sale);
    // update UI by removing sale info
    removeSaleInfo();
  }
};

const timer = setInterval(saleTimer, 1000);

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
  const inputValue = input.value;
  const products = document.querySelectorAll('.shop__products-item');

  for (const product of products) {
    const category = product.dataset.category;
    if (category.includes(inputValue)) product.classList.remove('sorted');
    else product.classList.add('sorted');
  }
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

  for (const product of products) {
    const child = product.firstElementChild;
    if (product.firstElementChild.classList.contains('sale__active')) {
      product.removeChild(child);
      product.querySelector('.normal-price').classList.remove('hidden');
      product.querySelector('.sale-price').classList.add('hidden');
    }
  }
  model.state.saleCategory = ' ';
  renderShoppingCart();
};

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
btnShoppingCart.addEventListener('click', openCart);
cartBtnClose.addEventListener('click', closeCart);
shopProducts.addEventListener('click', model.takeProductsData);
cartWrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('fa-trash')) removeCartItem(e);
  else productAmount(e);
});
// cartWrapper.addEventListener('click', removeCartItem);
// cartWrapper.addEventListener('click', productAmount);
input.addEventListener('input', _debounce(sort));
