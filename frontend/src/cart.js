import { rerender, parseRequestUrl } from './utils.js';
import { getCartItems, setCartItems } from './localStorage';
import CartScreen from './screens/CartScreen.js';
import MiniCart from './components/MiniCart.js';
import Nav from './components/Nav.js';
import ProductScreen from './screens/ProductScreen.js';

export const addAlert = () => {
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      padding: '5px 10px',
      color: '#ffde59',
      background: "#87C159",
      borderRadius: "1rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
      x: '1.5rem', // horizontal axis
      y: '5rem' // vertical axis
    }, onClick: function(){}
  }).showToast();
};

export const maxAlert = () => {
  Toastify({
    text: "Maximo Stock",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      padding: '5px 10px',
      color: '#c30000',
      background: "#ffde59",
      borderRadius: "1rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
      x: '1.5rem', // horizontal axis
      y: '5rem' // vertical axis
    }, onClick: function(){}
  }).showToast();
};

export const addToCart = (item, forceUpdate = false, screen=CartScreen) => {
  const request = parseRequestUrl();
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (request.resource=="" || request.resource=="categoria") {
      item.qty =  existItem.qty+1;
    }
    cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(screen);
  }
  rerender(MiniCart, '#shoppingCartContainer');
  rerender(Nav, '.main-navbar');
};
export const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (document.location.hash == '#/carrito') {
    rerender(CartScreen);
  }
  if (/#\/product\/[\w\d\-]+/.test(document.location.hash)) {
    rerender(ProductScreen);
  }
  rerender(MiniCart, '#shoppingCartContainer');
  rerender(Nav, '.main-navbar');
};