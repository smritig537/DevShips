const express = require('express');
const app = express();
const User = require('./models/User');
require('./config/database');
require('./utils/validate');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');



app.use(express.json()); //agar mai express.json use nahi karti toh mere mongodb compass mai data blank save hota because its a middleware through which the body is going from postman and getting saved.
app.use(cookieParser()); //for reading cookies tokens

//sign up
app.post('/signup', async (req,res)=>{
// const user = new User(req.body);
validateSignupDate(req);
try{

    const {name, email, password} = req.body;

    //encrypting the password
    const poweredPassword = await bcrypt.hash(password, 10);
    console.log(poweredPassword);

const user = new User({
    name,
    email,
    password: poweredPassword  //this  will show the hashed password 
});
    
await user.save();
res.send("User added succesfully");
}
catch(e){
    console.log(e);
    res.status(400).send("Not added the user: ");
}
})

//find the user by email
app.post('/user', async (req, res) =>{
    const userEmail = req.body.email;
    const userId = req.body.id;
    const data = req.body;
    
    try{

        const isAllowedUpdate = ["userid","name","password","age","gender"];

       const isUpdateAllowed = Object.keys(data).every((k)   =>
       isAllowedUpdate.includes(k)
       );
       if(!isUpdateAllowed){
           return res.status(400).send("Update not allowed");
       }
       if(data?.gender.length >7){
           return res.status(400).send("Gender not allowed");
       }
        const users = await User.find({email: userEmail});
    
    if(users.Length === 0){
        res.status(404).send("User not found");
    }else{
        res.send(users);
    }

    }catch(e){
        res.status(400).send("Not added the user: ")
    }
})

app.get('/feed', async (req, res) =>{
    try{

       const users = await User.find({});
       res.send(users); 

    }catch(e){
        res.status(400).send("No user to be shown: " + error.message)    
    }
})

//delete the user
app.delete('/delete', async(req,res) => {

    const userId = req.body.id;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send(user);

    }catch(e){

        res.status(400).send("No user to be deleted: " + error.message);

    }


})

app.patch('/update', async(req , res)=>{
     const userId = req.body.id;
     const user = req.body;

     try{
        const users = await User.findByIdAndUpdate({_id:userId} , user, {
            returnDocument: "after",
            // runValidators: true
        });
        console.log(users);
        res.send(users);
        

     }catch(e){

        res.status(400).send("No user to be updated: " );
     }
})

//Login Api
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send("Invalid Credentials");
        }

        console.log("Entered password:", password);
        console.log("Stored password hash:", user.password);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {

            // create a jwt Token
            const token = jwt.sign({_id:user._id},"Smriti@Devships12&23");

            console.log(token);

            // Add The token to cookie and send the response back to the user
              res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });
            return res.send("Login Successful");
        } else {
            return res.status(401).send("Invalid Credentials2");
        }
        // if(!isPasswordValid){
        //     return res.status(401).send("Invalid Credentials");
        // }else{
             // create a jwt Token

            // Add The token to cookie and send the response back to the user
        //     return res.send("Login Successful");
        // }

    } catch (e) {
        console.error("Login error:", e);
        return res.status(500).send("Server Error");
    }
});

app.get('/profile', async (req, res) => {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
        return res.status(401).json({ error: "Token not found in cookies" });
    }

    try {
        const decodedMessage = jwt.verify(token, "Smriti@Devships12&23");
        console.log(decodedMessage);
        console.log(cookies);
        res.send("Reading cookies");
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        res.status(403).json({ error: "Invalid or expired token" });
    }
});


app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})
