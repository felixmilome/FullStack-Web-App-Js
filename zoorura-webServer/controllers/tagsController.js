import {UsersModel} from "../models/usersModel.js";



export const getTags = async  (req, res) => {
    const tagsArray = req.body;
    console.log({tagsArray});
    try{ 
        const tags = await UsersModel.find({_id: { $in: tagsArray }}, {_id:1, userName:1, dpUrl:1})
        console.log(tags);
       
        res.status(200).json(tags);   
         
   } catch(error){
   
       console.log(error.message);  
   }
 };

 