
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { validateBody, createModel } = require('./toolFuntions');
const { UserModel, UserSchema } = require('../models/Users');
module.exports = LoginRoute = (req, res) => {

    const err = validateBody(req.body, UserSchema, "login");
    if (err)
        return res.status(400).send({
            error: err
        });
    else{
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).send({
                error: 'Login failed',
                errorStackTrace: err
            });
        }
        req.login(user, { session: false }, err => {
            if (err) return res.status(500).send({
                error: err
            });
        })
        const token = jwt.sign(user.toJSON(), 'customer_login_secret');
        return res.send({
            user, token
        })
    })(req, res);
    }
}