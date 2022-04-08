import {TipsModel} from "../models/tipsModel.js";
import {UsersModel} from "../models/usersModel.js";
import {ReviewsModel} from "../models/reviewsModel.js";
import {DiariesModel} from "../models/diariesModel.js";
import {NotificationsModel} from "../models/notificationsModel.js";
import  mongoose  from "mongoose";
 
//Search Area: reviewReply newPostSpam

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
    console.log(req.body);
    const{reviewedId, reviewedPostId, body, replied, repliedPostId, reply} = req.body //receivername for Records
    const userId = req.userId
    
 //console.log(req.body); 
  
        try{  
            const user = await UsersModel.findById(req.userId);
            const  newReviewSpam = user.reviewSpam + 1;
            
            if(newReviewSpam > 25){

                res.json('Spam'); 

            }else{

            
                if (body.length < 1 || body.length > 2000 || !mongoose.Types.ObjectId.isValid(reviewedId) || !mongoose.Types.ObjectId.isValid(reviewedPostId)) {
                    res.json("ValidationError");
                }else{

                            const unpopulatedNewReview = await ReviewsModel.create({reviewerId:req.userId, reviewerMiniProfile:req.userId, reviewedMiniProfile:reviewedId, repliedMiniProfile:replied, repliedPostId:repliedPostId, reply:reply, reviewedPostId:reviewedPostId, body:body, time:Date.now()})
                            const newReview = await ReviewsModel.findById(unpopulatedNewReview._id)
                            .populate('reviewerMiniProfile', 'dpUrl userName');
                            
                        // console.log(newReview); 


                            const unpopulatedReviewedDiary = await DiariesModel.findByIdAndUpdate(reviewedPostId, { $push: { "reviewers": userId}}, { new: true });
                            const reviewedDiary = await DiariesModel.findById(unpopulatedReviewedDiary._id)
                            .populate('diaryMiniProfile', 'dpUrl userName');

                            if (reply === false){

                                const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:reviewedId, receiverId:reviewedId, body:reviewedDiary.title, postId:reviewedPostId, read: false, class:'normal',  type:'review', createdOn: new Date(), dateRank: Date.now()});
                                const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                                .populate('sender', 'dpUrl userName'); 

                                res.json({newReview:newReview, newNotification:newNotification, reviewedPost:reviewedDiary});

                                const updatedUser = await UsersModel.findByIdAndUpdate(req.userId, { $set: {reviewSpam:newReviewSpam}}, { new: true });

                                console.log(newReview);
                                console.log(newNotification);
                                console.log(updatedUser);

                            } else if (reply === true){

                                const unpopulatedNewNotification = await NotificationsModel.create({sender:req.userId, receiver:reviewedId, receiverId:reviewedId, body:reviewedDiary.title, postId:reviewedPostId, read: false, class:'normal',  type: 'review', createdOn: new Date(), dateRank: Date.now()});
                                const newNotification = await NotificationsModel.findById(unpopulatedNewNotification._id)
                                .populate('sender', 'dpUrl userName');

                                const unpopulatedNewNotification2 = await NotificationsModel.create({sender:req.userId, receiver:replied, receiverId:reviewedId, body:reviewedDiary.title, postId:reviewedPostId, read: false, class:'normal',  type: 'reviewReply', createdOn: new Date(), dateRank: Date.now()});
                                const newNotification2 = await NotificationsModel.findById(unpopulatedNewNotification2._id)
                                .populate('sender', 'dpUrl userName'); 
    
                                res.json({newReview:newReview, newNotification:newNotification, newNotification2:newNotification2, reviewedPost:reviewedDiary});
    
                                const updatedUser = await UsersModel.findByIdAndUpdate(req.userId, { $set: {reviewSpam:newReviewSpam}}, { new: true });
    
                                console.log(newReview);
                                console.log(newNotification2);
                                console.log(updatedUser);

                            } 
                            
                } 
            } 
            
        } catch(error){
            res.status(404).send({message: error.message});
            console.log(error.message);
        } 
    }

 export const patchReview = async (req, res) => {

   
    const {reviewId, body} = req.body;
    const reviewVerified = await ReviewsModel.findById(reviewId, {reviewerId:1, edited:1});
    console.log(reviewVerified);
    console.log(reviewId)
    console.log(req.userId)
    

        try{ 


            const user = await UsersModel.findById(req.userId);
            const  newReviewSpam = user.reviewSpam + 1;
            
            if(newReviewSpam > 25){

                res.json('Spam');

            }else{
                if (body.length < 0 || body.length > 2000 || req.userId !== reviewVerified.reviewerId || reviewVerified.edited === true) {

                    res.json("error");

                }else{

                    const patchedReviewUnpopulated = await ReviewsModel.findByIdAndUpdate(reviewId, { $set: {edited:true, body:body, time: new Date()}}, { new: true });
                    const patchedReview = await ReviewsModel.findById(patchedReviewUnpopulated._id)
                    .populate('reviewerMiniProfile', 'dpUrl userName');
                    const updatedUser = await UsersModel.findByIdAndUpdate(req.userId, { $set: {reviewSpam:newReviewSpam}}, { new: true });

                    console.log(patchedReview);
                    console.log(updatedUser);
                            
                    res.json(patchedReview);
                }  
            }
            
        } catch(error){
            console.log(error.message);
        } 
 }
 export const deleteReview = async (req, res) => {

    const{reviewId} = req.params;
    const reviewVerified = await ReviewsModel.findById(reviewId);
    

        try{ 
                if (req.userId !== reviewVerified.reviewerId || !mongoose.Types.ObjectId.isValid(reviewId)) {

                    res.json("error");

                }else{

                    await ReviewsModel.findByIdAndRemove(reviewId);      
                    res.json({message: "reviewDeleted"});
                }  
            
        } catch(error){
            res.status(404).send({message: error.message});
        } 
 }


