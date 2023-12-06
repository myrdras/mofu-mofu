import { rerender } from './utils';
import { getCartItems, setCartItems } from './localStorage';
import CartScreen from './screens/CartScreen.js';
import MiniCart from './components/MiniCart.js';
import Nav from './components/Nav.js';

export const addToCart = (item, forceUpdate = false) => {
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #e6ab37, #ffde59)",
      borderRadius: "1rem",
      textTransform: "uppercase",
      fontSize: ".5rem"
    },
    offset: {
      x: '1.5rem', // horizontal axis
      y: '1.5rem' // vertical axis
    }, onClick: function(){}
  })

  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {/*
    Toastify({
      text: "Ya está en la lista",
      style: {
        background: "linear-gradient(to right, #ff1717, #ff6363)",
      },
      onClick: function(){} // Callback after click
    }).showToast();*/
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {/*
    Toastify({
      text: "Producto agregado",
      style: {
        background: "linear-gradient(to right, #e6ab37, #ffde59)",
      },
      onClick: function(){} // Callback after click
    }).showToast();*/
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
  rerender(MiniCart, '#shoppingCartContainer');
  rerender(Nav, '.main-navbar');
};
export const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (document.location.hash == '#/carrito') {
    rerender(CartScreen);
  }
  rerender(MiniCart, '#shoppingCartContainer');
  rerender(Nav, '.main-navbar');
};