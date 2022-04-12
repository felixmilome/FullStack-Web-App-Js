import  mongoose  from "mongoose"; 
import {DiariesModel} from "../models/diariesModel.js";
import {UsersModel} from "../models/usersModel.js";
import {ReviewsModel} from "../models/reviewsModel.js";
import {SavedDiariesModel} from "../models/savedDiariesModel.js";
import {TipsModel} from "../models/tipsModel.js";

import { taxer } from "../functions.js";
import {NotificationsModel} from '../models/notificationsModel.js';
import { getPopularDiariesHandler, getFollowedDiariesHandler, getRandomDiariesHandler, getUsersDiariesHandler  } from "./controllerHandlers.js";

//Search area: display
 
//Get  Diariessss===========================================
export const getDiaries = async  (req, res) => {
   try{ 
       
    const user = await UsersModel.findById(req.userId, {id: 1});
    console.log(user);
    const popularDiaries = await getPopularDiariesHandler();
    const followedDiaries = await getFollowedDiariesHandler(user._id);
    const randomDiaries = await getRandomDiariesHandler();

        res.status(200).json({followedDiaries, popularDiaries, randomDiaries});
    

        
   } catch(error){
       res.status(404).json({message: error.message});
       console.log(error.message);
   }
}

export const getUsersDiaries = async  (req, res) => {
    try{ 
    
        const{userId} = req.body;
        const usersDiaries = await getUsersDiariesHandler(userId);
     
         res.status(200).json(usersDiaries);
     
 
         
    } catch(error){

        res.status(404).json({message: error.message});
        console.log(error.message);
    }
 }








// OTHER DIARY CONTROLLERS+++++++++++++++++++++









//Post  Diariessss===========================================
export const postDiaries =  async (req, res)=> {

        const diary = req.body; 
        console.log(req.body);
        console.log(diary.type);
        console.log(diary.originalId); 
        
    try{
        const user = await UsersModel.findById(req.userId); 
        const  newPostSpam = user.postSpam + 1;
        if(newPostSpam > 10){

            res.json('Spam');

        }else {  

                if (diary.type === 'diary' && !diary.tags?.length < 21
                 && diary.title.length > 0 && diary.title.length < 50
                 && diary.caption.length > 0 && diary.caption.length < 500){
                    const newDiary = new DiariesModel({...diary,  creator: req.userId, postType: diary.type, diaryMiniProfile: req.userId, followers:user.followers, tags:diary?.tags, time: new Date().toISOString(), dateRank: (Date.now()/360000) }); //time is for updates
                    try{
                        await newDiary.save();

                       const updatedUser = await UsersModel.findByIdAndUpdate(req.userId, { $set: {postSpam:newPostSpam}}, { new: true });
                      
                        res.status(201).json(newDiary);

                    console.log(newDiary);
                    console.log(updatedUser);
                } catch(error){
                    res.status(409).json({message:error.message});
                    console.log(error.message);
                } 
                } else if (diary.type === 'display'){
                    
                        if(mongoose.Types.ObjectId.isValid(diary.originalId)){
                            
                            try{

                                const displayedDiary = await DiariesModel.findByIdAndUpdate(diary.originalId, { $push: { "displaysArray": req.userId }}, { new: true });
                                console.log(displayedDiary);
                                
                                // const displayedDiary = await DiariesModel.findById(unpopulatedDisplayedDiary._id)
                                // .populate('displaysArray', 'userName');

                                const newDisplay = new DiariesModel({creator:req.userId, title:displayedDiary.title, caption:displayedDiary.caption, file:displayedDiary.file, media:displayedDiary.media,
                                diaryMiniProfile:displayedDiary.diaryMiniProfile, postType: 'display', publicity:'public', followers:user.followers, tags:[], originalId: diary.originalId, displayerMiniProfile:req.userId, displayTime: Date.now(), displayable: false, 
                                    displaysArray: [], time: displayedDiary.time, dateRank: (Date.now()/360000),tippers:[], reviewers:[], displaysArray:[]});   
                                
                                    console.log(newDisplay); 
                            
                                    await newDisplay.save();

                                    const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:displayedDiary.creator, receiverId:displayedDiary.creator, body:displayedDiary.title, postId:newDisplay._id, read: false, class:'normal',  type: 'display', createdOn: new Date(), dateRank: Date.now()});
                                    const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                                    .populate('sender', 'dpUrl userName');

                                   

                                    res.json({newDisplay:newDisplay, newNotification:newNotification});

                                    //res.status(201).json({newDisplay:newDisplay, displayedDiary:displayedDiary});
                                    //console.log(newDisplay); 

                        } catch(error){

                            res.status(409).json({message:error.message});

                        }

                        } else  {
                                console.log('error');
                        }
                
                
                }
        }
    }catch(error){
        res.status(409).json({message:error.message});
        console.log(error.message);
    }

}



