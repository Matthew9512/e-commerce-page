import { cartItemsAmount, removeProductFromCart } from './modelShoppingCart.js';
import { renderProducts } from './views/renderProducts.js';
import { renderShoppingCart } from './views/renderShoppingCart.js';

// global data obj
export const state = {
  productList: [],
  saleCategory: 'lunch',
  sale: 50,
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
  const productData = state.productList.find((value) => value.id === parseFloat(productItem.dataset.id));

  if (click.textContent === `Add to cart`) {
    click.textContent = `Remove from cart`;
    // add clicked product to ls
    addItemLS(productData, productItem);
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
const addItemLS = function (productData, productItem) {
  const lsItems = getLS();

  const saleInfo = productItem.querySelector('.sale-price');

  // send data to ls based on sale price
  if (!saleInfo.classList.contains('hidden')) {
    // const price = saleInfo.querySelector('.cut-price').textContent;
    const lsObj = {
      category: productData.category,
      id: productData.id,
      img: productData.image,
      price: (productData.price * (state.sale / 100)).toFixed(2),
      // increasedPrice: (productData.price * (state.sale / 100)).toFixed(2),
      beforeSale: productData.price,
      amount: 1,
      title: productData.title,
    };
    lsItems.push(lsObj);
    localStorage.setItem('shopping-cart', JSON.stringify(lsItems));

    // send data to ls based on normal price
  } else if (saleInfo.classList.contains('hidden')) {
    const lsObj = {
      category: productData.category,
      id: productData.id,
      img: productData.image,
      price: productData.price,
      // increasedPrice: productData.price,
      beforeSale: productData.price,
      amount: 1,
      title: productData.title,
    };
    lsItems.push(lsObj);
    localStorage.setItem('shopping-cart', JSON.stringify(lsItems));
  }

  // change btn text
  properBtnText();
  // update number of items in shopping cart icon
  cartItemsAmount();
  // update shopping cart list
  renderShoppingCart();
};

// update LS items
export const updateLS = function (target) {
  const lsItems = getLS();

  // return items with id different than current targets id
  const update = lsItems.filter((item) => item.id !== parseFloat(target.dataset.id));

  // add to ls
  localStorage.setItem('shopping-cart', JSON.stringify(update));
};

// display proper btn text
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
  }
};
