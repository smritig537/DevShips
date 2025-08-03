const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    status:{
        type: String,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: '{VALUE} is not supported'

        },

    },
},
{timestamps: true}
);

connectionRequestSchema.pre("save",
    function(next){
        const connectionRequest = this;
        if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
            throw new Error("You cannot send a connection request to yourself");
        }
        next();
    }
    
)
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
const ConnectionRequestModel = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequestModel;