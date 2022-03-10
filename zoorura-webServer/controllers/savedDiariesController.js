import {TipsModel} from "../models/tipsModel.js";
import {UsersModel} from "../models/usersModel.js";
import {SavedDiariesModel} from "../models/savedDiariesModel.js";
import {DiariesModel} from "../models/diariesModel.js";
import  mongoose  from "mongoose";


export const getSavedDiaries =  async (req, res)=> {

    const userId = req.userId
  
        try{ 
           
                const savedDiaries = await SavedDiariesModel.find({saverId: { $in: [ userId ] } })
                .populate('diaryMiniData', 'title caption')
                .populate('originalOwnerMiniProfile', 'dpUrl userName');

                res.json(savedDiaries); 
            } 
            
        catch(error){
            res.status(404).send({message: error.message});
        } 

}

export const saveDiaries = async  (req, res) => {
    console.log('saveDiary');
    const{diaryId} = req.body 
    const userId = req.userId
    console.log(diaryId);

    const diary = await DiariesModel.findById(diaryId);
    console.log(diary);
    
    
        try{  
                if (diary){

                            const unpopulatedSavedDiary = await SavedDiariesModel.create({saverId:req.userId, diaryMiniData:diaryId, originalOwnerMiniProfile:diary.creator, time: parseInt(Date.now())})
                            const newSavedDiary = await SavedDiariesModel.findById(unpopulatedSavedDiary._id)
                            .populate('diaryMiniData', 'title caption')
                            .populate('originalOwnerMiniProfile', 'dpUrl userName');

                            console.log(newSavedDiary);
                            
                            res.json(newSavedDiary);
          
                            
                } else {
                    res.status(404).send({message: error.message});
                } 
            
        } catch(error){
            res.status(404).send({message: error.message});
        } 
 }

 
 export const deleteSavedDiaries = async (req, res) => {

    const{savedId} = req.params;
   
    
    

        try{ 

                const savedDiaryVerified = await SavedDiariesModel.findById(savedId);
                const ownerId =  await JSON.stringify(savedDiaryVerified.saverId);
                const userId = await JSON.stringify(req.userId);

                if (!savedDiaryVerified || userId !== ownerId) {

                    res.json({message: "error"});
                    console.log('error');

                }else{

                    await SavedDiariesModel.findByIdAndRemove(savedId);      
                    res.json({message: "Deleted"});
                    console.log('deletesaved');
                }  
            
        } catch(error){
            res.status(404).send({message: error.message});
        } 
 }


