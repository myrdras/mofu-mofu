import express from 'express';
import cors from 'cors';
import data from './data';
import mongoose from 'mongoose';
import config from './config';

function convertToTitleCase(str) {
  if (!str) { return "" }
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => {
  console.log('Connected to mongodb.');
})
.catch((error) => {
  console.log(error.reason);
});

const app = express();
app.use(cors());


app.get("/api/products", (req, res) => {
  res.send(data.products);
})
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find(x=>x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
app.get('/api/category/:id', (req, res) => {
  const cat = convertToTitleCase(req.params.id).replaceAll('-', ' ');
  const productList = data.products.filter(x=>x.category === cat);
  if (productList) {
    res.send(productList);
  } else {
    res.status(404).send({ message: cat + ' Products Not Found' });
  }
});
app.listen(5000, () => {
  console.log("server at http://localhost:5000");
});