const jwt = require('jsonwebtoken');

const authUser = async(req,res,next) => {

    //read the tokens from the req cookies
    const {token} = req.cookies;

    const decodeObj = jwt.verify(token, "Smriti@Devships12&23");
    req.user = decodeObj;
    next();
}