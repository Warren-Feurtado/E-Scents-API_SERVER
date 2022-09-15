
require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { mongoose } = require('./lib/db');
const path = require('path');

//ROUTERS
const productRouter = require('./routes/products.route');
const brandRouter = require('./routes/brands.route');
const adminRouter = require('./routes/admin.route');
const cartRouter = require('./routes/cart.route');
const orderRouter = require('./routes/orders.route');
const subscriberRouter = require('./routes/subscriber.route');

//EXPRESS MIDDLEWARE SETUP
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));


//ROUTES
app.use('/products', productRouter);
app.use('/brands', brandRouter);
app.use('/admin', adminRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/subscribers', subscriberRouter);

//SERVER PORT SETUP
const port = process.env.PORT || 2000;
const server = app.listen(port, () => console.log(`Server Listening on Port: ${port}...`));
