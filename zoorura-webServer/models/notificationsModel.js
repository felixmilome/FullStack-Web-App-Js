import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationsSchema = mongoose.Schema({
 
        sender: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel',        
                 },
        receiver: { 
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
        body: {
            type: String,
            default: null,
            required:true
            }, 

});

export const NotificationsModel = mongoose.model("NotificationsModel", notificationsSchema, "NotificationsModel"); 

