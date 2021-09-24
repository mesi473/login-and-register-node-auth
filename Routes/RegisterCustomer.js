const { UserModel, UserSchema } = require('../models/Users');
const bcrypt = require('bcrypt');
const { validateBody, createModel } = require('./toolFuntions');
const tokenMOdel = require('../models/tokens');
const types = require('../models/types');
const saltRounds = 10;
module.exports = async (req, res) => {

    const err = validateBody(req.body, UserSchema,"register");
    if (err)
        return res.status(400).send({
            error: err
        });
    else{
    const user = createModel(req.body, UserModel(), UserSchema);
    user.save().then(result => {
        
        res.redirect(307, '/login');
        // res.render('mainpage');
    }).catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000)
            res.status(400).send({
                error: 'duplicate',
                errorMessage: "Duplicated unique key was detected. This is because you have send a duplicated value for a uniqe attribute"
            });
        else {
            res.status(500).send({
                error: 'Internal Server Error'
            })
        }
    });
}
}
