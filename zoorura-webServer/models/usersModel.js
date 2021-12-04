import mongoose from 'mongoose';

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
                max: 100000,
                min: 0
                },
        withdrawals:[],
        deposits:[],
        id: {
        type: String,
        },


});

export const UsersModel = mongoose.model("UsersModel", usersSchema);

