import {TipsModel} from "../models/tipsModel.js";
import {UsersModel} from "../models/usersModel.js";
import {ReviewsModel} from "../models/reviewsModel.js";
import {DiariesModel} from "../models/diariesModel.js";
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
 
    const{reviewedId, reviewedPostId, body} = req.body //receivername for Records
    const userId = req.userId
    
    console.log(req.body);
        try{  
                if (body.length < 1 || body.length > 2000 || !mongoose.Types.ObjectId.isValid(reviewedId) || !mongoose.Types.ObjectId.isValid(reviewedPostId)) {
                    res.json("Validation Error");
                }else{

                            const unpopulatedNewReview = await ReviewsModel.create({reviewerId:req.userId, reviewerMiniProfile:req.userId, reviewedMiniProfile:reviewedId, reviewedPostId:reviewedPostId, body:body, time:Date.now()})
                            const newReview = await ReviewsModel.findById(unpopulatedNewReview._id)
                            .populate('reviewerMiniProfile', 'dpUrl userName');
                            
                            console.log(newReview);

                            const unpopulatedReviewedDiary = await DiariesModel.findByIdAndUpdate(reviewedPostId, { $push: { "reviewers": userId}}, { new: true });
                            const reviewedDiary = await DiariesModel.findById(unpopulatedReviewedDiary._id)
                            .populate('diaryMiniProfile', 'dpUrl userName');
                            res.json({newReview:newReview, reviewedPost:reviewedDiary});
                            
                            console.log(newReview);
                            
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


