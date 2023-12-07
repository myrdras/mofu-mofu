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
        let event = new Event('click');
        document.querySelector('.navbar-shopping-cart').dispatchEvent(event);
      });
    }
  },
  render: async () => {
    const cartItems = getCartItems();
    const cartDiscount = cartItems.length > 0 ? cartItems.filter(p => p.discount > 0).reduce((a, c) => a + c.price*c.qty*c.discount/100, 0) : 0;
    const cartSubtotal = cartItems.length > 0 ? cartItems.reduce((a, c) => a + c.price * c.qty, 0) : 0;
    return `
      <div class="title-container">
        <i class="fas fa-angle-left"></i>
        <p class="title">Mi orden</p>
      </div>

      <div class="my-order-content">
      ${cartItems.length === 0
        ? '<div>El carrito de compras está vacio.</div>'
        : `
        <div class="cart-items">
          `+cartItems.map(item => `
          <div class="shopping-cart">
            <figure>
              <img src="${item.image}" alt="${item.name}">
              ${item.discount>0?`<span class="discount">${item.discount}%</span>`:""}
            </figure>
            <p class="name">${item.name}</p>
            <p class="qty">x${item.qty}</p>
            <p class="price">$${item.price * item.qty}</p>
            <i class="fas fa-xmark" value="${item.product}"></i>
          </div>
        `).join('\n') + `
        </div>

        <div class="order">
          <p class="order-title">Subtotal</p>
          <p class="order-price">$${cartSubtotal - cartDiscount}</p>
        </div>

        <button id="miniCartBtn" class="primary-button">Ir al carrito</button>
        `
      }
      </div>
    `;
  },
};
export default MiniCart;