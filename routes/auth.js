var express = require('express')
var router = express.Router()
const { body, validationResult } = require('express-validator');
const {signout,signup,signin,donation, donationGet} =  require('../controllers/auth')

router.post("/signup", [
    body("name").isLength({min:3 }) .withMessage(' name must be at least 3 chars long'),
    body("email").isEmail().withMessage("email is required"),
    body("password").isLength({min:3 }).withMessage(' password must be at least 3 chars long')

], signup)



router.post("/signin", [
    body("email").isEmail().withMessage("email is required"),
    body("password").isLength({min:3 }).withMessage(' password must be at least 3 chars long')

], signin)

router.get("/signout",signout)

router.get("/donationGet",donationGet)

router.post("/donation"
    


,donation)

module.exports = router