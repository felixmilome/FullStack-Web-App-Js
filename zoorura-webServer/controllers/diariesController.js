import  mongoose  from "mongoose";
import DiariesModel from "../models/diariesModel.js";


export const getDiaries = async  (req, res) => {
   try{
        const diaries = await DiariesModel.find();
        res.status(200).json(diaries);
   } catch(error){
       res.status(404).json({message: error.message});
   }
}

export const postDiaries =  async (req, res)=> {
        
        const newDiary = new DiariesModel(req.body);

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