import { getCartItems } from '../localStorage';
import { addToCart, removeFromCart } from '../cart';

const CartScreen = {
  after_render: async () => {
    // const qtySelects = document.getElementsByClassName('qty-select');
    // Array.from(qtySelects).forEach((qtySelect) => {
    //   qtySelect.addEventListener('change', (e) => {
    //     const item = getCartItems().find((x) => x.product === qtySelect.id);
    //     addToCart({ ...item, qty: Number(e.target.value) }, true);
    //   });
    // });
    const delBtns = document.querySelectorAll('.cart-container .fa-xmark');
    if (delBtns.length > 0) {
      delBtns.forEach((delBtn) => {
        delBtn.addEventListener('click', () => {
          removeFromCart(delBtn.getAttribute('value'));
        });
      });
      document.getElementById('purchase').addEventListener('click', () => {
        document.location.hash = '/purchase/delivery';
      });
    }
  },
  render: async () => {
    const cartItems = getCartItems();
    const cartDiscount = cartItems.length > 0 ? cartItems.filter(p => p.discount > 0).reduce((a, c) => a + c.price*c.discount/100, 0) : 0;
    const cartSubtotal = cartItems.length > 0 ? cartItems.reduce((a, c) => a + c.price * c.qty, 0) : 0;
    return `
    <section class="cart-container">
      <p class="title">Carrito</p>
      <div class="my-order-content">
      ${cartItems.length == 0
        ? '<div>El carrito de compras está vacio</div>'
        : `
        <div class="cart-items">
        ${cartItems.map(item => `
          <div class="shopping-cart">
            <figure>
              <img src="${item.image}" alt="${item.name}">
            </figure>
            <div class="details">
              <p class="name">${item.name}</p>
              <p class="qty">x${item.qty}</p>
            </div>
            <p class="price">$${item.price}</p>
            <i class="fas fa-xmark" value="${item.product}" aria-hidden="true"></i>
          </div>
        `).join('\n')}
        </div>
        <div class="order">
          <p class="order-title">Descuento</p>
          <p class="order-price">$${cartDiscount}</p>
          <p class="order-title">Subtotal</p>
          <p class="order-price">$${cartSubtotal - cartDiscount}</p>
        </div>
        <button id="purchase" class="primary-button">Iniciar compra</button>
      `}
      </div>
    </section>
    `;
  },
};
export default CartScreen;