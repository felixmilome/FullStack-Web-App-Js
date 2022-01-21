import {MessagesModel} from "../models/messagesModel.js";
import  mongoose  from "mongoose"; 

export const postMessage = async  (req, res) => {
    const{convoId, senderId, receiverId, body, publicity} = req.body
    console.log(req.body);
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
            res.status(404).send({message: error.message});
        } 
 }
 export const getMessages = async  (req, res) => {
    const{convoId} = req.params
    console.log(convoId);
    console.log('getMessage active');
        try{ 
           
                const messages = await MessagesModel.find({convoId: { $in: [ convoId ] } });
                console.log("Message inCONVO: "+ messages);
                res.status(200).json(messages); 
            } 
            
        catch(error){
            res.status(404).send({message: error.message});
        } 
 }