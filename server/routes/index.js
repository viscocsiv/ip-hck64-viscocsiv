'use strict';

const express = require('express');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const AuthController = require('../controllers/AuthController');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.post('/login', AuthController.login);

router.use(authentication);

router.get('/products', ProductController.getAllProducts);

router.post('/carts');

router.get('/carts/:cartId');

router.post('/carts/:cartId/items');

router.put('/carts/:cartId/items/itemId');

router.delete('/carts/cartId/items/itemId');

router.use(errorHandler)

module.exports = router;