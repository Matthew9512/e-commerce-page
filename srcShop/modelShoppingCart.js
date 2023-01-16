import { getLS, properBtnText, updateLS } from './model.js';
import { renderShoppingCart } from './views/renderShoppingCart.js';

const btnShoppingCartAmount = document.querySelector('.btn-shopping-cart-amount');

// update amount of cart items
export const productAmount = function (e) {
  const click = e.target;
  console.log(click);
  const parent = click.closest('.cart__wrapper-item');
  let itemAmount = parent.querySelector('.item-amount');
  let cartProductInfoPrice = parent.querySelector('.cart__product-info-price');

  const lsArr = getLS();
  const currentItem = lsArr.find((value) => value.id === parseFloat(parent.dataset.id));

  // current items data
  const lsItemPrice = currentItem.price;
  let lsItemAmount = currentItem.amount;

  // increase amount of product
  if (click.classList.contains('fa-chevron-up')) {
    lsItemAmount++;
    // increaseCartItemValue(itemAmount, cartProductInfoPrice, currentItem, lsArr);
  }

  // decrease amount of product
  if (click.classList.contains('fa-chevron-down')) {
    // stop if amount current item = 1(string)
    if (itemAmount.textContent === '1') return;
    lsItemAmount--;
    // const currentItem = lsArr.find((value) => value.id === parseFloat(parent.dataset.id));
    // decreaseCartItemValue(itemAmount, cartProductInfoPrice, currentItem, lsArr);
  }
  // update amount of items
  itemAmount.textContent = lsItemAmount;
  // override amount of items
  currentItem.amount = lsItemAmount;

  // calc new price
  const updatedPrice = lsItemPrice * lsItemAmount;
  // update price of item
  cartProductInfoPrice.textContent = updatedPrice.toFixed(2) + '$';
  localStorage.setItem('shopping-cart', JSON.stringify(lsArr));
  // number of items in cart
  cartItemsAmount();
  // sum price of all products in cart
  totalPrice();
};

// increase and update cart items values
const increaseCartItemValue = function (itemAmount, cartProductInfoPrice, currentItem, lsArr) {
  // // current items data
  // const lsItemPrice = currentItem.price;
  // let lsItemAmount = currentItem.amount;
  // === amount of items
  // increase amount of items
  // lsItemAmount++;
  // // update amount of items
  // itemAmount.textContent = lsItemAmount;
  // // override amount of items
  // currentItem.amount = lsItemAmount;
  // // === price of item
  // // calc new price
  // const updatedPrice = lsItemPrice * lsItemAmount;
  // // update price of item
  // cartProductInfoPrice.textContent = updatedPrice.toFixed(2) + '$';
  // localStorage.setItem('shopping-cart', JSON.stringify(lsArr));
  // // number of items in cart
  // cartItemsAmount();
  // // sum price of all products in cart
  // totalPrice();
};

const decreaseCartItemValue = function (itemAmount, cartProductInfoPrice, currentItem, lsArr) {
  // current items data
  const lsItemPrice = currentItem.price;
  let lsItemAmount = currentItem.amount;

  // === amount of items
  // increase amount of items
  lsItemAmount--;
  // update amount of items
  itemAmount.textContent = lsItemAmount;
  // override amount of items
  currentItem.amount = lsItemAmount;

  // === price of item
  // calc new price
  const updatedPrice = lsItemPrice * lsItemAmount;
  // update price of item
  cartProductInfoPrice.textContent = updatedPrice.toFixed(2) + '$';
  localStorage.setItem('shopping-cart', JSON.stringify(lsArr));
  // number of items in cart
  cartItemsAmount();
  // sum price of all products in cart
  totalPrice();
};

// sum price of all products in cart
export const totalPrice = function () {
  const cartSumNumber = document.querySelector('.cart__sum-number');
  const lsArr = getLS();

  const sum = lsArr.reduce((acc, value) => {
    return acc + +value.price * value.amount;
  }, 0);
  cartSumNumber.textContent = parseFloat(`${sum}`).toFixed(2) + '$';
};

// display number of items in shopping cart
export const cartItemsAmount = function () {
  const lsItems = getLS();

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

  if (!click.classList.contains('fa-trash')) return;
  parent.removeChild(target);

  // changeProductBtnText(id);
  updateLS(target);
  // change shop product btn name
  properBtnText();
  // sum price of all products in cart
  totalPrice();
  // number of items in cart
  cartItemsAmount();
};

// remove product from cart and localStorage after removing product from shop
export const removeProductFromCart = function (click) {
  const parentID = click.parentElement.dataset.id;
  const lsArr = getLS();

  const lsItems = lsArr.filter((value) => value.id !== parseFloat(parentID));

  lsArr.push(lsItems);
  localStorage.setItem('shopping-cart', JSON.stringify(lsItems));

  // update number of items in shopping cart icon
  cartItemsAmount();
  // update shopping cart list
  renderShoppingCart();
};
