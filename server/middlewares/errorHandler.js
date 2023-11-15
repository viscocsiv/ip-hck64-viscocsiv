'use strict';

const errorHandler = (err, req, res, next) => {
    // console.log(err);
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message: err.errors[0].message });
            break;
        case "InvalidParams":
            res.status(400).json({ message: 'Invalid params' });
        case "InvalidInput":
            res.status(400).json({ message: `${err.field} is required` });
            break;
        case "ValidationError":
            res.status(400).json({ message: 'File should not be empty' });
            break;
        case "InvalidQueryParams":
            res.status(400).json({ message: 'Invalid Query Params' });
            break;
        case "Unauthenticated":
            res.status(401).json({ message: 'Invalid Email or Password' });
            break;
        case "JsonWebTokenError":
            res.status(401).json({ message: "Invalid Token" });
            break;
        case "NotFound":
            res.status(404).json({ message: "Error Not Found" });
            break;
        default:
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
            break;
    }
};

module.exports = errorHandler;