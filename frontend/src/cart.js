import { rerender } from './utils';
import { getCartItems, setCartItems } from './localStorage';
import CartScreen from './screens/CartScreen.js';
import MiniCartScreen from './screens/MiniCartScreen.js';

export const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
  rerender(MiniCartScreen, 'shoppingCartContainer');
};
export const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (document.location.hash == '#/carrito') {
    rerender(CartScreen);
  }
  rerender(MiniCartScreen, 'shoppingCartContainer');
};