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
        id: {
                type: String,
        },
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
        activityPoints:[Number],
        dailyLogin:{
                type:Number,
                default: parseInt(Date.now()),
        },
        jwtExpiry:{
                type:String,
                
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
        withdrawals:[withdrawalSchema],
        deposits:[depositSchema],



});

export const UsersModel = mongoose.model("UsersModel", usersSchema, "UsersModel"); 

