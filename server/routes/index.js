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

router.post('/login', AuthController.login); // 1

router.post('/auth/google/callback', AuthController.googleLogin); // 2

router.use(authentication);

router.get('/products', ProductController.getAllProducts); // 3

router.post('/orders', OrderController.createOrder); // 4

router.get('/orders/:OrderId', OrderController.getOrderDetail); // 5

router.post('/orders/:OrderId/carts', CartController.addProductToCart); // 6

router.get('/orders/:OrderId/carts', CartController.getCarts); // 7

router.get('/orders/:OrderId/carts/:CartId', CartController.getCartDetail) // 8

router.patch('/orders/:OrderId/carts/:CartId', CartController.editQuantity); // 9

router.delete('/orders/:OrderId/carts/:CartId', CartController.deleteProductFromCart); // 10

router.post("/payment/midtrans/token", PaymentController.midtransPayment) // 11

router.use(errorHandler); // 12

module.exports = router;