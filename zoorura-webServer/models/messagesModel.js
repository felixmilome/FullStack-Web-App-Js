import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messagesSchema = mongoose.Schema({
        convoId:{
                type:String
                },
        senderId: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'           
                 },
        receiverId: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'           
                },
        body: {
                type: Date,
                default: new Date()
                },       
        createdOn: {
                type: Date,
                default: new Date()
                }, 

});

export const MessagesModel = mongoose.model("MessagesModel", messagesSchema, "MessagesModel"); 

