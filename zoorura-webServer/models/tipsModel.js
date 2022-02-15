import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tipsSchema = mongoose.Schema({

    tipperId:{
        type:String,
    }
    tipperMiniProfile: {
        type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    },
    receiverMiniProfile:{
         type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    },
    tippedPostId: {
        type: String,
    },
    time: {
        type: Date,
        default: new Date()
    },
    amount: {
        type:Number,
    },   
});

export const TipsModel = mongoose.model("TipsModel", tipsSchema, "TipssModel"); 

