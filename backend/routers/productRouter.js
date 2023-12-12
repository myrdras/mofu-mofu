import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import slugify from 'slugify';
import { isAuth, isAdmin } from '../utils';
import Product from '../models/productModel';

const productRouter = express.Router();
productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: 'i',
          },
        }
      : {};
    const products = await Product.find({ ...searchKeyword });
    res.send(products);
  })
);
productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
  })
);
productRouter.get(
  '/slug/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.find({slug: req.params.id});
    res.send(product[0]);
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample Product',
      image: './assets/bg-gray.jpg',
      description: 'sample desc',
      category: 'Peluches',
      slug: 'sample-product',
    });
    let count = await Product.countDocuments({ slug: new RegExp(`${product.slug}-\\d+$`) })+1;
    product.slug += `-${count++}`;
    const createdProduct = await product.save();
    if (createdProduct) {
      res
        .status(201)
        .send({ message: 'Product Created', product: createdProduct });
    } else {
      res.status(500).send({ message: 'Error in creating product' });
    }
  })
);
productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.image = req.body.image;
      product.description = req.body.description;
      product.category = req.body.category;
      product.newSeason = req.body.newSeason;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;
      product.discount = req.body.discount;
      product.slug = slugify(req.body.name, { strict: true, lower: true });
      const originalSlug = product.slug;
      let count = 0;
      let slugExist = await Product.countDocuments({ slug: product.slug });
      while (slugExist) {
        product.slug = `${originalSlug}-${count++}`;
        slugExist = await Product.countDocuments({ slug: product.slug });
      }
      const updatedProduct = await product.save();
      if (updatedProduct) {
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(500).send({ message: 'Error in updaing product' });
      }
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.send({ message: 'Product Deleted', product: product });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
