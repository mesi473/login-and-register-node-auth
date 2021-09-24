const express = require('express');
const router = express();
require('./passport')
const LoginRoute = require('./LoginRoute');
const RegisterRoute = require('./RegisterCustomer');
const MainPageRoute = require('./main_page_route');


const passport = require('passport');




router.post("/register", RegisterRoute);
router.post("/login", LoginRoute);

router.get("/main-page", passport.authenticate('jwt', { session: false }, MainPageRoute));

module.exports = router;