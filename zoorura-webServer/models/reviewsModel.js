import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({
    reviewerId:{
        type:String
    },
    reviewerMiniProfile: {
        type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    },  
    reviewedMiniProfile: {
        type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    }, 
    reviewedPostId: {
        type: String,
    }, 
    body:{
        type:String
    },
    time: {
        type: Date,
        default: new Date()
    },
    tips: {
        type:Number,
        default: null,
    }
});

export const ReviewsModel = mongoose.model("ReviewsModel", tipsSchema, "ReviewsModel");