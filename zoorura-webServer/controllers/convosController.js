import {ConvosModel} from "../models/convosModel.js";
import {MessagesModel} from "../models/messagesModel.js";
import {NotificationsModel} from "../models/notificationsModel.js";
import  mongoose  from "mongoose"; 
import { UsersModel } from "../models/usersModel.js";

export const getConvos = async  (req, res) => {
    const{id} = req.params;
    console.log(id);
    try{ 
        const convos = await ConvosModel.find({$and: [{members: { $in: [ id ] }}, {approved: { $in: [ true ] }}] }).sort({"dateRank":-1})
        .populate('host', 'dpUrl userName')
        .populate('guest', 'dpUrl userName')
        .populate('members', 'dpUrl userName');
       // console.log(convos);
        res.status(200).json(convos);  
        
   } catch(error){
       res.status(404).json({message: error.message});
   }
 };

 export const postConvo = async  (req, res) => {
    const{type, members,tip} = req.body;
    // console.log('TYPE: ' + type);
    // console.log('MEMBERS: ' + members);
    // console.log("tip: "+ tip);
    try{  

        if (type === '2'){

            const{host, guest, members, type, tip, intro} = req.body;

            const editedGuest = await UsersModel.findByIdAndUpdate(guest, { $push: { "convoRequesters": req.userId }});
            const guestMiniProfile = await UsersModel.findById(editedGuest._id, {userName:1, dpUrl:1, follows:1, followers:1, blockers:1, blocked:1, bio:1, postTotal:1, convoTip:1, convoRequesters:1});

         
            
            if (tip>0){
                const newConvo = await ConvosModel.create({members:members, guest:guest, host: req.userId, createdOn: new Date(), approved:true, dateRank: Date.now(), type: type, tip:tip});
                const introMessage = await MessagesModel.create({convoId:newConvo._id, senderId: newConvo.host, receiverId:newConvo.guest, body: intro });
                const newConvoPopulated = await ConvosModel.findById(introMessage.convoId)
                .populate('host', 'dpUrl userName')
                .populate('guest', 'dpUrl userName')
                .populate('members', 'dpUrl userName');
                const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:guest, receiverId:guest, tipAmount:tip, body:intro, postId:newConvo._id, read: false,  type: 'tipConvo' , createdOn: new Date(), dateRank: Date.now()});
                const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                .populate('sender', 'dpUrl userName');

                res.status(200).json({miniProfile:guestMiniProfile, newNotification: newNotification, newConvo:newConvoPopulated});
            } 

            else if (tip===0){
                const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:guest, receiverId:guest, tipAmount:tip, body:intro, read: false,  type:  'freeConvo', createdOn: new Date(), dateRank: Date.now()});
                const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                .populate('sender', 'dpUrl userName');

                res.status(200).json({miniProfile:guestMiniProfile, newNotification: newNotification});
            } 
           
            

         } else if(type === 'many') {

            const{host, members, title, dpUrl, type} = req.body;
            const newConvo = await ConvosModel.create({host: host, members:members, guest:null, title:title, dpUrl:dpUrl, createdOn: new Date(), dateRank: Date.now(), type: type, tip:tip});   
                console.log("Convo Created: "+ newConvo);
                res.status(200).json(newConvo);  
         } else {
             console.log("error")
            res.status(400).json("Dont Manipulate HTML");  
         }
         
    } catch(error){
        console.log(error.message);
    }
 };