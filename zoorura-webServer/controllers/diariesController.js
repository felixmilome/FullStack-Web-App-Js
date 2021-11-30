import  mongoose  from "mongoose"; 
import {DiariesModel, TipModel} from "../models/diariesModel.js";
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
        const newDiary = new DiariesModel({...diary, creator: req.userId, time: new Date().toISOString()});
       
    try{
        await newDiary.save();
        res.status(201).json(newDiary);
   } catch(error){
       res.status(409).json({message:error.message});
   }

}
export const patchDiaries = async (req, res) =>{
    const{id:_id} = req.params;
    const oldDiary=req.body;

   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid Id");
    const patchedDiary = await DiariesModel.findByIdAndUpdate(_id, oldDiary, { new: true });

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
   
    console.log(req.body);
    console.log(tipperData);
    
    console.log (`post Id: ${id}`);
    console.log (`Gross: ${amount}`);
    console.log (`Tax: ${tax}`);
    console.log (`Net: ${netAmount.toFixed(2)}`);
    console.log (`Tipper: ${tipper}`);
    console.log (`Tipper Id: ${tipperId}`);
    
    if (!req.userId) return res.json({message: 'Unauthorized'});
 
   
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Invalid Id");

    if(amount > 0 && amount < 51){
    
   const diary = await DiariesModel.findById(id);
   diary.tippers.push(tipperData);
   //diary
   diary.save();

   const tippedDiary = await DiariesModel.findByIdAndUpdate(id,  {tips: (diary.tips + netAmount).toFixed(2) }, { new: true });
   
  //{tips: (diary.tips + netAmount).toFixed(2)},
 
    //const tippedDiary = await DiariesModel.findByIdAndUpdate(id,  newTip, { new: true });

    res.json(tippedDiary);
    }
    //console.log(`${netAmount.toFixed(2)}: honours tipped successfully`)
}