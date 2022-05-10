import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState} from 'react';
import {getTipsAction} from "../Midwares/rdx/actions/tipsAction.js"
import { getWalletAction } from '../Midwares/rdx/actions/walletAction';


export const ReviewTipRow = ({reviewId})=>{

    const reviewTippersAll = useSelector((state) => state.tipsReducer);
    console.log(reviewTippersAll);
    const availableReviewTippers = reviewTippersAll.filter(tipper => tipper.tippedPostId === reviewId);
    console.log(availableReviewTippers);
    const dispatch = useDispatch();

    useEffect(() => {
      
        dispatch(getWalletAction()); 
   
    }, []); 

    const walletBalance = useSelector((state) => state.walletReducer);

    useEffect(() => {     
        
        if(!availableReviewTippers.length){
            
            dispatch(getTipsAction(reviewId));    
        }

    }, [dispatch]);  

    return( 
        <>
            <div className=' bg-gray-200 dark:bg-gray-800 w-ful p-2 my-1 text-center rounded'>
                <p className ='text-gray-500 dark:text-gray-300 text-xs font-bold '>wallet balance:</p>
                <p className ='text-cyan-600 dark:text-cyan-500 text-sm font-bold '>{walletBalance.zbx} zbx</p>
                {walletBalance.zbx < 1 && <p className='text-red-600 dark:text-red-500  font-light cursor-pointer'>add funds</p>}
            </div>   
            {availableReviewTippers.length > 0  && availableReviewTippers.map((reviewTipper) =>(
                <div className= 'flex justify-center break-words dark:text-gray-200 p-1 border text-center font-normal border-gray-300 bg-transparent hover:bg-white'>
                    <p>{reviewTipper.tipperMiniProfile.userName}: </p> 
                    <p className='font-bold'>{reviewTipper.amount}</p>      
                </div>  
                ))           
            } 
        </>
    )
}