import { cartItemsAmount } from './controller.js';
import { renderProducts } from './views/renderProducts.js';
import { renderShoppingCart } from './views/renderShoppingCart.js';

// global data obj
export const state = {
  productList: [],
};

// fetch product list
export const getProductsList = async function () {
  const respond = await fetch('../data.json');
  const data = await respond.json();
  destructuring(data);
  // console.log(data);
};

// destructuring fetched data
const destructuring = function (data) {
  const productItems = data.menu.map((item) => {
    const { category, description, img, price, title, id } = item;
    return { category, description, img, price, title, id };
  });

  state.productList = productItems;

  renderProducts();
};

//
export const takeProductsData = function (e) {
  const click = e.target;
  const productItem = click.closest('.shop__products-item');

  if (!click.classList.contains('shop__products-btn')) return;

  // find clicked product in arr of fetched products and return this items data
  const productData = state.productList.find((value) => value.id === Number(productItem.dataset.id));

  // add clicked product to ls
  addItemLS(productData);
};

// ===== localStorage ===== //
// get localStorage
export const getLS = function () {
  const lsItems = localStorage.getItem('shopping-cart') ? JSON.parse(localStorage.getItem('shopping-cart')) : [];
  return lsItems;
};

// addItem localStorage
const addItemLS = function (productData) {
  const lsItems = getLS();

  // clicked product data
  const lsObj = {
    category: productData.category,
    description: productData.description,
    id: productData.id,
    img: productData.img,
    price: productData.price,
    increasedPrice: productData.price,
    amount: 1,
    title: productData.title,
  };
  console.log(lsObj);

  lsItems.push(lsObj);
  localStorage.setItem('shopping-cart', JSON.stringify(lsItems));

  // update number of items in shopping cart icon
  cartItemsAmount();
  // update shopping cart list
  renderShoppingCart();
  // sum price of all products in cart
  totalPrice();
};

// update LS items
export const updateLS = function (target) {
  const lsItems = getLS();

  // return items with id different than current targets id
  const update = lsItems.filter((item) => item.id !== Number(target.dataset.id));

  // add to ls
  localStorage.setItem('shopping-cart', JSON.stringify(update));
};

// ===== shopping cart ===== //
// new
export const productAmount = function (e) {
  const click = e.target;
  const parent = click.closest('.cart__wrapper-item');
  let itemAmount = parent.querySelector('.item-amount');
  let cartProductInfoPrice = parent.querySelector('.cart__product-info-price');

  const lsArr = getLS();

  if (click.classList.contains('fa-chevron-up')) {
    const currentItem = lsArr.find((value) => value.id === parseFloat(parent.dataset.id));
    increaseCartItemValue(itemAmount, cartProductInfoPrice, currentItem, lsArr);
  }

  if (click.classList.contains('fa-chevron-down')) {
    // stop if amount current item = 1(string)
    if (itemAmount.textContent === '1') return;
    const currentItem = lsArr.find((value) => value.id === parseFloat(parent.dataset.id));
    decreaseCartItemValue(itemAmount, cartProductInfoPrice, currentItem, lsArr);
  }
};

// increase and update cart items values
const increaseCartItemValue = function (itemAmount, cartProductInfoPrice, currentItem, lsArr) {
  // current items data
  const lsItemPrice = currentItem.price;
  let lsItemAmount = currentItem.amount;
  let increasedPrice = currentItem.increasedPrice;
  // === amount of items
  // increase amount of items
  lsItemAmount++;
  // update amount of items
  itemAmount.textContent = lsItemAmount;
  // override amount of items
  currentItem.amount = lsItemAmount;
  // === price of item
  // calc new price
  const updatedPrice = lsItemPrice * lsItemAmount;
  // update price of item
  cartProductInfoPrice.textContent = updatedPrice.toFixed(2) + '$';
  // override price of item
  currentItem.increasedPrice = updatedPrice;
  console.log(updatedPrice);
  // add to ls
  localStorage.setItem('shopping-cart', JSON.stringify(lsArr));
  console.log(`lsItemPrice`, '=>', lsItemPrice);
  console.log(`increasedPrice`, '=>', increasedPrice);

  totalPrice();
  // console.log(lsItemAmount);
  // console.log(currentItem);
};

const decreaseCartItemValue = function (itemAmount, cartProductInfoPrice, currentItem, lsArr) {
  // current items data
  const lsItemPrice = currentItem.price;
  let lsItemAmount = currentItem.amount;
  let increasedPrice = currentItem.increasedPrice;
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
  // override price of item
  currentItem.increasedPrice = updatedPrice;
  console.log(updatedPrice);
  // add to ls
  localStorage.setItem('shopping-cart', JSON.stringify(lsArr));
  console.log(`lsItemPrice`, '=>', lsItemPrice);
  console.log(`increasedPrice`, '=>', increasedPrice);

  totalPrice();
  // console.log(lsItemAmount);
  // console.log(currentItem);
};
// new

// sum price of all products in cart
export const totalPrice = function () {
  const cartSumNumber = document.querySelector('.cart__sum-number');
  const lsArr = getLS();
  const sum = lsArr.reduce((acc, value) => {
    return acc + value.increasedPrice;
  }, 0);
  cartSumNumber.textContent = parseFloat(`${sum}`).toFixed(2) + '$';
  console.log(sum);
};
totalPrice();
