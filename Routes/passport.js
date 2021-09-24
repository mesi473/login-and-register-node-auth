const passport = require('passport');
const { UserModel } = require('../models/Users');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'customer_login_secret'
},
    (jwtPayload, cb) => {
        cb(null, jwtPayload);
    }
))
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        UserModel.findOne({
            email: email
        },
            (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user)
                    return done(null, false, { error: 'Incorrect Email' });
                if (!bcrypt.compareSync(password, user.password))
                    return done(null, false, { error: 'Incorrect password' });
                return done(null, user);
            }
        )
    }
))