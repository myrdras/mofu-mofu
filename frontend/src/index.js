import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CategoryScreen from './screens/CategoryScreen.js';
import FaqScreen from './screens/FaqScreen.js';
import AboutScreen from './screens/AboutScreen.js';
import ReturnsScreen from './screens/ReturnsScreen.js';
import { parseRequestUrl } from './utils.js';
import Error404Screen from './screens/Error404Screen.js';
import CartScreen from './screens/CartScreen.js';
import MiniCart from './components/MiniCart.js';
import Nav from './components/Nav.js';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/categoria/:id': CategoryScreen,
  '/preguntas-frecuentes': FaqScreen,
  '/quienes-somos': AboutScreen,
  '/devoluciones': ReturnsScreen,
  '/carrito': CartScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const slide = document.querySelector('.splide');
  const inHome = screen == HomeScreen;
  const isInactive = slide.classList.contains('inactive');
  if (inHome && isInactive) slide.classList.remove('inactive');
  if (!inHome && !isInactive) slide.classList.add('inactive');

  const minicart = document.getElementById('shoppingCartContainer');
  minicart.innerHTML = await MiniCart.render();
  await MiniCart.after_render();

  const navbar = document.querySelector('.main-navbar');
  navbar.innerHTML = await Nav.render();
  await Nav.after_render();

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();

  if (screen.after_render) await screen.after_render();
}
window.addEventListener('load', router);
window.addEventListener('hashchange', router);