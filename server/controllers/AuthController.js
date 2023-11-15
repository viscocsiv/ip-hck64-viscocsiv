'use strict';
const { User } = require('../models');
const { comparePassword } = require('../helpers/bcryptjs');
const { createToken } = require('../helpers/jwt');

class AuthController {

    static async login(req, res, next) {
        try {
            // console.log(req.body);
            const { email, password } = req.body;

            // validate input
            if (!email) throw { name: "InvalidInput", field: "Email" };
            if (!password) throw { name: "InvalidInput", field: "Password" };

            // check if user exist
            const user = await User.findOne({ where: { email } });
            if (!user) throw { name: "Unauthenticated" };
            // check password
            const compared = comparePassword(password, user.password);
            if (!compared) throw { name: "Unauthenticated" };

            // create JWT
            const access_token = createToken({ id: user.id });

            // send response
            res.status(200).json({ access_token });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;