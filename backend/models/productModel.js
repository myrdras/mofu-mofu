import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    newSeason: { type: Boolean, default: false, required: true },
    price: { type: Number, default: 0.0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    discount: { type: Number, default: 0, required: true },
    slug: { type: String, required: true, unique: true, }
  },
  { timestamps: true }
);
const Product = mongoose.model('Product', productSchema);
export default Product;
