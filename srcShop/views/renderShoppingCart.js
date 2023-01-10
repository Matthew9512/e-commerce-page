import { getLS } from '../model.js';

export const renderShoppingCart = function () {
  const cartWrapper = document.querySelector('.cart__wrapper');
  cartWrapper.innerHTML = '';

  //   get local storage
  const lsItems = getLS();

  for (const item of lsItems) {
    const html = `
    <div class="cart__wrapper-item" data-id="${item.id}">
    <img src="${item.img}" width="60" height="60" alt="person img" class="cart__wrapper-item-img" />
    <div class="cart__wrapper-item-details">
      <div class="cart__product-info">
        <h4>${item.title}</h4>
        <h5>${item.price}</h5>
        <span class="remove-item">remove</span>
      </div>
      <div class="cart__product-add">
        <i class="fas fa-chevron-up"></i>
        <p class="item-amount">1</p>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
  </div>`;
    cartWrapper.insertAdjacentHTML('afterbegin', html);
  }
};