//Patch  Diariessss===========================================
export const patchDiaries = async (req, res) =>{
    const{id} = req.params;
    const newDiary=req.body;
    
  

    try{
        const oldDiary = await DiariesModel.findById(id);
        const user = await UsersModel.findById(req.userId);
        const  newPostSpam = user.postSpam + 1;
        if(newPostSpam > 10){

            res.json('Spam');

        }else if(newPostSpam <10 && newDiary.title.length>0 && newDiary.title.length<50
            && newDiary.caption.length>0 && newDiary.caption.length<500 
            && oldDiary.creator === req.userId
            ){

                const patchedDiary = await DiariesModel.findByIdAndUpdate(id, { $set: {title:newDiary.title, caption:newDiary.caption}}, { new: true });
               const updatedUser = await UsersModel.findByIdAndUpdate(req.userId, { $set: {postSpam:newPostSpam}}, { new: true });
               console.log({patchedDiary});
               console.log({updatedUser}) 
               res.json('Success');
                console.log('Updated');

        }else if(newPostSpam >10){

                res.json('Spam');
                console.log('Updated');

        }
            
    }catch(error){
        res.status(409).json({message:error.message});
        console.log(error.message);
    }

}


//Delete  Diariessss===========================================
export const deleteDiaries = async (req,res) =>{
    const {id} = req.params;
    const requester = req.userId;
   const diary = await DiariesModel.findById(id);
   const creator = diary.creator;

   console.log(requester); 
   console.log(creator); 

   if (requester === creator) {

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");
    await DiariesModel.findByIdAndRemove(id);
    await ReviewsModel.deleteMany({'reviewedPostId': id});
    await SavedDiariesModel.deleteMany({'diaryId': id});
    await TipsModel.deleteMany({'tippedPostId:': id});
    await DiariesModel.deleteMany({'originalId:': id});
    console.log("Diary Deleted!")
    res.json({message: "Post Deleted Successfully"});

   }


}



