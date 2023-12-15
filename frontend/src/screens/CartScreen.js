import { getCartItems } from '../localStorage';
import { addToCart, removeFromCart } from '../cart';
import { numberWithDots } from '../utils'

function getValueFromCP(l, n) {
  let p = Object.keys(l)[0];
  Object.keys(l).some(k => {
    if (k >= n) {
      p = k;
      return true;
    } 
  });
  return l[p];
}

const deliveryPrices = {
  Moto: {
    1489: 1830.00,
    1836: 2885.00,
    1899: 3930.00,
  },
  Andreani: {
    1999: 3744.01,
    9999: 6374.64
  },
  Mercado: {
    1899: 2132.93,
    3299: 4052.14,
    4399: 5001.00,
    9999: 6107.93
  },
  Oca: {
    1999: 3169.04,
    3499: 3829.58,
    4399: 5067.18,
    9999: 6429.14
  },
}

const CartScreen = {
  after_render: async () => {
    const qtyContainer = document.querySelectorAll(".plus-minus");
    qtyContainer.forEach(div => {
      const btns = div.querySelectorAll("button");
      const input = div.querySelector("input");
      const numInput = input.value;
      const minValue = 0;
      const maxValue = input.max;
      btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const num = parseFloat(numInput);
          const newNum = e.currentTarget.classList.contains("plus")
            ? num + 1
            : num - 1;
          input.value = `${newNum}`;
          input.dispatchEvent(new Event('change'));
        });
      });
      input.addEventListener('change', (e) => {
        const inputQty = Number(e.currentTarget.value) >= maxValue
          ? Number(maxValue)
          : Number(e.currentTarget.value);
        if (inputQty > 0) {
          const item = getCartItems().find((x) => x.product === e.currentTarget.id);
          addToCart({ ...item, qty: inputQty }, true);
        } else {
          removeFromCart(e.currentTarget.id);
        }
      });
      
      // Get the minus and plus buttons
      const increment = div.querySelector(".plus");
      const decrement = div.querySelector(".minus");
      // Disable and enable buttons based on number value (and undim number)
      if (numInput > minValue && numInput < maxValue) {
        decrement.disabled = false;
        increment.disabled = false;
        input.disabled = false;
      } else if (numInput === maxValue) {
        increment.disabled = true;
        input.disabled = true;
        increment.blur();
      }
    });

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

    document
      .querySelector('.cp')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const cpa = e.currentTarget.querySelector('#cpInput').value;
        document.getElementById('deliveryOptions').innerHTML = `
        <fieldset>
          <legend><object type="image/svg+xml" data="../assets/tauros.svg" class="tauros"></object> Envío a Domicilio</legend>
          ${cpa < Math.max(...Object.keys(deliveryPrices.Moto))+1 ? `
          <div>
            <input type="radio" id="moto" name="homeDelivery" value="moto" />
            <label for="moto">Entega en moto en el día <br><small>(sujeto a disponibilidad)</small></label>
            <label for="moto">$${getValueFromCP(deliveryPrices.Moto, cpa)}</label>
          </div>`:''}
          <div>
            <input type="radio" id="mercado" name="homeDelivery" value="mercado" />
            <label for="mercado">Mercado Envíos</label>
            <label for="mercado">$${getValueFromCP(deliveryPrices.Mercado, cpa)}</label>
          </div>
          <div>
            <input type="radio" id="oca" name="homeDelivery" value="oca" />
            <label for="oca">OCA Estándar</label>
            <label for="oca">$${getValueFromCP(deliveryPrices.Oca, cpa)}</label>
          </div>
          <div>
            <input type="radio" id="andreani" name="homeDelivery" value="andreani" />
            <label for="andreani">Andreani</label>
            <label for="andreani">$${getValueFromCP(deliveryPrices.Andreani, cpa)}</label>
          </div>
        </fieldset>`;
      });
  },
  render: async () => {
    const cartItems = getCartItems();
    const cartDiscount = cartItems.length > 0 ? cartItems.filter(p => p.discount > 0).reduce((a, c) => a + c.price*c.qty*c.discount/100, 0) : 0;
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
                ${item.discount>0?`<span class="discount">${item.discount}%</span>`:""}
              </figure>
              <div class="details">
                <p class="name">${item.name}</p>
                <div class="plus-minus">
                  <button class="minus" aria-label="Decrease by one">
                    <i class="fa fa-minus"></i>
                  </button>
                  <input id="${item.product}" class="qty" type="number" name="qty" value="${item.qty}" max="${item.countInStock}" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                  <button class="plus" aria-label="Increase by one">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <p class="price">$${numberWithDots(item.price * item.qty)}</p>
              <i class="fas fa-xmark" value="${item.product}" aria-hidden="true"></i>
            </div>
          `).join('\n')}
          </div>
          <div class="order">
            <p class="order-title">Descuento</p>
            <p class="order-price">$${numberWithDots(cartDiscount)}</p>
            <p class="order-title">Subtotal <small>(sin envio)</small></p>
            <p class="order-price">$${numberWithDots(cartSubtotal - cartDiscount)}</p>
          </div>
        
          <div class="cp-container">
            <form class="cp">
              <div class="inputGroup">
                <input type="number" name="cp" id="cpInput" placeholder="Código Postal" min="1000" max="9999" required />
              </div>
              <input class="cp-btn" type="submit" value="Calcular">
            </form>
            <p class="link-cp"><a href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank">No se mi código postal</a></p>
          </div>
          <div id="deliveryOptions"></div>
          <div class="shipping-form"></div>
          <div class="order">
            <p class="order-title">Total</p>
            <p class="order-price">$${numberWithDots(cartSubtotal - cartDiscount)}</p>
          </div>
          <button id="purchase" class="primary-button">Iniciar compra</button>
          <p class="link-cp"><a href="/#/categoria/todos">Ver mas productos</a></p>
        `}
        </div>
      </section>
    `;
  },
};
export default CartScreen;