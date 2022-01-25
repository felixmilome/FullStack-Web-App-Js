import {NotificationsModel} from "../models/notificationsModel.js";
import  mongoose  from "mongoose"; 

export const getNotifications = async  (req, res) => {
    const {id} = req.params;

    try{ 
        const notifications = await NotificationsModel.find({receiver: { $in: [ id ] } }).sort({"dateRank":-1})
        .populate('receiver', 'dpUrl userName')
        .populate('sender', 'dpUrl userName');
        console.log(notifications);
        res.status(200).json(notifications);

    } catch(error){
        res.status(404).json({message: error.message});
    }
 }

export const postNotifications = async  (req, res) => {
    const {id} = req.params;

    try{ 
        const{sender, receiver, type, body, link} = req.body;
            
        const newNotification = await NotificationsModel.create({sender, receiver, type, body, createdOn: new Date(), dateRank: Date.now(), link});

        res.status(200).json(newNotification);

    } catch(error){
        res.status(404).json({message: error.message});
    }
 }