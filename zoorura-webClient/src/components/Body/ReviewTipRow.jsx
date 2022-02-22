import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState} from 'react';
import {getTipsAction} from "../Midwares/rdx/actions/tipsAction.js"


export const ReviewTipRow = ({reviewId})=>{

    const reviewTippersAll = useSelector((state) => state.tipsReducer);
    console.log(reviewTippersAll);
    const availableReviewTippers = reviewTippersAll.filter(tipper => tipper.tippedPostId === reviewId);
    console.log(availableReviewTippers);
    const dispatch = useDispatch();

    useEffect(() => {     
        
        if(!availableReviewTippers.length){
            
            dispatch(getTipsAction(reviewId));    
        }

    }, [dispatch]); 

    return(
        <>
            {availableReviewTippers.length > 0  && availableReviewTippers.map((reviewTipper) =>(
                <div className= 'flex justify-center break-words p-1 border text-center font-normal border-gray-300 bg-transparent hover:bg-white'>
                    <p>{reviewTipper.tipperMiniProfile.userName}: </p> 
                    <p className='font-bold'>{reviewTipper.amount}</p>      
                </div>  
                ))           
            } 
        </>
    )
}