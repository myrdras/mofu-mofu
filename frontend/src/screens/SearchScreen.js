import { parseRequestUrl } from "../utils";
import { getProduct, getCategory, getAllProducts } from "../api";
import { addToCart, addAlert, maxAlert } from '../cart';
import { getCartItems } from '../localStorage';

function convertToTitleCase(str) {
  if (!str) { return "" }
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()).replaceAll('-', ' ');
}

const SearchScreen = {
  after_render: () => {
    const btns = document.querySelectorAll('#addBtn');
    if (btns) {
      btns.forEach(async btn => {
        const product = await getProduct(btn.getAttribute('value'));
        btn.addEventListener('click', () => {
          const cartItems = getCartItems();
          const existItem = cartItems.find((x) => x.product === product._id);
          const newQty = existItem ? Number(existItem.qty) : 0;
          if (newQty < product.countInStock) {
            addToCart({
              product: product._id,
              name: product.name,
              image: product.image,
              price: product.price,
              discount: product.discount,
              countInStock: product.countInStock,
              qty: newQty + 1,
            });
            addAlert();
          } else {
            maxAlert();
          }
        });
      });
    }
  },
  render: async () => {
    const { value } = parseRequestUrl();
    const products = await getAllProducts({ searchKeyword: value });
    return `
      <section id="category">
        <h2><img src="./assets/pokeball.svg"><span>${convertToTitleCase(value)}</span></h2>
        ${products.length > 0 ? `
        <div class="cards-container cards-new">
          ${products.map(product => `
          <div class="product-card">
            <a href="./#/product/${product.slug}">
              <img src="${product.image}" alt="${product.name}">
              ${product.discount>0?`<span class="discount">${product.discount}%</span>`:""}
            </a>
            <div class="product-info">
              <div>
                <p>${product.discount>0?`<small><del>$${product.price}</del></small>$${(product.price*(100-product.discount)/100)}`:`$${product.price}`}</p>
                <p>${product.name}</p>
              </div>
              <figure>
                <i id="addBtn" class="fas fa-cart-plus" value="${product._id}"></i>
              </figure>
            </div>
          </div>
          `).join('\n')}`
        : '<div>No hay productos con esa palabra</div>'}
        </div>
      </section>
    `;
  },
};

export default SearchScreen;