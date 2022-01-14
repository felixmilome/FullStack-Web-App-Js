import mongoose from 'mongoose';
const Schema = mongoose.Schema;


        const withdrawalSchema = mongoose.Schema({
                type:{type:String},
                receiver:{type:String},
                receiverId:{type:String},
                title:{type:String},
                postId:{type:String},
                amount:{type:String},
                time: {
                        type: Date,
                        default: new Date()
                },
        })

        const depositSchema = mongoose.Schema({
                type:{type:String},
                giver:{type:String},
                giverId:{type:String},
                title:{type:String},
                diaryId:{type:String},
                amount:{type:String},
                time: {
                        type: Date,
                        default: new Date()
                },
        })
        const activitiesSchema = mongoose.Schema({
                type:{type:String},
                points:{type:Number},
                time: {
                        type: Date,
                        default: new Date()
                },
        })

    //===========MAIN USER============================

const usersSchema = mongoose.Schema({
        name: {
                type: String,
                required: true
                },
        userName: {
                type: String,
                required: true
                }, 

        email: {
                type: String,
                required: true
                },
        dpUrl: {
                type: String,
                default: "./assets/images/avatar.png"
                },  
        password: {
                type: String,
                required: true
                },
        wallet: [Number],
        time: {
                type: Date,
                default: new Date()
        },
        verified:{
                type: Boolean,
                default: false,
        },
        verCode: {
                type: String,
        },
        verTime: {
                type: Number,
                required: parseInt(Date.now()),
        },
        verExpiry: {
                type: Date,
                required: true,
        },   
        activityPointsTotal:{
                type: Number,
                default: 10
        },
        dailyLogin:{
                type:Number,
                default: parseInt(Date.now()),
        },
        jwtExpiry:{
                type:String,
                default: "12h"
                
        },
        lastLogin:{
                type:Date,
                default: Date.now()
        },
        follows: [{ 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'
            
            }], 
        followers: [{ 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'  
            }],
        activityRecord:[activitiesSchema],
        withdrawals:[withdrawalSchema],
        deposits:[depositSchema],



});

export const UsersModel = mongoose.model("UsersModel", usersSchema, "UsersModel"); 

