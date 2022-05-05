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
                }, 
        file: {
                type: String,
                default: null, 
                },
        type: {
                type: String,
                default: null,
                },       
        createdOn: {
                type: Date,
                required:true
                }, 
        dateRank:{
                type: Number,
                required:true
        },
        tipAmount:{
                type: Number,
                default: 0
        },
        read:{
                type: Boolean,
                default: false,
        },
   
        tipsArray:[Number]


});

export const MessagesModel = mongoose.model("MessagesModel", messagesSchema, "MessagesModel"); 

