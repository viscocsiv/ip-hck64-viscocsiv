'use strict';
const { User } = require('../models');
const { comparePassword } = require('../helpers/bcryptjs');
const { createToken, verifyToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

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
            res.status(200).json({ access_token, userId: user.id });
        } catch (error) {
            next(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { code } = req.body

            const client = new OAuth2Client();

            const ticket = await client.verifyIdToken({
                idToken: code,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload()
            const { email, sub, name } = payload;

            const user = await User.findOrCreate({ where: { email, password: sub, fullName: name } });

            const access_token = createToken({ id: user[0].id })

            res.status(200).json({ access_token, userId: user[0].id });
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    }
}

module.exports = AuthController;