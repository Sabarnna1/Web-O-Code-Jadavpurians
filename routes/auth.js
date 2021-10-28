const express = require('express');
const {check, body} =require('express-validator')
const User=require('../models/user')
const bcrypt=require('bcryptjs');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', 
    check('email').isEmail().withMessage("Please enter a valid email").custom((value,{req})=>{
        return User.findOne({email:value}).then(userDoc=>{
            if(!userDoc)
            return Promise.reject("Email is not  present")
        });
    }).normalizeEmail() ,
    body('password',"Please enter a valid password of atleast 5 character").isLength({min:5}).isAlphanumeric().trim(),
 authController.postLogin);

router.post('/signup', 
    check('email').isEmail().withMessage("Please enter a valid email").custom((value,{req})=>{
        //console.log(value);
        return User.findOne({email:value}).then(userDoc=>{
            if(userDoc)
            return Promise.reject("Email is already present")
        });
    }).normalizeEmail() ,
    body('password',"Please enter a valid password of atleast 5 character").isLength({min:5}).isAlphanumeric().trim() ,
    body('confirmPassword').trim().custom((value,{req})=>{
        //console.log(value);
        if(value!==req.body.password){
            console.log(value+" "+req.body.password);
            throw new Error('Password do not match');
        }
        return true;
    }),
authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;