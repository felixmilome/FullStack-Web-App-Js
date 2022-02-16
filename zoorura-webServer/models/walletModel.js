import mongoose from 'mongoose';
const Schema = mongoose.Schema;


        const withdrawalSchema = mongoose.Schema({
                type:{type:String},
                receiverId:{type:String},
                tippedPostId:{type:String},
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
        });
        const walletSchema = mongoose.Schema({
            userId: { 
                type: Schema.Types.ObjectId,
                ref: 'UsersModel'  
            },
            withdrawals:[withdrawalSchema],
            deposits:[depositSchema],
            amount:{type:Number},
            giverId:{type:String},
            title:{type:String},
            diaryId:{type:String},
            amount:{type:String},
            time: {
                    type: Date,
                    default: new Date()
            },
        });