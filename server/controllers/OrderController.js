'use strict';

const { Order } = require('../models');

class OrderController {
    static async createOrder(req, res, next) {
        try {
            const { id } = req.user
            const order = await Order.create({});
            // console.log(order);
            res.status(201).json({ created: true, OrderId: order.id, UserId: id });
        } catch (error) {
            next(error);
        }
    }

    static async getOrderDetail(req, res, next) {
        try {
            // console.log(req.params);
            const { OrderId } = req.params;
            if (isNaN(+OrderId)) throw { name: "InvalidParams" };
            const order = await Order.findByPk(OrderId);
            if (!order) throw { name: 'NotFound' };
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrderController;