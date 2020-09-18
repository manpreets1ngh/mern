const mongoose=require('mongoose');

// Craete Emp Schema

let EmpSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        reuired:true
    },
    city:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    job_title:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }
});

let Emp = module.exports = mongoose.model('Emp',EmpSchema);