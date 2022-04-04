import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationsSchema = mongoose.Schema({
 
        sender: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel',
                required:true       
                 },
        receiver: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel',
                required:true          
                }, 
        receiverId: {
                type: String,
                default: null,
        },
        body: {
                type: String,
                default: null,
                }, 
        postId: {
                type: String,
                default: null
        },
        postTitle: {
                type: String,
                default: null,
        },
        tipAmount: {
                type: String,
                default: null,
        },
        read: {
                type: Boolean,
                default: false,
        }, 
        type: {
                type: String,
                required:true
        },
        class:{
                type:String,
                required:true
                
        },
        link: {
                type: String,
                default: null
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

