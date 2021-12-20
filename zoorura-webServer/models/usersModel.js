import mongoose from 'mongoose';


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
        password: {
                type: String,
                required: true
                },
        wallet: {
                type:Number,
                default: 100000,
                min: 0
                },
        withdrawals:[withdrawalSchema],
        deposits:[depositSchema],
        id: {
        type: String,
        },
        time: {
                type: Date,
                default: new Date()
        },


});

export const UsersModel = mongoose.model("UsersModel", usersSchema);

