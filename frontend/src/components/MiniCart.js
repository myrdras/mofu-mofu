import { getCartItems } from '../localStorage';
import { removeFromCart } from '../cart';

const MiniCart = {
  after_render: () => {
    const delBtns = document.querySelectorAll('.fa-xmark');
    if (delBtns.length > 0) {
      delBtns.forEach((delBtn) => {
        delBtn.addEventListener('click', () => {
          removeFromCart(delBtn.getAttribute('value'));
        });
      });
      document.getElementById('miniCartBtn').addEventListener('click', () => {
        document.location.hash = '/carrito';
      });
    }
  },
  render: async () => {
    const cartItems = getCartItems();
    return `
      <div class="title-container">
        <i class="fas fa-angle-left"></i>
        <p class="title">Mi orden</p>
      </div>

      ${cartItems.length === 0
        ? '<div>El carrito de compras está vacio.</div>'
        : `
      <div class="my-order-content">
        <div class="cart-items">
          `+cartItems.map(item => `
          <div class="shopping-cart">
            <figure>
              <img src="${item.image}" alt="${item.name}">
            </figure>
            <p class="name">${item.name}</p>
            <p class="qty">x${item.qty}</p>
            <p class="price">$${item.price}</p>
            <i class="fas fa-xmark" value="${item.product}"></i>
          </div>
        `).join('\n') + `
        </div>

        <div class="order">
          <p class="order-title">Subtotal</p>
          <p class="order-price">$${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</p>
        </div>

        <button id="miniCartBtn" class="primary-button">Ir al carrito</button>
      </div>
        `
      }
    `;
  },
};
export default MiniCart;