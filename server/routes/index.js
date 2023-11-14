'use strict';

const express = require('express');

const router = express.Router();

router.get('/products');

router.get('/transactions');

module.exports = router;