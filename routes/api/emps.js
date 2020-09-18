const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Emp = require('../../models/Emp');

// GET api/emps
// GET emps
// public
router.get('/',(req,res)=>{
    Emp.find()
    .then(emps => res.json(emps))
})

// POST api/emps
// Create a POST
// public     
router.post('/',(req,res)=>{
    const newEmp = new Emp({
        name:req.body.name,
        address:req.body.address,
        city:req.body.city,
        salary:req.body.salary,
        job_title:req.body.job_title,
        mobile:req.body.mobile
    });
    newEmp.save().then(emp => res.json(emp));
    let findArgs = {};
    console.log(req.body.filters)
    for (let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === 'salary'){

            }else{
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    Emp.find(findArgs)          
    .skip(skip)
    .limit(limit)
    .exec((err,emps)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,emps})                              
    })
});

router.get('/search',ensureAuthenticated,(req,res)=>{
    Emp.findById(req.emp.id)
    .skip(skip)
    .limit(limit) // Disregard the password(not allowed to show)
    .then(emp => res.json(emp));
});

// Access Control
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('danger','Please Login');
        res.redirect('/search');
    }
}


module.exports = router;
