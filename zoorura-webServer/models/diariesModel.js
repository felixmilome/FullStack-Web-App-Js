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
    media:String,
    publicity: {
        type:String,
        default: 'Public'
    },
    tipsArray: [Number],  
    
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
    dateRank:{
        type: Number,
        default: (Date.now())/360000, //We will sum so that an extra point gains you 6 ahead minutes to shine.
    },
    tippers: [tipSchema],
    reviews: [reviewSchema],

});

export const DiariesModel = mongoose.model("DiariesModel", diariesSchema, "DiariesModel");

