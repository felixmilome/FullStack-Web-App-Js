import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState} from 'react';
import { getReviewsAction } from '../Midwares/rdx/actions/reviewsAction';
import moment from 'moment'; 
import{GiMoneyStack, GiTakeMyMoney} from "react-icons/gi"; 
import { BiCommentEdit } from "react-icons/bi";
import { MdSend,MdOutlineCancel} from "react-icons/md";
import {BeatLoader} from "react-spinners";
import {patchReviewsAction} from "../Midwares/rdx/actions/reviewsAction.js"
import{PostFrameRevRow} from "./PostFrameRevRow.jsx"


export const PostFrameReviews = ({diaryId, userId}) => {

       

    const reviewersAll = useSelector((state) => state.reviewsReducer);
   
    const dispatch = useDispatch(); 

    const availableReviewers = reviewersAll.filter(reviewer => reviewer.reviewedPostId === diaryId);
   
    useEffect(() => {     
       
        if(!availableReviewers.length){
            
            dispatch(getReviewsAction(diaryId));    
        }

    }, [dispatch]); 


    return (
     
        <>
            {availableReviewers.length > 0  && availableReviewers.map((reviewer) =>(
            
                <div key={reviewer._id}  className='ml-5 bg-gray-100 border-gray-300 rounded-md '>
            
              <PostFrameRevRow diaryId={diaryId} userId= {userId} reviewer= {reviewer}/>
                    
                
                
                 </div>
            ))
            
        }                       
        </>
    )
}