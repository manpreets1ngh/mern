const express = require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Bring The User Model
const User = require('../../models/User');

// Route : GET api/users
// Desc : GET a user
router.get('/',(req,res)=>{
    res.send('Hello EveryOne');
});

// Route : POST api/users
// Desc : To Register a new user
router.post('/',(req,res)=>{
    const {fullname,username,email,password} = req.body;
    // Validation
    if(!fullname || !username || !email || !password){
        return res.status(400).json({msg:'Please enter all the fields'});
    }

    // Check If The User Exists
    User.findOne({email})
    .then(user => {
        if(user){
            return res.status(400).json({msg:'User Already Exists'});
        }else{
            const newUser = new User({
                fullname,
                username,
                email,
                password
            });
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password=hash;
                    newUser.save()
                    .then(user => {
                        jwt.sign({
                            id:user.id
                        },'project1',{expiresIn:3600},(err,token)=>{
                            if(err) throw err;
                            res.json({
                                token,
                                user:{
                                    id:user.id,
                                    fullname:user.fullname,
                                    username:user.username,
                                    email:user.email
                                }
                            });
                        });
                    });
                });
            });
        }
    });
});


// Export router
module.exports = router;