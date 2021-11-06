import mongoose from 'mongoose';

const diariesSchema = mongoose.Schema({
    title: String,
    caption: String,
    file: String,
    publicity: {
        type:String,
        default: 'Public'
    },
    tips: {
        type: Number,
        default: 0
    },
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

const DiariesModel = mongoose.model("DiariesModel", diariesSchema);

export default DiariesModel;
