import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messagesSchema = mongoose.Schema({
        convoId:{
                type:String,
                required:true
                },
        senderId: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel',        
                 },
        receiverId: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'           
                }, 
        body: {
                type: String,
                default: null,
                required:true
                },       
        createdOn: {
                type: Date,
                default: new Date()
                }, 
        dateRank:{
                type: Number,
                default: Date.now()
        },
        tipsArray:[Number]

});

export const MessagesModel = mongoose.model("MessagesModel", messagesSchema, "MessagesModel"); 

