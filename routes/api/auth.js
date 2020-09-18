const express = require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Bring The User Model
const User = require('../../models/User');

// Route : POST api/auth
// Desc : post a auth user only 
// Access : Public
router.post('/',(req,res)=>{
    const {email,password} = req.body;
    // Validation
    if(!email || !password){
        return res.status(400).json({msg:'Please enter all the fields'});
    }

    // Check If The User Exists
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(400).json({msg:'User Does Not Exists'});
        }else{
            bcrypt.compare(password,user.password)
            .then(isMatch => {
                if(!isMatch){
                    return res.status(400).json({msg:'Wrong Password'});
                }
                const sessUser = {
                    id:user.id,
                    username:user.username,
                    email:user.email
                };
                req.session.user = sessUser;
                jwt.sign({
                    id:user.id
                },'project1',{expiresIn:3600},(err,token)=>{
                    if(err) throw err;
                    res.json({
                        token,
                        user:{
                            id:user.id,
                            name:user.name,
                            username:user.username,
                            email:user.email
                        }
                    });
                });
            });
        }
    });
});

// Route : GET api/verify/user
// Desc : GET user data
// Access : Private
router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
    .select('-password') // Disregard the password(not allowed to show)
    .then(user => res.json(user));
});


router.delete('/logout',(req,res)=>{
    req.session.destroy(err => {
        if(err) throw err;
        res.clearCookie('session-id');
        res.send('Logged out successfully');
    });
});

// Export router
module.exports = router;