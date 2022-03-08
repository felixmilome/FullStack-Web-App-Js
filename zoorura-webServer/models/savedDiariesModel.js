import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const savedDiariesSchema = mongoose.Schema({
    saverId:{
         type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    },
    diaryMiniData: {
        type: Schema.Types.ObjectId,
        ref: 'DiariesModel'
    },  
    originalOwnerMiniProfile: {
        type: Schema.Types.ObjectId,
        ref: 'UsersModel'
    }, 
 
    time: {
        type: Date,
        default: Date.now()
    },
  
});

export const SavedDiariesModel = mongoose.model("SavedDiariesModel", savedDiariesSchema, "SavedDiariesModel");