const express = require('express');
const requestRouter = express.Router();

const User = require('../models/User');
require('../config/database');
require('../utils/validate');
const authUser = require('../Middlewares/auth');
const ConnectionRequest = require('../models/connectionRequests');

requestRouter.post('/sendConnection', authUser , async(req,res)=>{ 
    console.log("sending connection request");
    res.send("Connection request sent"); 
     
});


requestRouter.post('/user', async (req, res) =>{
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

requestRouter.get('/feed', async (req, res) =>{
    try{

       const users = await User.find({});
       res.send(users); 

    }catch(e){
        res.status(400).send("No user to be shown: " + error.message)    
    }
})

//delete the user
requestRouter.delete('/delete', async(req,res) => {

    const userId = req.body.id;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send(user);

    }catch(e){

        res.status(400).send("No user to be deleted: " + error.message);

    }


})

requestRouter.patch('/update', async(req , res)=>{
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

requestRouter.post('/request/send/interested/:toUserId', authUser, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status is required in request body" });
        }

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        // Check if a request already exists in either direction
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ error: "Connection request already exists" });
        }

        const newRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await newRequest.save();

        res.json({
            message: "Connection request sent successfully",
            data
        });

    } catch (e) {
        console.error("Error sending connection request:", e.message);
        res.status(400).json({ error: "Failed to send connection request" });
    }
});



module.exports = requestRouter;