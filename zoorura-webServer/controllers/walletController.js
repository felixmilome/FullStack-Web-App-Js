import {UsersModel} from "../models/usersModel.js";
import { currenciesConverterHandler } from "./controllerHandlers.js";



export const getWallet = async  (req, res) => {
    const userId = req.userId;
    console.log({userId});
    try{ 
        const userWalletArrayObj = await UsersModel.findById(userId, {_id:0, wallet:1});
        const walletArray = userWalletArrayObj.wallet;
        console.log(walletArray);
        const walletValueConverted = await currenciesConverterHandler(walletArray)
        
        console.log(walletValueConverted); 
       
        res.status(200).json(walletValueConverted);    
         
   } catch(error){
   
       console.log(error.message);  
   }
 };

 