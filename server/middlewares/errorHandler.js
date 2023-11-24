'use strict';

const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message: err.errors[0].message });
            break;
        case "SequelizeDatabaseError":
            res.status(400).json({ message: 'Please click new order first' })
            break;
        case "InvalidParams":
            res.status(400).json({ message: 'Invalid params' });
        case "InvalidQuantity":
            res.status(400).json({ message: 'Minimum quantity is 1. If you want to delete an item from cart, click delete button' })
        case "InvalidInput":
            res.status(400).json({ message: `${err.field} is required` });
            break;
        case "DuplicatedInput":
            res.status(400).json({ message: 'Product is already in the cart' });
            break;
        case "InvalidQueryParams":
            res.status(400).json({ message: 'Invalid Query Params' });
            break;
        case "Unauthenticated":
            res.status(401).json({ message: 'Invalid Email or Password' });
            break;
        case "InvalidToken":
        case "JsonWebTokenError":
            res.status(401).json({ message: "Invalid Token" });
            break;
        case "NotFound":
            res.status(404).json({ message: "Data Not Found" });
            break;
        default:
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
            break;
    }
};

module.exports = errorHandler;