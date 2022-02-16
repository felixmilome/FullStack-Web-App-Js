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
    

        try{ 
                if (amount < 0 || amount > 200 || !mongoose.Types.ObjectId.isValid(receiverId)) {
                    res.status(404).send({message: "error"});
                }else{

                    //WITHDRAW DATAS==============-----------------------------------------

                            const walletCut = 0 - amount;
                            const withdrawalData = {type:`(${amount}) Tip On ${type}`, receiverId: receiverId, postId: tippedPostId, amount:amount};
                            const addedActivityPoints = 5 * amount;
                            const newActivityPointsRecord =  {type:`(${amount}) Tip on ${type}`, points: addedActivityPoints}
                            const tippersActivityPoints = await UsersModel.findById(req.userId, {_id:0, activityPointsTotal:1});
                            const newActivityPointsTotal = tippersActivityPoints.activityPointsTotal + addedActivityPoints
                            
                            //RECORD TIP--------------

                            const newTip = await TipsModel.create({tipperId:req.userId, tipperMiniProfile:req.userId, receiverMiniProfile:receiverId, tippedPostId:tippedPostId, type:type, time:Date.now(), amount:amount})
                            .populate('tipperMiniProfile', 'dpUrl userName');
                            
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
                               
                               if(messageVerify.senderId === receiverId){
                                    await MessagesModel.findByIdAndUpdate(tippedPostId, { $push: { "tipsArray": taxedAmount}}, { new: true });
                               }

                            }
                            else if (type === 'review'){

                                const reviewVerify = await MessagesModel.findById(tippedPostId, {reveiwerId:1});
                                
                                if(reviewVerify.reveiwerId === receiverId){
                                    await ReviewsModel.findByIdAndUpdate(tippedPostId, { $push: { "tipsArray": taxedAmount}}, { new: true });
                                }

                            }
                            else if (type === 'post'){

                                const diaryVerify = await DiariesModel.findById(tippedPostId, {creator:1});
                                
                                if(diaryVerify.creator === receiverId){
                                    await DiariesModel.findByIdAndUpdate(tippedPostId, { $push: { "tipsArray": taxedAmount}}, { new: true });
                                }

                            }

                            res.json(newTip);
                } 
  
            
        } catch(error){
            res.status(404).send({message: error.message});
        } 
 }
