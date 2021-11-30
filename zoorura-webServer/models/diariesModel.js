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
    tippers: [tipSchema]
    ,
    reviews: { 
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

});

export const DiariesModel = mongoose.model("DiariesModel", diariesSchema);
export const TipModel = mongoose.model("TipModel", tipSchema);

//export default DiariesModel;
