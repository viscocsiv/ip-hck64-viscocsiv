const { Product } = require('../models');

class ProductController {
    static async getAllProducts(req, res, next) {
        try {
            let products = await Product.findAll({
                where: {
                    inStock: true
                }
            });
            // console.log(products);
            res.status(200).json(products)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;