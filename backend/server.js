import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config';
import uploadRouter from './routers/uploadRouter';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import categoryRouter from './routers/categoryRouter';

mongoose.connect(config.MONGODB_URL).then(() => {
  console.log('Connected to mongodb.');
}).catch((error) => {
  console.log(error);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/category', categoryRouter);

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(config.PORT, () => {
  console.log("server at http://localhost:"+config.PORT);
});
