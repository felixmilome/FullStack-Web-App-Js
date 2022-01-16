import {MessagesModel} from "../models/messagesModel.js";
import  mongoose  from "mongoose"; 

export const postMessage = async  (req, res) => {
    const{convoId, senderId, receiverId, body, publicity} = req.body
    try{ 
        if (convoId === null)
        {
            const newConvo = await ConvosModel.create({$push: { members: {$each: [senderId, receiverId]}}, $set: {publicity: publicity}});
            const newMessage = await MessagesModel.create({convoId: newConvo._id, senderId, receiverId, body});
            console.log("New Convo Message Created: "+ newMessage);
            res.status(200).json(newMessage); 
        }else{
            const newMessage = await MessagesModel.create({convoId, senderId, receiverId, body});
            console.log("Message Added to Convo: "+ newMessage);
            res.status(200).json(newMessage); 
        } 
         
    } catch(error){
        res.status(404).json({message: error.message});
    }
 }