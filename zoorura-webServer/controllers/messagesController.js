import {MessagesModel} from "../models/messagesModel.js";
import {ConvosModel} from "../models/convosModel.js";
import {NotificationsModel} from "../models/notificationsModel.js";
import  mongoose  from "mongoose"; 

export const postMessage = async  (req, res) => {
    const{convoId, senderId, receiverId, body, file, type, publicity} = req.body
    console.log(req.body);
        try{ 
            // if (convoId === null)
            // {
            //     const newConvo = await ConvosModel.create({$push: { members: {$each: [senderId, receiverId]}}, $set: {publicity: publicity}});
            //     const newMessage = await MessagesModel.create({convoId: newConvo._id, senderId, receiverId, body, type:'text'});
            //     console.log("New Convo Message Created: "+ newMessage);
            //     res.status(200).json(newMessage);  //done in CONVO CREATE CONTRL

            // }else{
                const newMessage = await MessagesModel.create({convoId:convoId, senderId:senderId, receiverId:receiverId, body:body, file:file, type:type, createdOn:new Date(), dateRank: Date.now()});
                console.log("Message Added to Convo: "+ newMessage); 

                 
                const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:receiverId, receiverId:receiverId, body:body, postId:convoId, read: false, class:'message',  type: 'message', createdOn: new Date(), dateRank: Date.now()});
                const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                .populate('sender', 'dpUrl userName'); 

                res.status(200).json({newMessage:newMessage, newNotification:newNotification});
               
            // }  
            
        } catch(error){
            res.status(404).send({message: error.message});
            console.log(error.message);
        } 
 }
 export const getMessages = async  (req, res) => {
    const{convoId} = req.params
    console.log(convoId);
    console.log('getMessage active'); 
        try{ 
           
                const messages = await MessagesModel.find({convoId: { $eq:convoId} }).sort({"dateRank":-1}).limit(200).sort({"dateRank":1}); // sort in descending... then ascending
                console.log("Message inCONVO: "+ messages);
                res.status(200).json(messages);  
            } 
            
        catch(error){
            res.status(404).send({message: error.message});
        } 
 }
 export const readMessages = async  (req, res) => {
    const{id} = req.params
    
    console.log('read message');
        try{ 
           
            const message = await MessagesModel.findByIdAndUpdate(id, { $set: {read:true}}, { new: true });
                console.log("Message inCONVO: "+ message);
                res.status(200).json(message); 
            } 
            
        catch(error){
            res.status(404).send({message: error.message});
            console.log(error.message);
        } 
 }