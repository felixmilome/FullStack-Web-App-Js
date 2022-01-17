import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const convosSchema = mongoose.Schema({
        host: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'           
                 },
        members: [{ 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'           
                 }],
        title: {
                type: String,
                default:null
        },
        dpUrl:{
                type: String, 
                default: null           ///This will be Chat DP if public
        },
        createdOn: {
                type: Date,
                //default: new Date ()
                }, 
        updatedOn: {
                type: Date,
                default: new Date()
                }, 
        pinner: {
                type: Number,
                default:0
                },
        type:{
                type:String,
                default:null
        },
        approved:{
                type:Boolean,
                default: false
        },
        tip:{
                type:Number, 
                default:0
        }

});

export const ConvosModel = mongoose.model("ConvosModel", convosSchema, "ConvosModel"); 

