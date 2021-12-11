const express = require('express');
const {signup, signin, signout} = require('../../controller/admin/auth');
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();
const {requireSignin} = require('../../middlewares')



router.post('/admin/signin',validateSigninRequest ,isRequestValidated, signin)
router.post('/admin/signup',validateSignupRequest , isRequestValidated, signup);
router.post('/admin/signout',signout )



module.exports = router;    