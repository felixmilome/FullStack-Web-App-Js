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
                type: String
        },
        dpUrl:{
                type: String, 
                default: null           ///This will be Chat DP if public
        },
        createdOn: {
                type: Date,
                default: new Date ()
                }, 
        updatedOn: {
                type: Date,
                default: new Date()
                }, 
        pinner: {
                type: String,
                default:null
                },
        publicity:{
                type:String,
                default:null
        },
        approved:{
                type:Boolean,
                default: false
        }

});

export const ConvosModel = mongoose.model("ConvosModel", convosSchema, "ConvosModel"); 

