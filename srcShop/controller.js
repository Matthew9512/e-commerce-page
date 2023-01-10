import { getProductsList, getLS, takeProductsData } from './model.js';
import { renderShoppingCart } from './views/renderShoppingCart.js';

const cart = document.querySelector('.cart');
const shopProducts = document.querySelector('.shop__products');
const btnShoppingCartAmount = document.querySelector('.btn-shopping-cart-amount');

// btns
const btnShoppingCart = document.querySelector('.btn-shopping-cart');
const cartBtnClose = document.querySelector('.cart__btn-close');

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

// display number of items on shopping cart
export const cartItemsAmount = function () {
  const lsItems = getLS();
  const lsLength = lsItems.length;
  btnShoppingCartAmount.textContent = `${lsLength}`;
};

const init = function () {
  cartItemsAmount();
  // fetch products
  getProductsList();
  // render shopping cart
  renderShoppingCart();
};
init();

btnShoppingCart.addEventListener('click', openCart);
cartBtnClose.addEventListener('click', closeCart);
shopProducts.addEventListener('click', takeProductsData);
