'use strict';

const express = require('express');

const router = express.Router();

router.get('/');

router.use('/products');

router.post('/');


module.exports = router;