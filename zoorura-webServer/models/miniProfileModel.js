import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messagesSchema = mongoose.Schema({
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'UsersModel',  
                },
 
        dpUrl: {
                type: String,
                default: null,
                required:true
                },       
        userName: {
                type: Date,
                default: new Date()
                }, 

});

export const MessagesModel = mongoose.model("MessagesModel", messagesSchema, "MessagesModel"); 

