import { state } from '../model.js';

export const renderSaleInfo = function () {
  return `
    <div class="sale__active">
      <p class="sale__active-number">-${state.sale}%</p>
    </div>`;
};
