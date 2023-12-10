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
        //showLoading();
        const data = await updateProduct({
          _id: request.id,
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          image: document.getElementById('image').value,
          discount: document.getElementById('discount').value,
          category: document.getElementById('category').value,
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
      <div>
        <a href="/#/productlist">Back to products</a>
      </div>
      <div class="form-container">
        <form id="edit-product-form">
          <ul class="form-items">
            <li>
              <h1>Edit Product ${product._id.substring(0, 8)}</h1>
            </li>
            <li>
              <label for="name">Name</label>
              <input type="text" name="name" value="${
                product.name
              }" id="name" />
            </li>
            <li>
              <label for="price">Price</label>
              <input type="number" name="price" value="${
                product.price
              }" id="price" />
            </li>
            <li>
              <label for="image">Image (680 x 830)</label>
              <input type="text" name="image" value="${
                product.image
              }" id="image" />
              <input type="file" name="image-file" id="image-file" />
            </li>
            <li>
              <label for="discount">Descuento</label>
              <input type="number" name="discount" value="${
                product.discount
              }" id="discount" />
            </li>
            <li>
              <label for="countInStock">Count In Stock</label>
              <input type="text" name="countInStock" value="${
                product.countInStock
              }" id="countInStock" />
            </li>
            <li>
              <label for="category">Category</label>
              <input type="text" name="category" value="${
                product.category
              }" id="category" />
            </li>
            <li>
              <label for="newSeason">Nueva temporada</label>
              <input type="radio" id="si" name="newSeason" value="true" ${
                product.newSeason? "checked":""
              }>
              <label for="si">Si</label><br>
              <input type="radio" id="no" name="newSeason" value="false" ${
                product.newSeason? "":"checked"
              }>
              <label for="no">No</label>
            </li>
            <li>
              <label for="description">Description</label>
              <input type="text" name="description" value="${
                product.description
              }" id="description" />
            </li>
            <li>
              <button type="submit" class="primary">Update</button>
            </li>
          </ul>
        </form>
      </div>

    </div>
    `;
  },
};
export default ProductEditScreen;
