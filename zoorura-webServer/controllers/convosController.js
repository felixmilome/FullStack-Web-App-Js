import {ConvosModel} from "../models/convosModel.js";
import  mongoose  from "mongoose"; 

export const postConvo = async  (req, res) => {
    const{members, publicity} = req.body
    try{ 
         const newConvo = await ConvosModel.create({$push: { members: {$each: [members]}}, $set: {publicity: publicity}});
         console.log("Convo Created: "+ newConvo);
         res.status(200).json(newConvo);  
         
    } catch(error){
        res.status(404).json({message: error.message});
    }
 }