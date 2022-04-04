import { UsersModel } from "../models/usersModel.js";
import {TipsModel} from "../models/tipsModel.js";
import {NotificationsModel} from "../models/notificationsModel.js";

    export const tipHandler =(amount, giverId, receiverId, postId, type)=>{
                
        try{
            //WITHDRAW DATAS==============-----------------------------------------

                const walletCut = 0 - amount;
                const withdrawalData = {type:`(${amount}) Tip On Convo`, receiverId:receiverId, postId:postId, amount:amount};
                const addedActivityPoints = 5 * amount;
                const newActivityPointsRecord =  {type:`(${amount}) Tip on Convo `, points: addedActivityPoints}
                const tippersActivityPoints = await UsersModel.findById(giverId, {_id:0, activityPointsTotal:1});
                const newActivityPointsTotal = tippersActivityPoints.activityPointsTotal + addedActivityPoints
                
                //RECORD TIP--------------
                
                const newTipCreated = await TipsModel.create({tipperId:giverId, tipperMiniProfile:giverId, receiverMiniProfile:receiverId, tippedPostId:postId, type:type, time:Date.now(), amount:amount});
                const newTip = await TipsModel.findById(newTipCreated._id)
                .populate('tipperMiniProfile', 'dpUrl userName');
                
    
                //ACTUAL WITHDRAWAL---------------
                
                const withdrawnTipper = await UsersModel.findByIdAndUpdate(giverId, { $push: { "withdrawals": withdrawalData, "wallet": walletCut, "activityPointsRecord": newActivityPointsRecord}, $set: {activityPointsTotal: newActivityPointsTotal}}, { new: true });
                console.log(withdrawnTipper._id);
        
            //DEPOSIT DATAS===============-------------------------------

                
                const unroundedTaxedAmount = amount - (amount/10);
                const walletPush = Math.trunc(unroundedTaxedAmount * Math.pow(10, 2)) / Math.pow(10, 2);
                const depositData = {type:`(${amount}) Tip on Convo`, giverId: giverId, postId:postId, amount:walletPush};
                
                
                
                //ACTUAL DEPOSIT---------------
                
                const depositedReceiver = await UsersModel.findByIdAndUpdate(receiverId, { $push: { "deposits": depositData, "wallet": walletPush}}, { new: true });
                console.log(depositedReceiver._id);

            return 'success';

        }catch(error){
  
            return error.message;

        }

    } 
    export const notificationHandler =  (userId,receiverId, body, type, tipAmount)=>{
        
        try{

            const unpopulatedNewNotification = await NotificationsModel.create({sender:userId, receiver:receiverId, receiverId:receiverId, tipAmount: tipAmount, body:body, read: false,  type:type, createdOn: new Date(), dateRank: Date.now()});
            const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
            .populate('sender', 'dpUrl userName');

            return newNotification;

        }catch (error){

            return error.message;

        }
    }