'use strict';

const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const AuthController = require('../controllers/AuthController');
const ProductController = require('../controllers/ProductController');
const CartController = require('../controllers/OrderController');
const router = express.Router();

router.post('/login', AuthController.login);

router.use(authentication);

router.get('/products', ProductController.getAllProducts);

router.post('/orders', CartController.createOrder);

router.get('/orders/:OrderId');

router.post('/orders/:OrderId/carts');

router.put('/orders/:OrderId/carts/:CartId');

router.delete('/orders/:OrderId/carts/:CartId');

router.use(errorHandler)

module.exports = router;