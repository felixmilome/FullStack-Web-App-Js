import  mongoose  from "mongoose"; 
import {DiariesModel} from "../models/diariesModel.js";
import {UsersModel} from "../models/usersModel.js";
import { taxer } from "../functions.js";


export const getDiaries = async  (req, res) => {
   try{
        const diaries = await DiariesModel.find();
        res.status(200).json(diaries);
   } catch(error){
       res.status(404).json({message: error.message});
   }
}

export const postDiaries =  async (req, res)=> {

        const diary = req.body;  
        console.log(diary);
        const user = await UsersModel.findById(req.userId);
        console.log(user);
        const newDiary = new DiariesModel({...diary, name: user.userName, creator: req.userId, time: new Date().toISOString()});
       
    try{
        await newDiary.save();
        res.status(201).json(newDiary);
        console.log(newDiary);
   } catch(error){
       res.status(409).json({message:error.message});
   }

}
export const patchDiaries = async (req, res) =>{
    const{id:_id} = req.params;
    const newDiary=req.body;

   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid Id");
    const patchedDiary = await DiariesModel.findByIdAndUpdate(_id, newDiary, { new: true });

    res.json(patchedDiary);

}
export const deleteDiaries = async (req,res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");
    
    await DiariesModel.findByIdAndRemove(id);
    console.log("Diary Deleted!")
    res.json({message: "Post Deleted Successfully"});


}

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
   //diary.tippers.push(tipperData);
    //diary.save();
   const tippers = diary.tippers;
   console.log(tippers);
   console.log(tipperData);

   //tips: (diary.tips + netAmount).toFixed(2),


   const tippedDiary = await DiariesModel.findByIdAndUpdate(id, { ...diary,  tippers:diary.tippers.push(tipperData)}, { new: true });
   const tippedDiary2 = await DiariesModel.findByIdAndUpdate(id, { tips: (diary.tips + netAmount).toFixed(2)}, { new: true });


    res.json(tippedDiary2); 
    }

}

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