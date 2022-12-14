const express = require('express');
const router = express.Router();
const upload = require('../middleware/product-upload.middleware')
const {
    getAllProducts,
    addNewProduct,
    getProductById,
    UpdateProduct,
    getMenColognes,
    getWomenPerfumes,
    getUnisexFragrances,
    deleteProduct
 } = require('../controllers/product.controller');

router.route('/')
.get(getAllProducts)
// .post(upload.single('imageSrc'), addNewProduct);
.post(addNewProduct);

router.route('/men').get(getMenColognes);
router.route('/women').get(getWomenPerfumes);
router.route('/unisex').get(getUnisexFragrances);

router.route('/:id')
.get(getProductById)
.patch( UpdateProduct)
.delete(deleteProduct);

module.exports = router;