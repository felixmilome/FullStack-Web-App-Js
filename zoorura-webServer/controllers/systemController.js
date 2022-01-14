import {UsersModel} from "../models/usersModel.js";
import  mongoose  from "mongoose"; 

export const getHallFame = async  (req, res) => {
    try{ 
         const hallFame = await UsersModel.find({}, {userName:1, dpUrl:1, activityPointsTotal:1}).sort({"activityPointsTotal":-1}).limit(20);
         console.log("hallofFame: "+ hallFame);
         res.status(200).json(hallFame);  
         
    } catch(error){
        res.status(404).json({message: error.message});
    }
 }