'use strict';
const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
    try {
        
        const { authorization } = req.headers;

        if (!authorization) throw { name: "Unauthenticated" };

        const rawToken = authorization.split(' ');
        if (rawToken.length < 2) {
            throw { name: "Unauthenticated" };
        }

        if (rawToken[0] !== "Bearer") {
            throw { name: "Unauthenticated" };
        }

        const token = rawToken[1];

        const payload = verifyToken(token);

        const user = await User.findByPk(payload.id);
        if (!user) {
            throw { name: "Unauthenticated" }
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authentication;