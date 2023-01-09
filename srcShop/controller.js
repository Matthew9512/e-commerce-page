const cart = document.querySelector('.cart');

// btns
const btnShoppingCart = document.querySelector('.btn-shopping-cart');
const cartBtnClose = document.querySelector('.cart__btn-close');

// show cart
const openCart = function () {
  console.log(`openCart`);
  cart.classList.remove('hide');
  cart.classList.add('show');
};
// close cart
const closeCart = function () {
  console.log(`closeCart`);
  cart.classList.remove('show');
  cart.classList.add('hide');
};

btnShoppingCart.addEventListener('click', openCart);
cartBtnClose.addEventListener('click', closeCart);
