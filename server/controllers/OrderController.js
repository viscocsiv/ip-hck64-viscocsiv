const { Order } = require('../models');

class CartController {
    static async createOrder(req, res, next) {
        try {
            const order = await Order.create({});
            console.log(order);
            res.status(201).json({ created: true, OrderId: order.id,  });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CartController;