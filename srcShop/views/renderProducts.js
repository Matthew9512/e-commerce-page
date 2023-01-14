import { state } from '../model.js';

export const renderProducts = function () {
  const shopProducts = document.querySelector('.shop__products');

  for (const product of state.productList) {
    const html = `
      <div class="shop__products-item" data-id="${product.id}" data-category="${product.category}">
     <!-- sale test 
      <div class="sale__active">
      <p class="sale__active-number">-50%</p>
      </div>  -->
      <img src="${product.image}" alt="" class="shop__products-item-img" />
        <div class="shop__products-item-details">
          <p class="shop__products-title">${product.title}</p>
          <p class="shop__products-price">${product.price}<span>$</span></p>
          <p class="shop__products-description">${product.description}</p>
        </div>
        <button class="shop__products-btn">Add to cart</button>
      </div>`;
    shopProducts.insertAdjacentHTML('afterbegin', html);
  }
};
