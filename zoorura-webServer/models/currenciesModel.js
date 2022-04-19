import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const currenciesSchema = mongoose.Schema({ 

  
        usd:{
                type:Number,
                default:0.05
                },
        kshs:{
                type:Number, 
                default:5.77
                },
        inr:{
                type:Number,
                default:3.82
                }, 
        ngn:{
                type:Number,
                default:20.73
                },
        eur:{
                type:Number,
                default:0.046
                },
    


});

export const CurrenciesModel = mongoose.model("CurrenciesModel", currenciesSchema, "CurrenciesModel"); 

