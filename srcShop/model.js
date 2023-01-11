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
    title: productData.title,
  };
  console.log(lsObj);

  lsItems.push(lsObj);
  localStorage.setItem('shopping-cart', JSON.stringify(lsItems));

  // update number of items in shopping cart icon
  cartItemsAmount();
  // update shopping cart list
  renderShoppingCart();
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
let itemSumPrice = [];
//
export const productAmount = function (e) {
  const click = e.target;
  const parent = click.closest('.cart__wrapper-item');
  let itemAmount = parent.querySelector('.item-amount');
  let cartProductInfoPrice = parent.querySelector('.cart__product-info-price');

  let cartSumNumber = document.querySelector('.cart__sum-number');
  let cartProductInfo = document.querySelectorAll('.cart__product-info-price');
  // const arrowDown = parent.querySelector('.fa-chevron-down');
  cartSumNumber.innerHTML = '';

  const lsArr = getLS();
  const item = lsArr.find((value) => value.id === +parent.dataset.id);
  const price = item.price;

  // increment
  if (click.classList.contains('fa-chevron-up')) {
    itemAmount.textContent++;
    const h = (cartProductInfoPrice.textContent = price * itemAmount.textContent);
    console.log('plus');

    // cartSumNumber.innerHTML = `Total cost: ${h}$`;

    // itemSumPrice.push(h);
    // const sum = itemSumPrice.reduce((acc, value) => acc + value, 0);
    // console.log(itemSumPrice);
    // console.log(sum);
  }

  // decrement
  if (click.classList.contains('fa-chevron-down')) {
    if (itemAmount.textContent == 1) {
      // arrowDown.classList.add('disabled');
      return;
    }
    itemAmount.textContent--;
    const h = (cartProductInfoPrice.textContent = price * itemAmount.textContent);
    console.log('minus');

    // itemSumPrice.push(h);
    // const sum = itemSumPrice.reduce((acc, value) => acc + value, 0);
    // console.log(itemSumPrice);
    // console.log(sum);
  }
};
