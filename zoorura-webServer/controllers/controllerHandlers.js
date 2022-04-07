import { UsersModel } from "../models/usersModel.js";
import {TipsModel} from "../models/tipsModel.js";
import {NotificationsModel} from "../models/notificationsModel.js";
import {DiariesModel} from "../models/diariesModel.js";

    export const tipHandler = async(amount, giverId, receiverId, postId, type)=>{
                
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
    export const notificationHandler =  async (userId,receiverId, body, type, tipAmount)=>{
        
        try{

            const unpopulatedNewNotification = await NotificationsModel.create({sender:userId, receiver:receiverId, receiverId:receiverId, tipAmount: tipAmount, body:body, read: false,  type:type, createdOn: new Date(), dateRank: Date.now()});
            const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
            .populate('sender', 'dpUrl userName');

            return newNotification;

        }catch (error){

            return error.message;

        }
    }
   
    export const getPopularDiariesHandler =  async ()=>{
        
        try{

            const diaries = await DiariesModel.aggregate([

                // { followers: { $in: userId } },
                
                { 
               
                    $lookup: {
        
                      from: 'UsersModel',
                      localField: 'diaryMiniProfile',
                      foreignField: '_id',
                      as: 'miniProfile',
        
                    },
                   
         
                },
                
                { 
                    $project: {
                        // "miniProfile.userName": 1,
                        // "miniProfile.dpUrl": 1,
                        
                        "miniProfile.name": 0, 
                         "miniProfile.email": 0, 
                         "miniProfile.tempEmail": 0,
                         "miniProfile.tempPassword": 0, 
                         "miniProfile.password": 0, 
                         "miniProfile.wallet": 0, 
                         "miniProfile.time": 0, 
                         "miniProfile.verified": 0, 
                        "miniProfile.profileVerified": 0,
                        "miniProfile.verCode": 0, 
                        "miniProfile.bio": 0,
                        "miniProfile.convoTip": 0,
                        "miniProfile.postTotal": 0,        
                         "miniProfile.verTime": 0, 
                         "miniProfile.verExpiry": 0,
                         "miniProfile.activityPointsTotal": 0,
                         "miniProfile.dailyLogin": 0,
                         "miniProfile.jwtExpiry": 0,  
                         "miniProfile.lastLogin": 0,
                         "miniProfile.follows": 0, 
                         "miniProfile.followers": 0,
                         "miniProfile.blocked": 0, 
                         "miniProfile.blockers": 0,
                         "miniProfile.activityPointsRecord": 0, 
                         "miniProfile.withdrawals": 0,
                         "miniProfile.deposits": 0,
                        
        
                        } 
                },
                { 
               
                    $lookup: {
        
                      from: 'UsersModel',
                      localField: 'displayerMiniProfile',
                      foreignField: '_id',
                      as: 'displayerMiniProfile',
        
                    },
                   
         
                },
                
                { 
                    $project: {
                        // "displayerMiniProfile.userName": 1,
                        // "displayerMiniProfile.dpUrl": 1,
                        "miniProfile.name": 0, 
                         "miniProfile.email": 0, 
                         "miniProfile.tempEmail": 0,
                         "miniProfile.tempPassword": 0, 
                         "miniProfile.password": 0, 
                         "miniProfile.wallet": 0, 
                         "miniProfile.time": 0, 
                         "miniProfile.verified": 0, 
                        "miniProfile.profileVerified": 0,
                        "miniProfile.verCode": 0, 
                        "miniProfile.bio": 0,
                        "miniProfile.convoTip": 0,
                        "miniProfile.postTotal": 0,        
                         "miniProfile.verTime": 0, 
                         "miniProfile.verExpiry": 0,
                         "miniProfile.activityPointsTotal": 0,
                         "miniProfile.dailyLogin": 0,
                         "miniProfile.jwtExpiry": 0,  
                         "miniProfile.lastLogin": 0,
                         "miniProfile.follows": 0, 
                         "miniProfile.followers": 0,
                         "miniProfile.blocked": 0, 
                         "miniProfile.blockers": 0,
                         "miniProfile.activityPointsRecord": 0, 
                         "miniProfile.withdrawals": 0,
                         "miniProfile.deposits": 0,
                        }  
                },
        
                { $addFields: 
                    { "avgRank": 
                        { $sum: [ "$dateRank",  {$sum: ["$tipsArray"]}, {$sum: ["$displaysArray"]} ] }
                    }
                },
               
        
                ]).sort({"avgRank":-1}).limit(40);

                return diaries;

        }catch (error){

            return error.message;

        }
    }

    export const getFollowedDiariesHandler =  async (userId)=>{
        
        try{

            const diaries = await DiariesModel.aggregate([

                // { followers: { $elemMatch: userId } },
                {
                    "$match": {
                      followers: {
                        $eq: userId
                      }
                    }
                  },
                
                { 
               
                    $lookup: {
        
                      from: 'UsersModel',
                      localField: 'diaryMiniProfile',
                      foreignField: '_id',
                      as: 'miniProfile',
        
                    },
                   
         
                },
                
                { 
                    $project: {
                        // "miniProfile.userName": 1,
                        // "miniProfile.dpUrl": 1,
                        
                        "miniProfile.name": 0, 
                         "miniProfile.email": 0, 
                         "miniProfile.tempEmail": 0,
                         "miniProfile.tempPassword": 0, 
                         "miniProfile.password": 0, 
                         "miniProfile.wallet": 0, 
                         "miniProfile.time": 0, 
                         "miniProfile.verified": 0, 
                        "miniProfile.profileVerified": 0,
                        "miniProfile.verCode": 0, 
                        "miniProfile.bio": 0,
                        "miniProfile.convoTip": 0,
                        "miniProfile.postTotal": 0,        
                         "miniProfile.verTime": 0, 
                         "miniProfile.verExpiry": 0,
                         "miniProfile.activityPointsTotal": 0,
                         "miniProfile.dailyLogin": 0,
                         "miniProfile.jwtExpiry": 0,  
                         "miniProfile.lastLogin": 0,
                         "miniProfile.follows": 0, 
                         "miniProfile.followers": 0,
                         "miniProfile.blocked": 0, 
                         "miniProfile.blockers": 0,
                         "miniProfile.activityPointsRecord": 0, 
                         "miniProfile.withdrawals": 0,
                         "miniProfile.deposits": 0,
                        
        
                        } 
                },
                { 
               
                    $lookup: {
        
                      from: 'UsersModel',
                      localField: 'displayerMiniProfile',
                      foreignField: '_id',
                      as: 'displayerMiniProfile',
        
                    },
                   
         
                },
                
                { 
                    $project: {
                        // "displayerMiniProfile.userName": 1,
                        // "displayerMiniProfile.dpUrl": 1,
                        "miniProfile.name": 0, 
                         "miniProfile.email": 0, 
                         "miniProfile.tempEmail": 0,
                         "miniProfile.tempPassword": 0, 
                         "miniProfile.password": 0, 
                         "miniProfile.wallet": 0, 
                         "miniProfile.time": 0, 
                         "miniProfile.verified": 0, 
                        "miniProfile.profileVerified": 0,
                        "miniProfile.verCode": 0, 
                        "miniProfile.bio": 0,
                        "miniProfile.convoTip": 0,
                        "miniProfile.postTotal": 0,        
                         "miniProfile.verTime": 0, 
                         "miniProfile.verExpiry": 0,
                         "miniProfile.activityPointsTotal": 0,
                         "miniProfile.dailyLogin": 0,
                         "miniProfile.jwtExpiry": 0,  
                         "miniProfile.lastLogin": 0,
                         "miniProfile.follows": 0, 
                         "miniProfile.followers": 0,
                         "miniProfile.blocked": 0, 
                         "miniProfile.blockers": 0,
                         "miniProfile.activityPointsRecord": 0, 
                         "miniProfile.withdrawals": 0,
                         "miniProfile.deposits": 0,
                        }  
                },
        
                { $addFields: 
                    { "avgRank": 
                        { $sum: [ "$dateRank",  {$sum: ["$tipsArray"]}, {$sum: ["$displaysArray"]} ] }
                    }
                },
               
        
                ]).sort({"avgRank":-1}).limit(10);

                return diaries;

        }catch (error){

            return error.message;

        }
    }

    export const getRandomDiariesHandler =  async ()=>{
        
        try{

            const diaries = await DiariesModel.find().limit(5)
            .populate('diaryMiniProfile', 'dpUrl userName');
            
            return diaries;

        }catch (error){

            return error.message;

        }
    }
    export const getUsersDiariesHandler =  async (userId)=>{
        
        try{

            const diaries = await DiariesModel.find( { creator: { $in: userId } }).sort({"dateRank":-1})
            .populate('diaryMiniProfile', 'dpUrl userName');
            
            return diaries;

        }catch (error){

            return error.message;

        }
    }

   