//Tip  Diariessss===========================================
export const tipDiaries = async (req,res) => {

//     const{id} = req.params;
//     console.log("id: " + id);
    

//     const tipperData = req.body;
//     const tipper = tipperData.tipper;
//     const tipperId = tipperData.tipperId;
//     const amount = tipperData.amount;
    
//     const tax = taxer(amount);
//     const netAmount = amount - tax;
   
    
//     if (!req.userId) return res.json({message: 'Unauthorized'});
 
   
//     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");

//     if(amount > 0 && amount < 51){
    
//    const diary = await DiariesModel.findById(id);
//    console.log("diary: " + diary);

//    const tippers = diary.tippers;

    
   
    
//     // Withdrawal from Giver/Requester//---------------------------

//        const giver = await UsersModel.findById(tipperId);
//         console.log("giverObject: " + giver);
 
//        try{ 
//        const givers_Wallet = giver.wallet;
//        const givers_Points = giver.activityPointsTotal; 
 
//        const withdrawalData = {type:'diarytip', receiver:diary.name, receiverId: diary.creator, title:diary.heading, postId: id, amount: amount};
//         const walletCut = 0 - amount;
//        const added_Points_Giver = 5 * amount;
//        const activityRecording = {type: `(${amount}) Tip On Post Points`, points: added_Points_Giver}
//        const giverAddedPoints = (givers_Points + added_Points_Giver);
//     //    const walletCutted = (givers_Wallet - amount).toFixed(2);
//     //    const giverAddedPoints = (givers_Points + (50 * amount));
//     //    console.log("withdrawalDataType: " + withdrawalData.type);

//     //    console.log("walletCutted: "+ walletCutted);
//     //    console.log("giverAddedTotal: "+ giverAddedPoints);

//   // const withdrawnGiver = await UsersModel.findByIdAndUpdate(tipperId, { $push: { "withdrawals": withdrawalData}, $set: { wallet: walletCutted, activityPoints: giverAddedPoints}}, { new: true });
//   const withdrawnGiver = await UsersModel.findByIdAndUpdate(tipperId, { $push: { "withdrawals": withdrawalData, "wallet": walletCut, "activityRecord": activityRecording }, $set: {activityPointsTotal: giverAddedPoints}}, { new: true });    
//   console.log(withdrawnGiver);


        
       
    
//     // Deposit to Taker/Creator//-----------------------
//     const takerId = diary.creator;
//     const taker = await UsersModel.findById(takerId);
//     console.log("taker: "+ taker);

//         const takers_Wallet = taker.wallet;
//         const takers_Points = taker.activityPoints;

//         const depositData = {type:'diarytip', giver:giver.userName, giverId: giver.Id, title:diary.heading, postId:id, amount: netAmount };
        
//         const walletAdd = netAmount;
//        const added_Points_Taker = 20 * (amount/10);

//         // const walletAdded = (takers_Wallet + netAmount).toFixed(2);
//         // const takerAddedPoints = (takers_Points + (25 * amount));
//         // const diarys_Added_Tips = ((diary.tips + netAmount).toFixed(2));
        

//         // console.log("depositDataType: " + depositData.type);

//         // console.log("walletAdded: "+ walletAdded);
//         // console.log("takerAddedTotal: "+ takerAddedPoints);

//     //const depositedTaker = await UsersModel.findByIdAndUpdate(takerId, { $push: { "deposits": depositData}, $set: { wallet: walletAdded, activityPoints: takerAddedPoints}}, { new: true });
//     const depositedTaker = await UsersModel.findByIdAndUpdate(diary.creator, { $push: { "deposits": depositData, "wallet": walletAdd}}, { new: true }); 
//     console.log("deposittaker: "+ depositedTaker);

//     ////FinalLLY +++++++++++++++++++++++++

//     const tippedDiary = await DiariesModel.findByIdAndUpdate(id, { $push: { "tippers": tipperData, "tips": netAmount }}, { new: true })
//     .populate('diaryMiniProfile', 'dpUrl userName');
//     console.log("TippedDiary: "+ tippedDiary);
    
//     res.json(tippedDiary); 

    
//         }
//         catch (error){
//             res.status(404).json({message: error.message});
//         }

       
//         // const tippedDiary = await DiariesModel.findByIdAndUpdate(id, { ...diary,  tippers:diary.tippers.push(tipperData)}, { new: true });
//         // const tippedDiary2 = await DiariesModel.findByIdAndUpdate(id, {tips: (diary.tips + netAmount).toFixed(2)}, { new: true })
//         // .populate('miniProfile', 'dpUrl userName');
        
        
//     }

}



//Review  Diariessss===========================================
// export const reviewDiaries = async (req,res) => {

//     const{id} = req.params;
//     const reviewData = req.body;
//     const reviewer = reviewData.reviewer;
//     const reviewerId = reviewData.reviewerId; 
//     const body = reviewData.body;
    
//     if (!req.userId) return res.json({message: 'Unauthorized'})
//     //if (!req.userId && req.userId!== reviewerId){
 
   
//     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");

   
    
//    const diary = await DiariesModel.findById(id);
//    const reviews = diary.reviews;
//    console.log(reviews);
//    console.log(reviewData);


//    //const reviewedDiary = await DiariesModel.findByIdAndUpdate(id, { ...diary,  reviews:diary.reviews.push(reviewData)}, { new: true });
//    //const reviewedDiary2 = await DiariesModel.findByIdAndUpdate(id, { reviewtotal: (diary.reviews.length)}, { new: true })
//    const reviewedDiary = await DiariesModel.findByIdAndUpdate(id, { $push:{"reviews": reviewData}}, { new: true })
//    .populate('diaryMiniProfile', 'dpUrl userName');

//     res.json(reviewedDiary); 
    
//    // }
// }

export const reviewDiaries = async (req,res) => {

//     const{id} = req.params;
//     const reviewData = req.body;

    
//     if (!req.userId) return res.json({message: 'Unauthorized'})
 
   
//     if(!mongoose.Types.ObjectId.isValid(id) || reviewData.body === "") return res.status(404).send("Invalid Id");
   
//    const newReview = await ReviewsModel.create({reviewerId: req.userId, reviewerMiniProfile: req.userId, reviewedMiniProfile: reviewData.reviewed, reviewedPostId: id, body: reviewData.body, time: Date.now(), tips: 0});
//    const reviewedDiary = await DiariesModel.findByIdAndUpdate(id, { $push: { "reviews": newReview._id}}, { new: true })
//    .populate('diaryMiniProfile', 'dpUrl userName');

//     res.json(reviewedDiary); 
    
   // }
}