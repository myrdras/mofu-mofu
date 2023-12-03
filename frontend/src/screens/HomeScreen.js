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

const HomeScreen = {
  render: async () => {
    const response = await fetch('http://localhost:5000/api/products', {
      headers: {
        'Content-Type':'application/json',
      },
    });
    if (!response || !response.ok) {
      return `<div>Error in getting data</div>`
    }
    const products = await response.json();
    const productsNew = products.filter(p => p.newSeason);
    const productsOffer = products.filter(p => p.discount > 0);
    return `
      <section id="trends-container">
        <h2><img src="./assets/pokeball.svg"><span>Nueva temporada</span></h2>
        <div class="cards-container cards-new">
        ${productsNew.map(product => `
          <div class="product-card">
            <a href="./#/product/${product._id}"><img src="${product.image}" alt="${product.name}"></a>
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
      </section>
      <section id="offers-container">
        <h2><img src="./assets/pokeball.svg"><span>Ofertas</span></h2>
        <div class="cards-container cards-new">
        ${productsOffer.map(product => `
          <div class="product-card">
            <a href="./#/product/${product._id}">
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
      </section>
    `;
  },
};

export default HomeScreen;