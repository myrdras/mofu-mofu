const shopMenu = document.querySelector('.navbar-shopping-cart');
const shopOrder = document.querySelector('#shoppingCartContainer');
const productDetail = document.querySelector('#productDetail');
const productDetailClose = document.querySelector('.product-detail-close');
const queryCloseAside = document.querySelectorAll('.fa-angle-left');
const newCardsContainer = document.querySelector('.cards-new');
const overlay = document.querySelector(".overlay");

/************************/
/******** Modals ********/
/************************/

const closeAside = [...queryCloseAside];

function toggleShopOrder() {
  let flag = shopOrder.classList.contains('inactive');
  closeAll();
  if (flag) {
    shopOrder.classList.remove('inactive');
    overlay.classList.remove("inactive");
  }
}

function closeAll() {
  shopOrder.classList.add('inactive');
  productDetail.classList.add('inactive');
  overlay.classList.add("inactive");
}

function openDetail() {
  closeAll()
  productDetail.classList.remove('inactive');;
  overlay.classList.remove("inactive");
}

shopMenu.addEventListener('click', toggleShopOrder);
productDetailClose.addEventListener('click', closeAll);
overlay.addEventListener('click', closeAll);
closeAside.forEach(btn => {btn.addEventListener('click', closeAll)})

/************************/
/***** Product List *****/
/************************/

const newProductList = [];
newProductList.push({
  name:'Pikachu',
  price: 120,
  image: './assets/bg-gray.jpg',
});
newProductList.push({
   name:'Bulbasaur',
   price: 100,
   image: './assets/bg-gray.jpg',
});
newProductList.push({
   name:'Mew',
   price: 150,
   image: './assets/bg-gray.jpg',
});

function renderProducts(arr) {
  for (product of arr) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
 
    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.image);
    productImg.addEventListener('click', openDetail);
 
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
 
    const productInfoDiv = document.createElement('div');
 
    const productPrice = document.createElement('p');
    productPrice.innerText = '$' + product.price;
    const productName = document.createElement('p');
    productName.innerText = product.name;
 
    productInfoDiv.append(productPrice, productName);
 
    const productInfoFigure = document.createElement('figure');
 
    const productIcon = document.createElement('i');
    productIcon.classList.add('fas');
    productIcon.classList.add('fa-cart-plus');
 
    productInfoFigure.appendChild(productIcon);
 
    productInfo.append(productInfoDiv, productInfoFigure);
 
    productCard.append(productImg, productInfo);
    
    newCardsContainer.appendChild(productCard);
  }
}

renderProducts(newProductList);