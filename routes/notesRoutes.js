const express = require('express')
const router = express.Router()
const path = require('path');
const { getAllProductss, createProductss,updateProductss, deleteProductss } = require('../Controllers/productController');



router.route('/')
.get(getAllProductss)
.post(createProductss)

router.route('/:id')
.patch(updateProductss)
.delete(deleteProductss )


module.exports = router;