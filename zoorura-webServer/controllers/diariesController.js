import  mongoose  from "mongoose"; 
import {DiariesModel} from "../models/diariesModel.js";
import {UsersModel} from "../models/usersModel.js";
import {ReviewsModel} from "../models/reviewsModel.js";
import { taxer } from "../functions.js";


//Get  Diariessss===========================================
export const getDiaries = async  (req, res) => {
   try{ 

    //     const diaries = await DiariesModel.find().limit(5).sort({"tips":-1, "time":-1})
    //     .populate('diaryMiniProfile', 'dpUrl userName');
    //    // console.log(diaries);
    //     res.status(200).json(diaries); 


    const diaries = await DiariesModel.aggregate([
       
        
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
                "miniProfile.name": 0, 
                 "miniProfile.email": 0, 
                 "miniProfile.password": 0, 
                 "miniProfile.wallet": 0, 
                 "miniProfile.time": 0, 
                 "miniProfile.verified": 0, 
                 "miniProfile.verCode": 0, 
                 "miniProfile.verTime": 0, 
                 "miniProfile.verExpiry": 0,
                 "miniProfile.activityPointsTotal": 0,
                 "miniProfile.dailyLogin": 0,
                 "miniProfile.jwtExpiry": 0,  
                 "miniProfile.lastLogin": 0,
                 "miniProfile.follows": 0, 
                 "miniProfile.followers": 0,
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
                "displayerMiniProfile.name": 0,
                "displayerMiniProfile.dpUrl": 0, 
                 "displayerMiniProfile.email": 0, 
                 "displayerMiniProfile.password": 0, 
                 "displayerMiniProfile.wallet": 0, 
                 "displayerMiniProfile.time": 0, 
                 "displayerMiniProfile.verified": 0, 
                 "displayerMiniProfile.verCode": 0, 
                 "displayerMiniProfile.verTime": 0, 
                 "displayerMiniProfile.verExpiry": 0,
                 "displayerMiniProfile.activityPointsTotal": 0,
                 "displayerMiniProfile.dailyLogin": 0,
                 "displayerMiniProfile.jwtExpiry": 0,  
                 "displayerMiniProfile.lastLogin": 0,
                 "displayerMiniProfile.follows": 0, 
                 "displayerMiniProfile.followers": 0,
                 "displayerMiniProfile.activityPointsRecord": 0, 
                 "displayerMiniProfile.withdrawals": 0,
                 "displayerMiniProfile.deposits": 0,
                } 
        },

        { $addFields: 
            { "avgRank": 
                { $sum: [ "$dateRank",  {$sum: ["$tipsArray"]}, {$sum: ["$displaysArray"]} ] }
            }
        },
       

        ]).sort({"avgRank":-1}).limit(10);

 
       
        res.status(200).json(diaries);

        
   } catch(error){
       res.status(404).json({message: error.message});
   }
}


//Post  Diariessss===========================================
export const postDiaries =  async (req, res)=> {

        const diary = req.body; 
        console.log(req.body);
        console.log(diary.type);
        console.log(diary.originalId);  
        //const user = await UsersModel.findById(req.userId);
        if (diary.type === 'diary'){
            const newDiary = new DiariesModel({...diary,  creator: req.userId, postType: diary.type, diaryMiniProfile: req.userId, time: new Date().toISOString(), dateRank: (Date.now()/360000) }); //time is for updates
            try{
                await newDiary.save();
                res.status(201).json(newDiary);
               console.log(newDiary);
           } catch(error){
               res.status(409).json({message:error.message});
           } 
        } else if (diary.type === 'display'){
            
                if(mongoose.Types.ObjectId.isValid(diary.originalId)){
                    
                    try{

                        const displayedDiary = await DiariesModel.findByIdAndUpdate(diary.originalId, { $push: { "displaysArray": req.userId }}, { new: true });
                        console.log(displayedDiary);
                        
                        // const displayedDiary = await DiariesModel.findById(unpopulatedDisplayedDiary._id)
                        // .populate('displaysArray', 'userName');

                        const newDisplay = new DiariesModel({creator:displayedDiary.creator, title:displayedDiary.title, caption:displayedDiary.caption, file:displayedDiary.file, media:displayedDiary.media,
                           diaryMiniProfile:displayedDiary.diaryMiniProfile, postType: 'display', publicity:'public', originalId: diary.originalId, displayerMiniProfile:req.userId, displayTime: Date.now(), displayable: false, 
                             displaysArray: [], time: displayedDiary.time, dateRank: (Date.now()/360000),tippers:[], reviewers:[], displaysArray:[]});   
                        console.log(newDisplay);
                    
                            await newDisplay.save();
                            res.json(newDisplay);
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



//Patch  Diariessss===========================================
export const patchDiaries = async (req, res) =>{
    const{id} = req.params;
    const newDiary=req.body;

   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");
    const patchedDiary = await DiariesModel.findByIdAndUpdate(id, newDiary, { new: true })
    .populate('miniProfile', 'dpUrl userName'); //change things populate cant happen on update also Use set to set only FILE CAP TITLE ONLY

    res.json(patchedDiary);

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