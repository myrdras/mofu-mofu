import axios from 'axios';
import { getProduct } from "../api";
import { addToCart } from '../cart';

const HomeScreen = {
  after_render: () => {
    const btns = document.querySelectorAll('#addBtn');
    if (btns) {
      btns.forEach(async btn => {
        const product = await getProduct(btn.getAttribute('value'));
        btn.addEventListener('click', () => {
          addToCart({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            discount: product.discount,
            countInStock: product.countInStock,
            qty: 1,
          });
        });
      });
    }
  },
  render: async () => {
    const response = await axios({
      url: 'http://localhost:5000/api/products',
      headers: {
        'Content-Type':'application/json',
      },
    });
    if (!response || response.statusText !== 'OK') {
      return `<div>Error in getting data</div>`
    }
    const products = response.data;
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
                <i id="addBtn" class="fas fa-cart-plus" value="${product._id}"></i>
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
              <span class="discount">${product.discount}%</span>
            </a>
            <div class="product-info">
              <div>
                <p><small><del>$${product.price}</del></small>$${(product.price*(100-product.discount)/100)}</p>
                <p>${product.name}</p>
              </div>
              <figure>
                <i id="addBtn" class="fas fa-cart-plus" value="${product._id}"></i>
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