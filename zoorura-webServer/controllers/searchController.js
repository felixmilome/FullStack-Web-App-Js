import {UsersModel} from '../models/usersModel.js';
import {DiariesModel} from '../models/diariesModel.js';

import  mongoose  from "mongoose"; 

export const headSearch = async  (req, res) => {
   
    console.log(req.body);
    console.log('searching');
    const{term, type} = req.body;

    try{ 
        if (type === 'all'){
           // const termSearch= new RegExp(term, 'i'); 

            const diaryResult = await DiariesModel.find({title:{$regex: term, $options:'i'}}, {_id:1, diaryMiniProfile:1, title:1}).limit(9)
            .populate('diaryMiniProfile', 'userName');
            console.log(diaryResult); 
            
            const peopleResult = await UsersModel.find({userName:{$regex: term, $options:'i'}},{_id:1, userName:1, dpUrl:1}).limit(9)
        
            console.log(peopleResult);

            if(diaryResult.length && peopleResult.length){
                res.json({diaryResult, peopleResult, message:'Success'});
            }else if (!diaryResult.length && !peopleResult.length){
                res.json({diaryResult, peopleResult, message:'NoTerm'});
            }else if (diaryResult.length && !peopleResult.length){
                res.json({diaryResult, peopleResult, message:'NoPerson'});
            }else if (!diaryResult.length && peopleResult.length){
                res.json({diaryResult, peopleResult, message:'NoPost'});
            }
        }

    } catch(error){
       
        console.log(error.message);
    }
 }