import { getProductsList, takeProductsData, getLS, updateLS, productAmount, totalPrice, checkLS } from './model.js';
import { renderShoppingCart } from './views/renderShoppingCart.js';

const cart = document.querySelector('.cart');
const shopProducts = document.querySelector('.shop__products');
const btnShoppingCartAmount = document.querySelector('.btn-shopping-cart-amount');
const cartWrapper = document.querySelector('.cart__wrapper');

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
  // const lsLength = lsItems.length;
  // btnShoppingCartAmount.textContent = `${lsLength}`;
  const items = lsItems.reduce((acc, value) => {
    return acc + value.amount;
  }, 0);
  btnShoppingCartAmount.textContent = items;
};

// removeCartItem
export const removeCartItem = function (e) {
  const click = e.target;
  const parent = click.closest('.cart__wrapper');
  const target = click.closest('.cart__wrapper-item');

  if (!click.classList.contains('fa-trash')) return;
  parent.removeChild(target);

  updateLS(target);
  // sum price of all products in cart
  totalPrice();
  // number of items in cart
  cartItemsAmount();
};

//
const init = async function () {
  cartItemsAmount();
  // fetch products
  await getProductsList();
  // render shopping cart
  renderShoppingCart();
  // sum price of all products in cart
  totalPrice();
  //
  checkLS();
};
init();

// addEventListeners
btnShoppingCart.addEventListener('click', openCart);
cartBtnClose.addEventListener('click', closeCart);
shopProducts.addEventListener('click', takeProductsData);
cartWrapper.addEventListener('click', removeCartItem);
cartWrapper.addEventListener('click', productAmount);
