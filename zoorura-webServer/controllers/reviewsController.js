import {TipsModel} from "../models/tipsModel.js";
import {UsersModel} from "../models/usersModel.js";
import {ReviewsModel} from "../models/reviewsModel.js";
import  mongoose  from "mongoose";


export const getReviews =  async (req, res)=> {

    const{postId} = req.params
 
        try{ 
           
                const reviews = await ReviewsModel.find({reviewedPostId: { $in: [ postId ] } })
                .populate('reviewerMiniProfile', 'dpUrl userName');
                res.status(200).json(reviews); 
            } 
            
        catch(error){
            res.status(404).send({message: error.message});
        } 

}

export const postReview = async  (req, res) => {

    const{reviewedMiniProfile, reviewedPostId, body} = req.body //receivername for Records
    

        try{ 
                if (body.length < 0 || body.length > 2000) {
                    res.json("error");
                }else{

                            const newReview = await ReviewsModel.create({reviewerId:req.userId, reviewerMiniProfile:req.userId, reviewedMiniProfile:reviewedMiniProfile, reviewedPostId:reviewedPostId, body:body, time:Date.now()})
                            .populate('reviewerMiniProfile', 'dpUrl userName');
                            res.json(newReview);
                }  
            
        } catch(error){
            res.status(404).send({message: error.message});
        } 
 }

 export const patchReview = async (req, res) => {

    const{postId} = req.params;
    const {body} = req.body;
    const reviewVerified = await ReviewsModel.findById(postId, {reviewerId:1});
    

        try{ 
                if (body.length < 0 || body.length > 2000 || req.userId !== reviewVerified.reviewerId) {

                    res.json("error");

                }else{

                    const patchedReview = await ReviewsModel.findByIdAndUpdate(req.userId, { $set: {body:body, time: new Date()}}, { new: true })
                    .populate('reviewerMiniProfile', 'dpUrl userName');
                            
                    res.json({message: patchedReview});
                }  
            
        } catch(error){
            res.status(404).send({message: error.message});
        } 
 }
 export const deleteReview = async (req, res) => {

    const{postId} = req.params;
    const reviewVerified = await ReviewsModel.findById(postId);
    

        try{ 
                if (req.userId !== reviewVerified.reviewerId) {

                    res.json("error");

                }else{

                    await ReviewsModel.findByIdAndRemove(id);      
                    res.json({message: "reviewDeleted"});
                }  
            
        } catch(error){
            res.status(404).send({message: error.message});
        } 
 }


