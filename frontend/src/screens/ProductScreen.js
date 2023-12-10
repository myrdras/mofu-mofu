import { getCartItems } from '../localStorage';
import { getProduct } from "../api";
import { parseRequestUrl } from "../utils";
import { addToCart, removeFromCart, addAlert, maxAlert } from '../cart';

function convertToLinkEnd(str) {
  if (!str) { return "" }
  return str.replace(/\b\w/g, s => s.toUpperCase()).toLowerCase().replaceAll(' ', '-');
}

const ProductScreen = {
  after_render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    const divQty = document.querySelector(".plus-minus");
    const addBtn = document.getElementById('addBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const newQty = Number(divQty.querySelector("input").value);
        if (newQty < product.countInStock) {
          addToCart({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            discount: product.discount,
            countInStock: product.countInStock,
            qty: newQty + 1,
          }, true, ProductScreen);
          addAlert();
        } else {
          maxAlert();
        }
      });
    }
    if (divQty) {
      const btns = divQty.querySelectorAll("button");
      const input = divQty.querySelector("input");
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
          if (item) {
            addToCart({ ...item, qty: inputQty }, true, ProductScreen);
          } else {
            addToCart({
              product: product._id,
              name: product.name,
              image: product.image,
              price: product.price,
              discount: product.discount,
              countInStock: product.countInStock,
              qty: 1,
            }, true, ProductScreen);
          }
        } else {
          removeFromCart(e.currentTarget.id);
        }
      });
      
      // Get the minus and plus buttons
      const increment = divQty.querySelector(".plus");
      const decrement = divQty.querySelector(".minus");
      // Disable and enable buttons based on number value (and undim number)
      if (numInput <= minValue) {
        decrement.disabled = true;
        decrement.blur();
      } else if (numInput > minValue && numInput < maxValue) {
        decrement.disabled = false;
        increment.disabled = false;
        input.disabled = false;
      } else if (numInput === maxValue) {
        increment.disabled = true;
        input.disabled = true;
        increment.blur();
      }
    }
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    const cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === product._id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
      <section class="product-route">
        <p><a href="/#/">Inicio</a> > <a href="/#/categoria/${convertToLinkEnd(product.category)}">${product.category}</a> > ${product.name}</p>
      </section>
      <section id="productDetail">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <p>${product.name}</p>
          <p>$${product.price}</p>
          <div class="plus-minus">
            <button class="minus" aria-label="Decrease by one">
              <i class="fa fa-minus"></i>
            </button>
            <input id="${product._id}" class="qty" type="number" name="qty" value="${existItem ? existItem.qty : 0}" max="${product.countInStock}" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
            <button class="plus" aria-label="Increase by one">
              <i class="fa fa-plus"></i>
            </button>
          </div>
          <div class="product-description">${(product.description.split('\n').map(d=>`<p>${d}</p>`).join('\n'))}
            <p>* Original Pokémon Center</p>
          </div>
          <p><i class="far fa-credit-card"></i> 12 cuotas sin interes $${(product.price / 12).toFixed(2)}</p>
          <button id="addBtn" class="primary-button add-to-cart-button"><i class="fas fa-cart-plus"></i> Agregar</button>
        </div>
      </section>
    `;
  },
}

export default ProductScreen;