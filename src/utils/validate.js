const { error } = require('console');
const validator = require('validator');

validateSignupDate = (req) =>{
    const {name, email, password, about, age, gender} = req.body;

    if(!name || !email || !password  || !age || !gender){
        throw error('All the fields are required');
    }
    else if(!validator.isEmail(email)){
        throw error('Invalid Email');
    }
    console.log(req.body);

}
