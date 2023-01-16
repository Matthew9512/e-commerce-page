import { state } from '../model.js';

export const renderSaleInfo = function () {
  return `
    <div class="sale__active">
      <p class="sale__active-number">-${state.sale}%</p>
    </div>`;
};

// display proper price in shopping cart
export const calcPrice = function (item, lsItems) {
  // if item HAS active sale
  if (item.category.includes(state.saleCategory)) {
    const price = item.price * item.amount;
    return price;
    // if item DOES NOT have active sale
  } else if (!item.category.includes(state.saleCategory)) {
    const price = item.beforeSale * item.amount;
    item.price = item.beforeSale;
    localStorage.setItem('shopping-cart', JSON.stringify(lsItems));
    return price;
  }
};
