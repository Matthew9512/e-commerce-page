export const getShopItems = async () => {
  const respond = await fetch('https://fakestoreapi.com/products');
  const data = await respond.json();
  console.log(data);
  const test = document.querySelector('#test');

  for (const d of data) {
    console.log(d);
    test.innerHTML += `
      <p class="quick-test">${d.category}</p>
      <p class="quick-test">${d.description}</p>
      <p class="quick-test">${d.price}</p>
      <p class="quick-test">${d.title}</p>
      <img src="${d.image}" class="quick-test-img" />`;
  }
};
