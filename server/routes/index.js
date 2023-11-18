'use strict';

const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const AuthController = require('../controllers/AuthController');
const ProductController = require('../controllers/ProductController');
const OrderController = require('../controllers/OrderController');
const CartController = require('../controllers/CartController');
const PaymentController = require('../controllers/PaymentController');
const router = express.Router();

router.post('/login', AuthController.login);

router.post('/auth/google/callback', AuthController.googleLogin);

router.use(authentication);

router.get('/products', ProductController.getAllProducts);

router.post('/orders', OrderController.createOrder);

router.get('/orders/:OrderId', OrderController.getOrderDetail);

router.post('/orders/:OrderId/carts', CartController.addProductToCart);

router.get('/orders/:OrderId/carts', CartController.getCarts);

router.get('/orders/:OrderId/carts/:CartId', CartController.getCartDetail)

router.patch('/orders/:OrderId/carts/:CartId', CartController.editQuantity);

router.delete('/orders/:OrderId/carts/:CartId', CartController.deleteProductFromCart);

router.post("/payment/midtrans/token", PaymentController.midtransPayment)

router.use(errorHandler);

module.exports = router;