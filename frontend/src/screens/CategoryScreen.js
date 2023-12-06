import { parseRequestUrl } from "../utils";
import { getProduct } from "../api";
import { addToCart } from '../cart';
import { getCategory, getAllProducts } from "../api";

function convertToTitleCase(str) {
  if (!str) { return "" }
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()).replaceAll('-', ' ');
}

const CategoryScreen = {
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
    const request = parseRequestUrl();
    const cat = convertToTitleCase(request.id);
    const allProducts = await getAllProducts();
    const products = cat=='Todos'
      ? allProducts
      : cat=='Ofertas'
        ? allProducts.filter(p => p.discount > 0)
        : cat=='Nueva Temporada'
          ? allProducts.filter(p => p.newSeason)
          : await getCategory(cat);
    return `
      <section id="category">
        <h2><img src="./assets/pokeball.svg"><span>${cat}</span></h2>
        ${products.length > 0 ? `
        <div class="cards-container cards-new">
          ${products.map(product => `
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
          `).join('\n')}`
        : '<div>No hay productos en esta categoria</div>'}
        </div>
      </section>
    `;
  },
};

export default CategoryScreen;