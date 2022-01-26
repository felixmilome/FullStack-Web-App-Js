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
        read: {
                type: Boolean,
                default: false,
        }, 
        type: {
                type: String,
        },       
        createdOn: {
                type: Date,
                default: new Date()
                }, 
        dateRank:{
                type: Number,
                default: Date.now()
        }

});

export const NotificationsModel = mongoose.model("NotificationsModel", notificationsSchema, "NotificationsModel"); 

