import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const tipSchema = mongoose.Schema({
    tipMiniProfile: {
        type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    }, 
    tipperId:{
        type:String
    },
    time: {
        type: Date,
        default: new Date()
    },
    amount: {
        type:Number,
    },   
});

const reviewSchema = mongoose.Schema({
    reviewMiniProfile: {
        type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    },  
    reviewerId:{
        type:String
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
    },    
    tippers: [], 
});


const diariesSchema = mongoose.Schema({
    creator: String,
    name: String,
    title: String, 
    caption: String,
    file: String,
    publicity: {
        type:String,
        default: 'Public'
    },
    tips: [Number],  
    
    diaryMiniProfile: { 
            type: Schema.Types.ObjectId,
            ref: 'UsersModel'
        
        },
    
    displays:{
        type: Number,
        default: 0
    },
    time : {
        type: Date,
        default: new Date()

    }, 
    tippers: [tipSchema],
    reviews: [reviewSchema],

});

export const DiariesModel = mongoose.model("DiariesModel", diariesSchema, "DiariesModel");

