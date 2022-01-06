import  mongoose  from "mongoose"; 
import {DiariesModel} from "../models/diariesModel.js";
import {UsersModel} from "../models/usersModel.js";
import { taxer } from "../functions.js";


//Get  Diariessss===========================================
export const getDiaries = async  (req, res) => {
   try{
        const diaries = await DiariesModel.find().limit(20).sort({"tips":-1, "time":-1})
        .populate('miniProfile', 'dpUrl userName');
        console.log(diaries);
        res.status(200).json(diaries);
    //    ]const diaries = await unpopulated.populate({path:'miniProfile', model:'UsersModel'});
    //    console.log(diaries)
           //const owners = diaries.map(d => d.creator);
        //const diariesP = idArray.map(id => UsersModel.findById(id));      
        
   } catch(error){
       res.status(404).json({message: error.message});
   }
}


//Post  Diariessss===========================================
export const postDiaries =  async (req, res)=> {

        const diary = req.body;  
        console.log(diary);
        const user = await UsersModel.findById(req.userId);
       // console.log(user);
        const newDiary = new DiariesModel({...diary, name: user.userName, creator: req.userId, miniProfile: req.userId, time: new Date().toISOString()}); //time is for updates
       
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
    

    const tipperData = req.body;
    const tipper = tipperData.tipper;
    const tipperId = tipperData.tipperId;
    const amount = tipperData.amount;
    
    const tax = taxer(amount);
    const netAmount = amount - tax;
   
    // console.log(req.body);
    // console.log(tipperData);
    
    // console.log (`post Id: ${id}`);
    // console.log (`Gross: ${amount}`);
    // console.log (`Tax: ${tax}`);
    // console.log (`Net: ${netAmount.toFixed(2)}`);
    // console.log (`Tipper: ${tipper}`);
    // console.log (`Tipper Id: ${tipperId}`);
    
    if (!req.userId) return res.json({message: 'Unauthorized'});
 
   
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");

    if(amount > 0 && amount < 51){
    
   const diary = await DiariesModel.findById(id);

   const tippers = diary.tippers;
//    console.log(tippers);
//    console.log(tipperData);

    try{
   
    
    // Withdrawal from Giver/Requester//---------------------------

       const requesterId = req.userId;
       const requester = await UsersModel.findById(requesterId);  
       const rwallet = requester.wallet
      // console.log(rwallet);
       const withdrawalData = {type:'diarytip', receiver:diary.name, receiverId: diary.creator, title:diary.heading, postId: id, amount: amount};
       
    const withdrawRecord = await UsersModel.findByIdAndUpdate(requesterId, {...requester, withdrawals:requester.withdrawals.push(withdrawalData)}, { new: true });
    const walletcut = await UsersModel.findByIdAndUpdate(requesterId, {wallet:(rwallet - amount).toFixed(2)}, { new: true });
        
       
    
    // Deposit to Taker/Creator//-----------------------

        const creatorId = diary.creator;
        const creator = await UsersModel.findById(creatorId);
        const cwallet = creator.wallet
       // console.log(cwallet);
        const depositData = {type:'diarytip', giver:creator.userName, giverId: creatorId, title:diary.heading, postId:id, amount: netAmount };

    const depositRecord = await UsersModel.findByIdAndUpdate(creatorId, {...creator, deposits:creator.deposits.push(depositData)}, { new: true });
    const walletadd = await UsersModel.findByIdAndUpdate(creatorId, {wallet:(cwallet + netAmount).toFixed(2)}, { new: true });
    
    
     
     //const withdrawalData = {postId: id, amount: amount };

    console.log(walletcut);
    console.log(walletadd);
    console.log(withdrawRecord);
   console.log(depositRecord);


    
        }
        catch (error){
            res.status(404).json({message: error.message});
        }
        const tippedDiary = await DiariesModel.findByIdAndUpdate(id, { ...diary,  tippers:diary.tippers.push(tipperData)}, { new: true });
        const tippedDiary2 = await DiariesModel.findByIdAndUpdate(id, {tips: (diary.tips + netAmount).toFixed(2)}, { new: true });
        res.json(tippedDiary2); 
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




   const reviewedDiary = await DiariesModel.findByIdAndUpdate(id, { ...diary,  reviews:diary.reviews.push(reviewData)}, { new: true });
   const reviewedDiary2 = await DiariesModel.findByIdAndUpdate(id, { reviewtotal: (diary.reviews.length)}, { new: true });


    res.json(reviewedDiary2); 
    
   // }
}