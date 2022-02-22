import {TipsModel} from "../models/tipsModel.js";
import {UsersModel} from "../models/usersModel.js";
import {MessagesModel} from "../models/messagesModel.js";
import {ReviewsModel} from "../models/reviewsModel.js";
import {DiariesModel} from "../models/diariesModel.js";
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

                     
                    //DEPOSIT DATAS===============-------------------------------

                            const walletAdd = amount;
                            const depositData = {type:`(${amount}) Tip on ${type}`, giverId: req.userId, postId: tippedPostId, amount:amount};
                            const unroundedTaxedAmount = amount - (amount/10);
                            const taxedAmount = Math.trunc(unroundedTaxedAmount * Math.pow(10, 2)) / Math.pow(10, 2);
                            
                            //ACTUAL DEPOSIT---------------
                            
                            const depositedReceiver = await UsersModel.findByIdAndUpdate(receiverId, { $push: { "deposits": depositData, "wallet": walletAdd}}, { new: true });
                            
                            if (type === 'message'){

                               const messageVerify = await MessagesModel.findById(tippedPostId, {senderId:1});
                               
                               if(messageVerify.senderId === receiverId){ // prevent user from post Stealing using Id
                                   const tippedMessage = await MessagesModel.findByIdAndUpdate(tippedPostId, { $push: { "tipsArray": taxedAmount, "tippers": req.userId}}, { new: true });
                                   res.json(newTip); //POPULate like the ones below
                                }

                               

                            }
                            else if (type === 'review'){

                                const reviewVerify = await ReviewsModel.findById(tippedPostId, {reviewerId:1});
                                console.log(reviewVerify);
                                
                                if(reviewVerify.reviewerId === receiverId){ 

                                    const unpopulatedTippedReview = await ReviewsModel.findByIdAndUpdate(tippedPostId, { $push: { "tipsArray": taxedAmount, "tippers": req.userId}}, { new: true });
                                    const tippedReview = await ReviewsModel.findById(unpopulatedTippedReview._id)
                                    .populate('reviewerMiniProfile', 'dpUrl userName');
 
                                     res.json({newTip:newTip, tippedPost:tippedReview});
                                     console.log(newTip);
                                    
                                }
                                

                            }
                            else if (type === 'post'){

                                const diaryVerify = await DiariesModel.findById(tippedPostId, {creator:1});
                                
                                if(diaryVerify.creator === receiverId){

                                   // const userId = req.userId;

                                    const unpopulatedTippedDiary = await DiariesModel.findByIdAndUpdate(tippedPostId, { $push: { "tipsArray": taxedAmount, "tippers": req.userId}}, { new: true });
                                    const tippedDiary = await DiariesModel.findById(unpopulatedTippedDiary._id)
                                   .populate('diaryMiniProfile', 'dpUrl userName');

                                    res.json({newTip:newTip, tippedPost:tippedDiary});
                                    console.log(newTip);
                                }
                                

                            }

                            
                } 
  
            
        } catch(error){
            res.status(404).send({message: error.message});
        } 
 }
