import mongoose from 'mongoose';
const tipSchema = mongoose.Schema({
    tipper: {
        type:String,
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
})

const reviewSchema = mongoose.Schema({
    reviewer: {
        type:String,
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
})

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
    tips: {
        type:Number,
        default: 0,
    },   
   
    reviewtotal:{
        type: Number,
        default: 0
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

export const DiariesModel = mongoose.model("DiariesModel", diariesSchema);

