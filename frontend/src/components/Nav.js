import { parseRequestUrl } from '../utils';
import { getCartItems } from '../localStorage';

const Nav = {
  render: async () => {
    const { value } = parseRequestUrl();
    const cartItems = getCartItems();
    return `
      <ul>
        <li class="search-bar">
          <form id="search-form">
            <input class="search" id="q" type="text" name="q" value="${value || ''}" placeholder="Buscar">
            <label class="search-button" for="q"><i class="fas fa-magnifying-glass"></i><span>Lupa</span></label>
          </form>
        </li>
        <li>
          <a href="/#/"><i class="fas fa-house"></i><span>Inicio</span></a>
        </li>
        <li id="categoryMenu" tabIndex="-1">
          <div tabIndex="0"><i class="fas fa-list"></i><span>Categorias</span></div>
          <ul id="categoriesContainer">
            <li><a href="/#/categoria/todos">Todos</a></li>
            <li><a href="/#/categoria/ofertas">Ofertas</a></li>
            <li><a href="/#/categoria/nueva-temporada">Nueva Temporada</a></li>
            <li><a href="/#/categoria/llaveros">Llaveros</a></li>
            <li><a href="/#/categoria/peluches">Peluches</a></li>
            <li><a href="/#/categoria/peluches-grandes">Peluches Grandes</a></li>
            <li><a href="/#/categoria/peluches-pikachu">Peluches Pikachu</a></li>
            <li><a href="/#/categoria/sitting-cutties">Sitting Cutties</a></li>
          </ul>
        </li>
        <li class="navbar-shopping-cart">
          <i class="fas fa-cart-shopping"></i>
          <div>${cartItems.reduce((a, c) => a + c.qty, 0)}</div>
        </li>
      </ul>
    `;
  },
  after_render: async () => {
    const nav = document.querySelector('nav');
    const shopMenu = document.querySelector('.navbar-shopping-cart > i');
    const shopOrder = document.querySelector('#shoppingCartContainer');
    const categoryMenu = document.querySelector('#categoryMenu > div');
    //const categoryList = document.querySelector('#categoriesContainer');
    const queryCloseAside = document.querySelectorAll('.fa-angle-left');
    const overlay = document.querySelector(".overlay");
    const searchInput = document.querySelector(".search");
    const searchContainer = document.querySelector('.main-navbar .search-bar');
    const navText = document.querySelectorAll('.main-navbar li span');

    const closeAside = [...queryCloseAside];

    function toggleShopOrder() {
      let flag = shopOrder.classList.contains('inactive');
      closeAll();
      if (flag) {
        shopOrder.classList.remove('inactive');
        shopMenu.classList.add('tag-hover');
        overlay.classList.remove("inactive");
        const body = document.body;
        body.style.overflow = 'hidden';
        nav.style.position = 'fixed';
      }
    }
/*
    function toggleCategoryList() {
      //let flag = categoryList.classList.contains('inactive');
      closeAll();
      //if (flag) {
        //categoryList.classList.remove('inactive');
        console.log('toogle');
        categoryMenu.classList.add('tag-hover');
        categoryMenu.parentElement.focus();
      //}
    }*/

    function closeAll() {
      shopOrder.classList.add('inactive');
      //categoryList.classList.add('inactive');
      overlay.classList.add("inactive");
      shopMenu.classList.remove('tag-hover');
      categoryMenu.classList.remove('tag-hover');
      const body = document.body;
      body.removeAttribute('style');
      nav.removeAttribute('style');
    }

    let focusFlag = false;
    function toggleSearch(flag, on=false) {
      if (flag || (!flag && on)) {
        searchInput.focus();
        searchBarOn();
      } else {
        searchBarOff();
      }
    }
    function searchBarOn() {
      closeAll()
      searchContainer.querySelector('form').classList.add('tag-hover');
      searchContainer.classList.add('search-bar-on');
      navText[1].classList.add('inactive');
      navText[2].classList.add('inactive');
    }
    function searchBarOff() {
      searchContainer.querySelector('form').classList.remove('tag-hover');
      searchContainer.classList.remove('search-bar-on');
      navText[1].classList.remove('inactive');
      navText[2].classList.remove('inactive');
    }
    function listenButton() {
      focusFlag = !focusFlag;
      let searchOn = searchContainer.classList.contains('search-bar-on');
      toggleSearch(focusFlag, searchOn);
    }
    function listenFocus() {
      toggleSearch(true);
    }
    function listenBlur() {
      toggleSearch(false);
    }

    shopMenu.addEventListener('click', toggleShopOrder);
    //categoryMenu.addEventListener('click', toggleCategoryList);
    categoryMenu.addEventListener('click', () => {
      categoryMenu.parentElement.focus();
    });
    overlay.addEventListener('click', closeAll);
    closeAside.forEach(btn => {btn.addEventListener('click', closeAll)});
    searchContainer.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      listenButton();
    });
    searchInput.addEventListener('focus', listenFocus);
    searchInput.addEventListener('blur', listenBlur);

    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        document.location.hash = `/buscar/?q=${searchKeyword}`;
      });
  },
};

export default Nav;