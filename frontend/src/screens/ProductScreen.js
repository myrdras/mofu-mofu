import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";
import { addToCart } from '../cart';

const ProductScreen = {
  after_render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    const btn = document.getElementById('addBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        addToCart({
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty: 1,
        });
      });
    }
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
      <section class="product-route">
        <p><a href="/#/">Inicio</a> > ${product.category} > ${product.name}</p>
      </section>
      <section id="productDetail">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <p>${product.name}</p>
          <p>$${product.price}</p>
          <div class="product-description">${(product.description.split('\n').map(d=>`<p>${d}</p>`).join('\n'))}
            <p>* Original Pokémon Center</p>
          </div>
          <p><i class="far fa-credit-card"></i> 12 cuotas $${product.price / 12}</p>
          <button id="addBtn" class="primary-button add-to-cart-button"><i class="fas fa-cart-plus"></i> Agregar</button>
        </div>
      </section>
    `;
  },
}

export default ProductScreen;