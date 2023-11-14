'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const routers = require('./routes')
const cors = require('cors')

// middleware body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// router-level middleware
app.use(routers);

module.exports = app;