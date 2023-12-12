import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';

function convertToTitleCase(str) {
  if (!str) { return "" }
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

const categoryRouter = express.Router();

categoryRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const cat = convertToTitleCase(req.params.id).replaceAll('-', ' ');
    const productList = await Product.find({category: cat});
    if (productList) {
      res.send(productList);
    } else {
      res.status(404).send({ message: cat + ' Products Not Found' });
    }
  })
);

export default categoryRouter;