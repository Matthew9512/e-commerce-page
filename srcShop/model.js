import { cartItemsAmount, removeProductFromCart } from './controller.js';
import { renderProducts } from './views/renderProducts.js';
import { renderShoppingCart } from './views/renderShoppingCart.js';

// global data obj
export const state = {
  productList: [],
};

// fetch product list
// // === fakeapi
// export const getProductsList = async function () {
//   const respond = await fetch('https://fakestoreapi.com/products');
//   const data = await respond.json();
//   console.log(data);
//   destructuring(data);
// };
// // === fakeapi
// === json
export const getProductsList = async function () {
  const respond = await fetch('../data.json');
  const data = await respond.json();
  destructuring(data);
  console.log(data);
};
// === json

// destructuring fetched data
const destructuring = function (data) {
  const productItems = data.menu.map((item) => {
    const { category, description, image, price, title, id } = item;
    return { category, description, image, price, title, id };
  });

  state.productList = productItems;

  renderProducts();
};

// take data from clicked product
export const takeProductsData = function (e) {
  const click = e.target;
  const productItem = click.closest('.shop__products-item');

  if (!click.classList.contains('shop__products-btn')) return;

  // find clicked product in arr of fetched products and return this items data
  const productData = state.productList.find((value) => value.id === Number(productItem.dataset.id));

  if (click.textContent === `Add to cart`) {
    click.textContent = `Remove from cart`;
    // add clicked product to ls
    addItemLS(productData);
  } else {
    click.textContent = `Add to cart`;
    removeProductFromCart(click);
  }
  // change btn text after click
};

// ===== localStorage ===== //
// get localStorage
export const getLS = function () {
  const lsItems = localStorage.getItem('shopping-cart') ? JSON.parse(localStorage.getItem('shopping-cart')) : [];
  return lsItems;
};

// add item to localStorage
const addItemLS = function (productData) {
  const lsItems = getLS();

  // push clicked product data to obj
  const lsObj = {
    id: productData.id,
    img: productData.img,
    price: productData.price,
    increasedPrice: productData.price,
    amount: 1,
    title: productData.title,
  };

  lsItems.push(lsObj);
  localStorage.setItem('shopping-cart', JSON.stringify(lsItems));

  // change btn text
  properBtnText();
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

// display proper btn text after page loads
export const properBtnText = function () {
  const shopProductsItem = document.querySelectorAll('.shop__products-item');
  const lsArr = getLS();

  for (const item of shopProductsItem) {
    // id of shop items
    const productID = parseFloat(item.dataset.id);
    // find in localStorage items with same id as shop items
    const lsID = lsArr.find((value) => value.id === productID);

    const target = item.querySelector('.shop__products-btn');
    const btnText = lsID ? `Remove from cart` : `Add to cart`;

    target.textContent = btnText;

    // if (lsID) item.querySelector('.shop__products-btn').textContent = `Remove from cart`;
    // else item.querySelector('.shop__products-btn').textContent = `Add to cart`;
  }
};

// ===== shopping cart ===== //
export const productAmount = function (e) {
  const click = e.target;
  const parent = click.closest('.cart__wrapper-item');
  let itemAmount = parent.querySelector('.item-amount');
  let cartProductInfoPrice = parent.querySelector('.cart__product-info-price');

  const lsArr = getLS();

  // increase amount of product
  if (click.classList.contains('fa-chevron-up')) {
    const currentItem = lsArr.find((value) => value.id === parseFloat(parent.dataset.id));
    increaseCartItemValue(itemAmount, cartProductInfoPrice, currentItem, lsArr);
  }

  // decrease amount of product
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
  // add to ls
  localStorage.setItem('shopping-cart', JSON.stringify(lsArr));
  // number of items in cart
  cartItemsAmount();
  // sum price of all products in cart
  totalPrice();
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
  // add to ls
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
    return acc + value.increasedPrice;
  }, 0);
  cartSumNumber.textContent = parseFloat(`${sum}`).toFixed(2) + '$';
};
