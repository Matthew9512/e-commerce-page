import { state } from '../model.js';

export const renderProducts = function () {
  const shopProducts = document.querySelector('.shop__products');

  for (const product of state.productList) {
    const html = `
      <div class="shop__products-item" data-id="${product.id}" data-category="${product.category}">
      <img src="${product.image}" alt="" class="shop__products-item-img" />
        <div class="shop__products-item-details">
          <p class="shop__products-title">${product.title}</p>
          <div class="normal-price sale-info">
            <p class="shop__products-price">${product.price}<span>$</span></p>
          </div>
          <div class="sale-price sale-info hidden">
            <p class="shop__products-price price">${product.price}<span>$</span>
            <p class="cut-price">${(product.price * (state.sale / 100)).toFixed(2)}</p><span>$</span></p>
          </div>
          <p class="shop__products-description">${product.description}</p>
        </div>
        <button class="shop__products-btn">Add to cart</button>
      </div>`;
    shopProducts.insertAdjacentHTML('afterbegin', html);
  }
};
