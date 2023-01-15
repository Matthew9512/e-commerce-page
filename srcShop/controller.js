import * as model from './model.js';
import { cartItemsAmount, productAmount, removeCartItem, totalPrice } from './modelShoppingCart.js';
import { renderSaleInfo } from './views/renderSaleInfo.js';
import { renderShoppingCart } from './views/renderShoppingCart.js';

const cart = document.querySelector('.cart');
const shopProducts = document.querySelector('.shop__products');
// const btnShoppingCartAmount = document.querySelector('.btn-shopping-cart-amount');
const cartWrapper = document.querySelector('.cart__wrapper');
const input = document.querySelector('#inp__sort');

// btns
const btnShoppingCart = document.querySelector('.btn-shopping-cart');
const cartBtnClose = document.querySelector('.cart__btn-close');

// display sale timer
export const saleTimer = function () {
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

  const deadline = new Date(futureYear, futureMonth, futureDay + 0, 22, 44, 59);
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
    message.textContent = `End of giveaway`;
    days.innerHTML = `00`;
    hours.innerHTML = `00`;
    minutes.innerHTML = `00`;
    seconds.innerHTML = `00`;
    // update UI by removing sale info
    removeSaleInfo();
  }
};

const timer = setInterval(saleTimer, 1000);
// saleTimer();

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

// // display number of items on shopping cart
// export const cartItemsAmount = function () {
//   const lsItems = model.getLS();

//   const items = lsItems.reduce((acc, value) => {
//     return acc + value.amount;
//   }, 0);
//   btnShoppingCartAmount.textContent = items;
// };

// // remove product from cart
// export const removeCartItem = function (e) {
//   const click = e.target;
//   const parent = click.closest('.cart__wrapper');
//   const target = click.closest('.cart__wrapper-item');
//   // id of deleted cart item
//   const id = parseFloat(target.dataset.id);

//   if (!click.classList.contains('fa-trash')) return;
//   parent.removeChild(target);

//   // change shop product btn name
//   changeProductBtnText(id);

//   model.updateLS(target);
//   // sum price of all products in cart
//   model.totalPrice();
//   // number of items in cart
//   cartItemsAmount();
// };

// change products btn text after removing item from cart
export const changeProductBtnText = function (id) {
  const shopProductsItem = [...document.querySelectorAll('.shop__products-item')];

  const item = shopProductsItem.find((value) => value.dataset.id == id);
  item.querySelector('.shop__products-btn').textContent = `Add to cart`;
};

// // remove product from cart and localStorage after removing product from shop
// export const removeProductFromCart = function (click) {
//   const parentID = click.parentElement.dataset.id;
//   const lsArr = model.getLS();

//   const lsItems = lsArr.filter((value) => value.id != parentID);

//   lsArr.push(lsItems);
//   localStorage.setItem('shopping-cart', JSON.stringify(lsItems));

//   // update number of items in shopping cart icon
//   cartItemsAmount();
//   // update shopping cart list
//   renderShoppingCart();
//   // sum price of all products in cart
//   model.totalPrice();
// };

// ====== new
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
    console.log(category);
    if (category.includes(inputValue)) product.classList.remove('sorted');
    else product.classList.add('sorted');
  }
};

export const activeSale = function () {
  const products = document.querySelectorAll('.shop__products-item');

  const html = renderSaleInfo();

  // add sale info based on data-category
  for (const product of products) {
    // sale for specific category name
    if (product.dataset.category == model.state.saleCategory) {
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
  model.state.saleCategory = ' ';
  renderShoppingCart();
  totalPrice();
};

//
const init = async function () {
  cartItemsAmount();
  // fetch products
  await model.getProductsList();
  // activate the sale timer
  saleTimer();
  // render shopping cart
  renderShoppingCart();
  // sum price of all products in cart
  // model.totalPrice();
  totalPrice();
  //
  model.properBtnText();
  //
  activeSale();
};
init();

// addEventListeners
btnShoppingCart.addEventListener('click', openCart);
cartBtnClose.addEventListener('click', closeCart);
shopProducts.addEventListener('click', model.takeProductsData);
cartWrapper.addEventListener('click', removeCartItem);
cartWrapper.addEventListener('click', productAmount);
input.addEventListener('input', _debounce(sort));
