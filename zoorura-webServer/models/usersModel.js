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
        id: {
        type: String,
        },

});

export const UsersModel = mongoose.model("UsersModel", usersSchema);

