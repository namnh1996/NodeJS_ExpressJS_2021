const express = require('express');
const router = express.Router();
const constroller = require('../controllers/product.constroller');

router.get('/', constroller.index);

module.exports = router