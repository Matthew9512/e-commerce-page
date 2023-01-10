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
  const productData = state.productList.find((value) => value.id == productItem.dataset.id);

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

  lsItems.push(lsObj);
  localStorage.setItem('shopping-cart', JSON.stringify(lsItems));

  // update number of items in shopping cart icon
  cartItemsAmount();
  // update shopping cart list
  renderShoppingCart();
};
