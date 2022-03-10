import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const activitylogSchema = mongoose.Schema({ 
    
        actor: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'           
                 },
        act: {
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'   
                },
   
        postId: {
                type: String,
                default:null
        },
        type:{
                type:String,
                default:null
        },
        dateRank:{
                type:Number,
                default: Date.now(),
                required:true
        },
        time:{
                type:Date, 
                default:new Date,
                required:true
        }

});

export const ActivitylogModel = mongoose.model("ActivitylogModel", activitylogSchema, "ActivitylogModel"); 

