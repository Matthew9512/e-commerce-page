// import { getProductsList, takeProductsData, getLS, updateLS, productAmount, totalPrice, properBtnText } from './model.js';
import * as model from './model.js';
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
  const lsItems = model.getLS();

  const items = lsItems.reduce((acc, value) => {
    return acc + value.amount;
  }, 0);
  btnShoppingCartAmount.textContent = items;
};

// remove product from cart
export const removeCartItem = function (e) {
  const click = e.target;
  const parent = click.closest('.cart__wrapper');
  const target = click.closest('.cart__wrapper-item');
  // id of deleted cart item
  const id = parseFloat(target.dataset.id);

  if (!click.classList.contains('fa-trash')) return;
  parent.removeChild(target);

  // change shop product btn name
  changeProductBtnText(id);

  model.updateLS(target);
  // sum price of all products in cart
  model.totalPrice();
  // number of items in cart
  cartItemsAmount();
};

// change products btn text after removing item from cart
export const changeProductBtnText = function (id) {
  const shopProductsItem = [...document.querySelectorAll('.shop__products-item')];

  const item = shopProductsItem.find((value) => value.dataset.id == id);
  item.querySelector('.shop__products-btn').textContent = `Add to cart`;
};

// remove product from cart and localStorage after removing product from shop
export const removeProductFromCart = function (click) {
  const parentID = click.parentElement.dataset.id;
  const lsArr = model.getLS();

  const lsItems = lsArr.filter((value) => value.id != parentID);

  lsArr.push(lsItems);
  localStorage.setItem('shopping-cart', JSON.stringify(lsItems));

  // update number of items in shopping cart icon
  cartItemsAmount();
  // update shopping cart list
  renderShoppingCart();
  // sum price of all products in cart
  model.totalPrice();
};

// ====== new

export const _debounce = function (fn, deley = 300) {
  let id;
  return (...args) => {
    if (id) clearInterval(id);
    id = setTimeout(() => {
      fn(...args);
    }, deley);
  };
};

const input = document.querySelector('#inp__sort');
const btnSort = document.querySelector('#btn__sort');

const sort = function () {
  const inputValue = input.value;
  const products = [...document.querySelectorAll('.shop__products-item')];

  for (const product of products) {
    const category = product.dataset.category;
    console.log(category);
    if (category.includes(inputValue)) {
      console.log(category);
      console.log(inputValue);
      product.classList.remove('sorted');
    } else product.classList.add('sorted');
    // const sortedProducts = products.find((value) => value.dataset.category != inputValue);
  }

  console.log(products);
  console.log(inputValue);
};
// ====== new
//
const init = async function () {
  cartItemsAmount();
  // fetch products
  await model.getProductsList();
  // render shopping cart
  renderShoppingCart();
  // sum price of all products in cart
  model.totalPrice();
  //
  model.properBtnText();
  //
};
init();

// addEventListeners
btnShoppingCart.addEventListener('click', openCart);
cartBtnClose.addEventListener('click', closeCart);
shopProducts.addEventListener('click', model.takeProductsData);
cartWrapper.addEventListener('click', removeCartItem);
cartWrapper.addEventListener('click', model.productAmount);
// ====== new
input.addEventListener('input', _debounce(sort));
// ====== new
