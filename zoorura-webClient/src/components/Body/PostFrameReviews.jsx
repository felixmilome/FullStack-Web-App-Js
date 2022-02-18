import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getReviewsAction } from '../Midwares/rdx/actions/reviewsAction';
import moment from 'moment'; 
import{GiMoneyStack, GiTakeMyMoney} from "react-icons/gi"; 
import { BiCommentEdit } from "react-icons/bi";

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
            
                <div key={reviewer._id}  className='bg-gray-100 border-gray-300 rounded-md '>
            
                
                    <div className="p-0.5 flex w-full justify-start items-center text-xs font-bold text-gray-600 rounded-md lg:max-w-none">
                        
                            {/* EMoji & Pic */}
                            <div className="space-y-3 items-center inline-block p-1">
                                
                                <img src={reviewer.reviewerMiniProfile.dpUrl} alt="DP" className="rounded-full object-cover h-8 w-8"/>
                                
                            </div>

                            {/* Name and Comment*/}
                            <div className="flex items-center m-1 bg-transparent w-5/6">  
                            <div className="bg-gray-100 border  border-gray-300 p-3 rounded-2xl max-w-3/4">
                                    
                                    <div className= 'bg-transpparent rounded-md'>

                                        
                                        <p className='text-xs font-semibold'> @{reviewer.reviewerMiniProfile.userName}:</p>
                                        
                                    </div>
                                    
                                <div className= "font-light text-sm break-words">{reviewer.body}</div>
                                <p className='font-extralight'>{moment (reviewer.time).fromNow()}</p>
                                </div>
                                <div className="bg-transparent rounded-full flex justify-center cursor-pointer h-7 w-7 items-center hover:bg-white group m-3">
                                    <GiTakeMyMoney size ={24} className="text-gray-400"/>
                                </div>
                                    <div className="bg-transparent rounded-full flex justify-center cursor-pointer h-7 w-7 items-center hover:bg-white group m-3">
                                    <BiCommentEdit  size ={20} className="text-gray-400"/>
                                </div>
                            </div>
                                
                    </div>
                
                
            </div>
            ))
            
        }                       
        </>
    )
}