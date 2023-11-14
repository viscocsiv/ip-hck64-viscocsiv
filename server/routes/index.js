'use strict';

const express = require('express');

const router = express.Router();

router.get('/products');

router.post('/carts');

router.get('/carts/:cartId');

router.post('/carts/:cartId/items');

router.put('/carts/:cartId/items/itemId')

router.delete('/cars/cartId/')


module.exports = router;