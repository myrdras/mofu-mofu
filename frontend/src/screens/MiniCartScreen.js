import { getCartItems } from '../localStorage';
import { removeFromCart } from '../cart';

const MiniCartScreen = {
  after_render: () => {
    const deleteBtns = document.querySelectorAll('.fa-xmark');
    if (deleteBtns.length > 0) {
      deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', () => {
          removeFromCart(deleteBtn.getAttribute('value'));
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
        ? '<div>El carrito está vacio.</div>'
        : `
      <div class="my-order-content">
        <div class="cart-items">
          `+cartItems.map(item => `
          <div class="shopping-cart">
            <figure>
              <img src="${item.image}" alt="${item.name}">
            </figure>
            <p>${item.name}</p>
            <p>x${item.qty}</p>
            <p>$${item.price}</p>
            <i class="fas fa-xmark" value="${item.product}"></i>
          </div>
        `).join('\n') + `
        </div>

        <div class="order">
          <p>Subtotal</p>
          <p>$${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</p>
        </div>

        <button id="miniCartBtn" class="primary-button">Ir al carrito</button>
      </div>
        `
      }
    `;
  },
};
export default MiniCartScreen;