import {
  parseRequestUrl,
  // showLoading,
  // showMessage,
  // hideLoading,
} from '../utils';
import { getProduct, updateProduct, uploadProductImage } from '../api';

const ProductEditScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document
      .getElementById('edit-product-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const selectCat = document.getElementById('category');
        //showLoading();
        const data = await updateProduct({
          _id: request.id,
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          image: document.getElementById('image').value,
          discount: document.getElementById('discount').value,
          category: selectCat.options[selectCat.selectedIndex].value,
          countInStock: document.getElementById('countInStock').value,
          newSeason: document.querySelector( 'input[name="newSeason"]:checked').value,
          description: document.getElementById('description').value,
        });
        //hideLoading();
        if (data.error) {
          //showMessage(data.error);
          console.log(data.error);
        } else {
          document.location.hash = '/productlist';
        }
      });
    document
      .getElementById('image-file')
      .addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        //showLoading();
        const data = await uploadProductImage(formData);
        //hideLoading();
        if (data.error) {
          //showMessage(data.error);
          console.log(data.error);
        } else {
          //showMessage('Image uploaded successfully.');
          console.log('Imagen cargada exitosamente.');
          document.getElementById('image').value = data.image;
        }
      });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
    <div class="content">
      <div class="form-return">
        <a href="/#/productlist">Back to products</a>
      </div>
      <div class="form-container">
        <form id="edit-product-form">
          <ul class="form-items">
            <li>
              <h1>Edit Product ${product._id.substring(0, 8)}</h1>
            </li>
            <li>
              <label for="name">Nombre</label>
              <input type="text" name="name" value="${
                product.name
              }" id="name" />
            </li>
            <li>
              <label for="price">Precio</label>
              <input type="number" name="price" value="${
                product.price
              }" id="price" min="0" />
            </li>
            <li>
              <label for="image">Imagen (1156 x 1165)</label>
              <input type="text" name="image" value="${
                product.image
              }" id="image" />
              <input type="file" name="image-file" id="image-file" />
            </li>
            <li>
              <label for="discount">Descuento</label>
              <input type="number" name="discount" value="${
                product.discount
              }" id="discount" min="0" />
            </li>
            <li>
              <label for="countInStock">En Stock</label>
              <input type="number" name="countInStock" value="${
                product.countInStock
              }" id="countInStock" min="0" />
            </li>
            <li>
              <label for="category">Categoria</label>
              <select name="category" id="category">
                <option value="Llaveros" ${
                  product.category=='Llaveros'? "selected":""
                }>Llaveros</option>
                <option value="Peluches" ${
                  product.category=='Peluches'? "selected":""
                }>Peluches</option>
                <option value="Peluches Grandes" ${
                  product.category=='Peluches Grandes'? "selected":""
                }>Peluches Grandes</option>
                <option value="Peluches Pikachu" ${
                  product.category=='Peluches Pikachu'? "selected":""
                }>Peluches Pikachu</option>
                <option value="Sitting Cutties" ${
                  product.category=='Sitting Cutties'? "selected":""
                }>Sitting Cutties</option>
              </select>
            </li>
            <li>
              <label for="newSeason">Nueva temporada</label>
              <div>
                <input type="radio" id="si" name="newSeason" value="true" ${
                  product.newSeason? "checked":""
                }>
                <label for="si">Si</label><br>
              </div>
              <div>
                <input type="radio" id="no" name="newSeason" value="false" ${
                  product.newSeason? "":"checked"
                }>
                <label for="no">No</label>
              </div>
            </li>
            <li>
              <label for="description">Descripción</label>
              <textarea type="text" name="description" id="description" rows="5" >${
                product.description
              }</textarea>
            </li>
            <li>
              <button type="submit" class="primary-button">Actualizar</button>
            </li>
          </ul>
        </form>
      </div>

    </div>
    `;
  },
};
export default ProductEditScreen;
