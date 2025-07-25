const mongoose = require('mongoose');
const { validatorErrorSymbol } = require('mongoose/lib/helpers/symbols');
const validator = require('validator');
const UserSchema = new mongoose.Schema({
    id:{
        type: String,

    },
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
       validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Invalid Email' + value);
        }
       }
    },
    password: {
        type: String,
        // validate(value){
        //     if(validator.isStrongPassword(value)){
        //         throw new Error('Weak Password')
        //     }
        // }
        
    },
    about:{
        type: String,
        default: "I am a user",
    },
    age:{
        type: Number,
        min:18,     
        // validate(value){
        //     if(!validatorErrorSymbol.isInt(value)){
        //         throw new Error('Invalid Age')
        //     }
        // }  
    },
    gender:{
        type: String,
        validate(value){
            if(!['Male', 'Female','male', 'female', 'Other'].includes(value)){
                throw new Error('Invalid Gender') //works with every post request::
            }
        },
    }
});


module.exports = mongoose.model('User', UserSchema);