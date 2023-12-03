import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import { parseRequestUrl } from './utils.js';
// import { parseRequestUrl, showLoading, hideLoading } from './utils';
import Error404Screen from './screens/Error404Screen.js';
// import CartScreen from './screens/CartScreen';
// import SigninScreen from './screens/SigninScreen';
// import Header from './components/Header';
// import RegisterScreen from './screens/RegisterScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import ShippingScreen from './screens/ShippingScreen';
// import PaymentScreen from './screens/PaymentScreen';
// import PlaceOrderScreen from './screens/PlaceOrderScreen';
// import OrderScreen from './screens/OrderScreen';
// import DashboardScreen from './screens/DashboardScreen';
// import ProductListScreen from './screens/ProductListScreen';
// import ProductEditScreen from './screens/ProductEditScreen';
// import OrderListScreen from './screens/OrderListScreen';
// import Aside from './components/Aside';

const routes = {
  '/': HomeScreen,
  // '/product/:id/edit': ProductEditScreen,
  '/product/:id': ProductScreen,
  // '/order/:id': OrderScreen,
  // '/cart/:id': CartScreen,
  // '/cart': CartScreen,
  // '/signin': SigninScreen,
  // '/register': RegisterScreen,
  // '/profile': ProfileScreen,
  // '/shipping': ShippingScreen,
  // '/payment': PaymentScreen,
  // '/placeorder': PlaceOrderScreen,
  // '/dashboard': DashboardScreen,
  // '/productlist': ProductListScreen,
  // '/orderlist': OrderListScreen,
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

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
}
/*
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  console.log(request);
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();

  const aside = document.getElementById('aside-container');
  aside.innerHTML = await Aside.render();
  await Aside.after_render();

  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};*/
window.addEventListener('load', router);
window.addEventListener('hashchange', router);