import  mongoose  from "mongoose"; 
import {DiariesModel} from "../models/diariesModel.js";
import {UsersModel} from "../models/usersModel.js";
import { taxer } from "../functions.js";


//Get  Diariessss===========================================
export const getDiaries = async  (req, res) => {
   try{ 
        const diaries = await DiariesModel.find().limit(20).sort({"tips":-1, "time":-1})
        .populate('diaryMiniProfile', 'dpUrl userName');
       // console.log(diaries);
        res.status(200).json(diaries); 
        
   } catch(error){
       res.status(404).json({message: error.message});
   }
}


//Post  Diariessss===========================================
export const postDiaries =  async (req, res)=> {

        const diary = req.body;  
       // console.log(diary);
        const user = await UsersModel.findById(req.userId);
       // console.log(user);
        const newDiary = new DiariesModel({...diary, name: user.userName, creator: req.userId, diaryMiniProfile: req.userId, time: new Date().toISOString()}); //time is for updates
       
    try{
        await newDiary.save();
        res.status(201).json(newDiary);
       console.log(newDiary);
   } catch(error){
       res.status(409).json({message:error.message});
   }

}


//Patch  Diariessss===========================================
export const patchDiaries = async (req, res) =>{
    const{id} = req.params;
    const newDiary=req.body;

   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");
    const patchedDiary = await DiariesModel.findByIdAndUpdate(id, newDiary, { new: true })
    .populate('miniProfile', 'dpUrl userName');

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

    const{id} = req.params;
    console.log("id: " + id);
    

    const tipperData = req.body;
    const tipper = tipperData.tipper;
    const tipperId = tipperData.tipperId;
    const amount = tipperData.amount;
    
    const tax = taxer(amount);
    const netAmount = amount - tax;
   
    
    if (!req.userId) return res.json({message: 'Unauthorized'});
 
   
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");

    if(amount > 0 && amount < 51){
    
   const diary = await DiariesModel.findById(id);
   console.log("diary: " + diary);

   const tippers = diary.tippers;

    
   
    
    // Withdrawal from Giver/Requester//---------------------------

       const giver = await UsersModel.findById(tipperId);
        console.log("giverObject: " + giver);

       try{ 
       const givers_Wallet = giver.wallet;
       const givers_Points = giver.activityPointsTotal; 
 
       const withdrawalData = {type:'diarytip', receiver:diary.name, receiverId: diary.creator, title:diary.heading, postId: id, amount: amount};
        const walletCut = 0 - amount;
       const added_Points_Giver = 5 * amount;
       const activityRecording = {type: `(${amount}) Tip On Post Points`, points: added_Points_Giver}
       const giverAddedPoints = (givers_Points + added_Points_Giver);
    //    const walletCutted = (givers_Wallet - amount).toFixed(2);
    //    const giverAddedPoints = (givers_Points + (50 * amount));
    //    console.log("withdrawalDataType: " + withdrawalData.type);

    //    console.log("walletCutted: "+ walletCutted);
    //    console.log("giverAddedTotal: "+ giverAddedPoints);

  // const withdrawnGiver = await UsersModel.findByIdAndUpdate(tipperId, { $push: { "withdrawals": withdrawalData}, $set: { wallet: walletCutted, activityPoints: giverAddedPoints}}, { new: true });
  const withdrawnGiver = await UsersModel.findByIdAndUpdate(tipperId, { $push: { "withdrawals": withdrawalData, "wallet": walletCut, "activityRecord": activityRecording }, $set: {activityPointsTotal: giverAddedPoints}}, { new: true });    
  console.log(withdrawnGiver);


        
       
    
    // Deposit to Taker/Creator//-----------------------
    const takerId = diary.creator;
    const taker = await UsersModel.findById(takerId);
    console.log("taker: "+ taker);

        const takers_Wallet = taker.wallet;
        const takers_Points = taker.activityPoints;

        const depositData = {type:'diarytip', giver:giver.userName, giverId: giver.Id, title:diary.heading, postId:id, amount: netAmount };
        
        const walletAdd = netAmount;
       const added_Points_Taker = 20 * (amount/10);

        // const walletAdded = (takers_Wallet + netAmount).toFixed(2);
        // const takerAddedPoints = (takers_Points + (25 * amount));
        // const diarys_Added_Tips = ((diary.tips + netAmount).toFixed(2));
        

        // console.log("depositDataType: " + depositData.type);

        // console.log("walletAdded: "+ walletAdded);
        // console.log("takerAddedTotal: "+ takerAddedPoints);

    //const depositedTaker = await UsersModel.findByIdAndUpdate(takerId, { $push: { "deposits": depositData}, $set: { wallet: walletAdded, activityPoints: takerAddedPoints}}, { new: true });
    const depositedTaker = await UsersModel.findByIdAndUpdate(diary.creator, { $push: { "deposits": depositData, "wallet": walletAdd}}, { new: true }); 
    console.log("deposittaker: "+ depositedTaker);

    ////FinalLLY +++++++++++++++++++++++++

    const tippedDiary = await DiariesModel.findByIdAndUpdate(id, { $push: { "tippers": tipperData, "tips": netAmount }}, { new: true })
    .populate('diaryMiniProfile', 'dpUrl userName');
    console.log("TippedDiary: "+ tippedDiary);
    
    res.json(tippedDiary); 

    
        }
        catch (error){
            res.status(404).json({message: error.message});
        }

       
        // const tippedDiary = await DiariesModel.findByIdAndUpdate(id, { ...diary,  tippers:diary.tippers.push(tipperData)}, { new: true });
        // const tippedDiary2 = await DiariesModel.findByIdAndUpdate(id, {tips: (diary.tips + netAmount).toFixed(2)}, { new: true })
        // .populate('miniProfile', 'dpUrl userName');
        
        
    }

}



//Review  Diariessss===========================================
export const reviewDiaries = async (req,res) => {

    const{id} = req.params;
    const reviewData = req.body;
    const reviewer = reviewData.reviewer;
    const reviewerId = reviewData.reviewerId; 
    const body = reviewData.body;
    
    if (!req.userId) return res.json({message: 'Unauthorized'})
    //if (!req.userId && req.userId!== reviewerId){
 
   
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");

   
    
   const diary = await DiariesModel.findById(id);
   const reviews = diary.reviews;
   console.log(reviews);
   console.log(reviewData);


   //const reviewedDiary = await DiariesModel.findByIdAndUpdate(id, { ...diary,  reviews:diary.reviews.push(reviewData)}, { new: true });
   //const reviewedDiary2 = await DiariesModel.findByIdAndUpdate(id, { reviewtotal: (diary.reviews.length)}, { new: true })
   const reviewedDiary = await DiariesModel.findByIdAndUpdate(id, { $push:{"reviews": reviewData}}, { new: true })
   .populate('diaryMiniProfile', 'dpUrl userName');

    res.json(reviewedDiary); 
    
   // }
}