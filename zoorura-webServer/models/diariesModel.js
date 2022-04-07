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
    diaryMiniProfile: { 
        type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    
    },
    postType:{
        type:String,
    },
    publicity: {
        type:String,
        default: 'public'
    },
    tipsArray: [Number],

    originalId:{ //for displays
        type:String,
        default:null
    },
    displayerMiniProfile:{
        type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    },

    displayTime: {
        type: Date,
        default: new Date()
    }, 

    displayable: {
        type:Boolean,
        default: true
    }, 
    
    displaysArray:[{ 
        type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    }],
    time : {
        type: Date, 
        default: new Date()
    }, 
    dateRank:{
        type: Number,
        default: (Date.now())/360000, //We will sum so that an extra point gains you 6 minutes ahead to shine.
    },
    tippers: [String],
    reviewers: [String],
    followers: [],

});

export const DiariesModel = mongoose.model("DiariesModel", diariesSchema, "DiariesModel");

