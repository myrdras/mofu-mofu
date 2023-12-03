const ProductScreen = {
  render: () => {
    // const { products } = data;
    // const productsNew = products.filter(p => p.newSeason);
    return `
      <section id="productDetail">
      <img src="./assets/imgs/slowbro.jpg" alt="Slowbro">
      <div class="product-info">
        <p>Slowbro</p>
        <p>$120,00</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, tempore ipsum ad in odio laborum nam quasi earum illum.</p>
        <p><i class="far fa-credit-card"></i> 12 cuotas $0,01</p>
        <button class="primary-button add-to-cart-button"><i class="fas fa-cart-plus"></i> Agregar</button>
      </div>

      <div class="cp">
        <div class="inputGroup">
          <input type="text" name="name" id="name" placeholder="Código Postal" required />
          <!-- <label for="name">Código Postal</label> -->
        </div>
        <p>Calcular</p>
      </div>
      <p><a href="">No se mi código postal</a></p>

    </section>
    `;
  },
}

export default ProductScreen;