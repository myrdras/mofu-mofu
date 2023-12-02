/*import Rating from '../components/Rating';
import { getProducts } from '../api';
import { parseRequestUrl } from '../utils';

const HomeScreen = {
  render: async () => {
    const { value } = parseRequestUrl();
    const products = await getProducts({ searchKeyword: value });
    if (products.error) {
      return `<div class="error">${products.error}</div>`;
    }

    return `
    <ul class="products">
      ${products
        .map(
          (product) => `
      <li>
        <div class="product">
          <a href="/#/product/${product._id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
        <div class="product-name">
          <a href="/#/product/1">
            ${product.name}
          </a>
        </div>
        <div class="product-rating">
          ${Rating.render({
            value: product.rating,
            text: `${product.numReviews} reviews`,
          })}
        </div>
        <div class="product-brand">
          ${product.brand}
        </div>
        <div class="product-price">
          $${product.price}
        </div>
        </div>
      </li>
      `
        )
        .join('\n')}
    `;
  },
};*/

import data from '../data.js';
const HomeScreen = {
  renderNew: () => {
    const { products } = data;
    const productsNew = products.filter(p => p.newSeason);
    return `
      <h2><img src="./assets/pokeball.svg"><span>Nueva temporada</span></h2>
      <div class="cards-container cards-new">
      ${productsNew.map(product => `
        <div class="product-card">
          <a href="./product-detail.html"><img src="${product.image}" alt="${product.name}"></a>
          <div class="product-info">
            <div>
              <p>$${product.price}</p>
              <p>${product.name}</p>
            </div>
            <figure>
              <i class="fas fa-cart-plus"></i>
            </figure>
          </div>
        </div>
      `).join('\n')}
      </div>
    `;
  },
  renderOffer: () => {
    const { products } = data;
    const productsOffer = products.filter(p => p.discount>0);
    return `
      <h2><img src="./assets/pokeball.svg"><span>Ofertas</span></h2>
      <div class="cards-container cards-new">
      ${productsOffer.map(product => `
        <div class="product-card">
          <a href="./product-detail.html">
            <img src="${product.image}" alt="${product.name}">
            <span>${product.discount}%</span>
          </a>
          <div class="product-info">
            <div>
              <p><small><del>$${product.price}</del></small>$${(product.price*(100-product.discount)/100)}</p>
              <p>${product.name}</p>
            </div>
            <figure>
              <i class="fas fa-cart-plus"></i>
            </figure>
          </div>
        </div>
      `).join('\n')}
      </div>
    `;
  },
};

export default HomeScreen;