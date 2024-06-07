const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

const userRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const categoryRouter = require('./routes/category');
const cartsRouter = require('./routes/carts');
const likesRouter = require('./routes/likes');
const ordersRouter = require('./routes/orders');

const cors = require("cors");
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  credentials : true
};

app.use(cors(corsOptions));

app.use('/users', userRouter);
app.use('/books',booksRouter);
app.use('/category',categoryRouter);
app.use('/likes',likesRouter);
app.use('/carts', cartsRouter);
app.use('/orders',ordersRouter);
