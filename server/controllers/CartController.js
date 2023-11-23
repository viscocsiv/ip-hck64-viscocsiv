'use strict';
const { Cart, Product, Order } = require('../models');

class CartController {
    static async addProductToCart(req, res, next) {
        try {
            const { id } = req.user;
            const { OrderId } = req.params

            if (isNaN(+OrderId)) throw { name: "InvalidParams" };

            const { ProductId } = req.body;
            const itemToAdd = await Cart.findOne({
                where: { ProductId, OrderId }
            })

            if (itemToAdd) throw { name: 'DuplicatedInput' };
            const cart = await Cart.create({
                UserId: id,
                ProductId, OrderId
            });

            const carts = await Cart.findAll({
                where: {
                    OrderId
                }, include: {
                    model: Product
                }
            })
            let totalPrice = 0;
            carts.forEach((cart) => {

                const { quantity } = cart
                totalPrice += quantity * cart.Product.price
            })
            await Order.update({ totalPrice }, {
                where: { id: OrderId }
            })

            res.status(201).json({ totalPrice, carts });
        } catch (error) {
            next(error);
        }
    }

    static async getCarts(req, res, next) {
        try {
            const { OrderId } = req.params;

            if (isNaN(+OrderId)) throw { name: "InvalidParams" };

            const carts = await Cart.findAll({
                where: {
                    OrderId
                },
                include: {
                    model: Product
                }
            });
            res.status(200).json(carts)
        } catch (error) {
            next(error)
        }
    }

    static async getCartDetail(req, res, next) {
        try {
            const { CartId } = req.params;

            if (isNaN(+CartId)) throw { name: "InvalidParams" };

            const cart = await Cart.findByPk(CartId, {
                include: [Product, Order]
            });

            if (!cart) throw { name: 'NotFound' };

            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    static async editQuantity(req, res, next) {
        try {
            const { OrderId, CartId } = req.params;

            if (isNaN(+OrderId) || isNaN(+CartId)) throw { name: "InvalidParams" };

            const { increment, decrement } = req.body;
            if (increment === 'increment') {
                const result = await Cart.increment('quantity', {
                    where: { id: CartId }
                });

            } else if (decrement === 'decrement') {
                const cart = await Cart.findByPk(CartId);

                if (cart.quantity === 1) throw ({ name: 'InvalidQuantity' })
                const result = await Cart.decrement('quantity', {
                    where: { id: CartId }
                });
            }

            const carts = await Cart.findAll({
                where: {
                    OrderId
                }, include: Product,
                order: [
                    ['id', 'asc']
                ]
            })
            let totalPrice = 0;
            carts.forEach((cart) => {
                const { quantity } = cart
                totalPrice += quantity * cart.Product.price
            })

            await Order.update({ totalPrice }, {
                where: { id: OrderId }
            })

            res.status(200).json({ totalPrice, carts });
        } catch (error) {
            next(error);
        }
    }

    static async deleteProductFromCart(req, res, next) {
        try {
            const { CartId, OrderId } = req.params

            await Cart.destroy({
                where: { id: CartId }
            });

            const carts = await Cart.findAll({
                where: {
                    OrderId
                }, include: Product
            })

            let totalPrice = 0;
            carts.forEach((cart) => {
                const { quantity } = cart
                totalPrice += quantity * cart.Product.price
            })

            await Order.update({ totalPrice }, {
                where: { id: OrderId }
            })
            res.status(200).json({ totalPrice, carts })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CartController;