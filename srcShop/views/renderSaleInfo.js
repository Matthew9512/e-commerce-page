import { state } from '../model.js';

export const renderSaleInfo = function () {
  return `
    <div class="sale__active">
      <p class="sale__active-number">-${state.sale}%</p>
    </div>`;
};

// display proper price in shopping cart
export const salePrice = function (item) {
  if (item.category.includes(state.saleCategory)) {
    // const price = (item.increasedPrice * (state.sale / 100)).toFixed(2);
    const price = item.increasedPrice;
    return price;
  } else if (!item.category.includes(state.saleCategory)) {
    const price = item.beforeSale * item.amount;
    return price;
  }
};
