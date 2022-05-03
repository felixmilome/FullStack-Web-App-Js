import {TipsModel} from "../models/tipsModel.js";
import {UsersModel} from "../models/usersModel.js";
import {MessagesModel} from "../models/messagesModel.js";
import {ReviewsModel} from "../models/reviewsModel.js";
import {DiariesModel} from "../models/diariesModel.js";
import {NotificationsModel} from "../models/notificationsModel.js";
import  mongoose  from "mongoose";


export const getTips =  async (req, res)=> {

    const{postId} = req.params
 
        try{ 
           
                const tips = await TipsModel.find({tippedPostId: { $in: [ postId ] } })
                .populate('tipperMiniProfile', 'dpUrl userName');
                res.status(200).json(tips); 
            } 
            
        catch(error){
            res.status(404).send({message: error.message});
        } 

}

export const postTip = async  (req, res) => {

    const{receiverId, tippedPostId, type, amount} = req.body
    
    console.log(req.body);
    console.log(req.userId);
        try{ 
                if (amount < 0 || amount > 200 || !mongoose.Types.ObjectId.isValid(receiverId) || !mongoose.Types.ObjectId.isValid(tippedPostId)) {
                    res.status(400).send({message: "Validation Error"});
                    console.log('validation Error');
                }else{

                    //WITHDRAW DATAS==============-----------------------------------------

                            const walletCut = 0 - amount;
                            const withdrawalData = {type:`(${amount}) Tip On ${type}`, receiverId: receiverId, postId: tippedPostId, amount:amount};
                            const addedActivityPoints = 5 * amount;
                            const newActivityPointsRecord =  {type:`(${amount}) Tip on ${type}`, points: addedActivityPoints}
                            const tippersActivityPoints = await UsersModel.findById(req.userId, {_id:0, activityPointsTotal:1});
                            const newActivityPointsTotal = tippersActivityPoints.activityPointsTotal + addedActivityPoints
                            
                            //RECORD TIP--------------
                            
                            const newTipCreated = await TipsModel.create({tipperId:req.userId, tipperMiniProfile:req.userId, receiverMiniProfile:receiverId, tippedPostId:tippedPostId, type:type, time:Date.now(), amount:amount});
                            const newTip = await TipsModel.findById(newTipCreated._id)
                            .populate('tipperMiniProfile', 'dpUrl userName');
                            
                            //console.log(newTip);
                            //ACTUAL WITHDRAWAL---------------
                            
                            const withdrawnTipper = await UsersModel.findByIdAndUpdate(req.userId, { $push: { "withdrawals": withdrawalData, "wallet": walletCut, "activityPointsRecord": newActivityPointsRecord}, $set: {activityPointsTotal: newActivityPointsTotal}}, { new: true });
                            console.log(withdrawnTipper._id);
                     
                    //DEPOSIT DATAS===============-------------------------------

                           
                            
                            const unroundedTaxedAmount = amount - (amount/10);
                            const walletPush = Math.trunc(unroundedTaxedAmount * Math.pow(10, 2)) / Math.pow(10, 2);
                            const depositData = {type:`(${amount}) Tip on ${type}`, giverId: req.userId, postId: tippedPostId, amount:walletPush};
                            
                            //ACTUAL DEPOSIT---------------
                            
                            const depositedReceiver = await UsersModel.findByIdAndUpdate(receiverId, { $push: { "deposits": depositData, "wallet":walletPush}}, { new: true });
                            console.log(depositedReceiver._id); 
                            if (type === 'message'){
 
                                   const tippedMessage = await MessagesModel.findByIdAndUpdate(tippedPostId, {$set: {"tipAmount": walletPush}}, { new: true });
                                   //{ $push: { "tipsArray": walletPush, "tippers": req.userId}},
                                   
                                   const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:receiverId, receiverId:receiverId, tipAmount:walletPush, postId:tippedMessage._id, body:tippedMessage.body, read: false, class:'tip',  type:  'messageTip', createdOn: new Date(), dateRank: Date.now()});
                                   const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                                   .populate('sender', 'dpUrl userName');
                                   
                                   res.json({newTip:newTip, tippedMessage:tippedMessage, newNotification:newNotification}); //POPULate like the ones below
 

                            }
                            else if (type === 'review'){

                                const reviewVerify = await ReviewsModel.findById(tippedPostId, {reviewerId:1});
                                console.log(reviewVerify);
                                
                                if(reviewVerify.reviewerId === receiverId){ 

                                    const unpopulatedTippedReview = await ReviewsModel.findByIdAndUpdate(tippedPostId, { $push: { "tipsArray": walletPush, "tippers": req.userId}}, { new: true });
                                    const tippedReview = await ReviewsModel.findById(unpopulatedTippedReview._id)
                                    .populate('reviewerMiniProfile', 'dpUrl userName');

                                    const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:receiverId, receiverId:receiverId, tipAmount:walletPush, postId:tippedReview._id, body:tippedReview.body, read: false, class:'tip',  type:  'reviewTip', createdOn: new Date(), dateRank: Date.now()});
                                   const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                                   .populate('sender', 'dpUrl userName');
 
                                     res.json({newTip:newTip, tippedPost:tippedReview, newNotification:newNotification});
                                     console.log(newTip);
                                     
                                }
                                

                            }
                            else if (type === 'post'){

                                const diaryVerify = await DiariesModel.findById(tippedPostId, {creator:1});
                                
                                if(diaryVerify.creator === receiverId){

                                   // const userId = req.userId;

                                    const unpopulatedTippedDiary = await DiariesModel.findByIdAndUpdate(tippedPostId, { $push: { "tipsArray": walletPush, "tippers": req.userId}}, { new: true });
                                    const tippedDiary = await DiariesModel.findById(unpopulatedTippedDiary._id)
                                   .populate('diaryMiniProfile', 'dpUrl userName');

                                   const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:receiverId, receiverId:receiverId, tipAmount:walletPush, postId:tippedDiary._id, body:tippedDiary.title, read: false,class:'tip',  type:  'diaryTip', createdOn: new Date(), dateRank: Date.now()});
                                   const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                                   .populate('sender', 'dpUrl userName');

                                    res.json({newTip:newTip, tippedPost:tippedDiary, newNotification:newNotification});
                                    console.log(newTip);
                                }
                                

                            }
                            else if (type === 'displayNotificationTip'){

                           
                                
                          

                                    const unpopulatedTippedNotification = await NotificationsModel.findByIdAndUpdate(tippedPostId, {$set: {"tipped": true}}, { new: true });
                                    const tippedNotification = await NotificationsModel.findById(unpopulatedTippedNotification._id)
                                    .populate('sender', 'dpUrl userName followers'); 

                                    const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:receiverId, receiverId:receiverId, tipAmount:walletPush, postId:tippedNotification._id, body:tippedNotification.body, read: false, class:'tip',  type:  'displayNotificationTip', createdOn: new Date(), dateRank: Date.now()});
                                   const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                                   .populate('sender', 'dpUrl userName');
 
                                     res.json({newTip:newTip, tippedPost:tippedNotification, newNotification:newNotification});
                                     console.log(newTip);
                                     
                         
                                

                            }

                            
                } 
  
            
        } catch(error){
            console.log(error.message);
        } 
 }
