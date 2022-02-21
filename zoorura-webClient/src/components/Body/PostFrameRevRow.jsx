import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState} from 'react';
import { getReviewsAction } from '../Midwares/rdx/actions/reviewsAction';
import moment from 'moment'; 
import{GiMoneyStack, GiTakeMyMoney} from "react-icons/gi"; 
import { BiCommentEdit } from "react-icons/bi";
import { MdSend,MdOutlineCancel} from "react-icons/md";
import {BeatLoader} from "react-spinners";
import {patchReviewsAction, deleteReviewsAction} from "../Midwares/rdx/actions/reviewsAction.js"
import OutsideClickHandler from 'react-outside-click-handler';
import { DeliveryPop } from "../Modals/DeliveryPop.jsx";
import { SurePop } from './SurePop';

export const PostFrameRevRow = ({diaryId, userId, reviewer}) => {

     const[reviewData, setreviewData] = useState({reviewId:'', body: ''});
      const[reviewLoading, setReviewLoading] = useState(false);
      const[reviewDelivery, setReviewDelivery] = useState(false); 
      const[editDelivery, setEditDelivery] = useState(false);
       const[reviewEditor, setReviewEditor] = useState(false); 
       const[deleteReviewSurePop, setDeleteReviewSurePop] = useState(false); 
       


   
    const dispatch = useDispatch(); 


    const setDeleteFalse =()=> {
        setDeleteReviewSurePop(false);
    }
  

    const deleteReview = () =>{

        setReviewLoading(true);
        const reviewId = reviewer._id;
       
        try{
            dispatch(deleteReviewsAction(reviewId, setReviewLoading, setEditDelivery, setReviewEditor));
            console.log(reviewId);
        }
        catch(error){
            console.log(error);
        }
          
    }
    const patchReview = () =>{

        setReviewLoading(true);
       
        try{
            dispatch(patchReviewsAction(reviewData, setReviewLoading, setReviewDelivery, setReviewEditor));
            console.log(reviewData);
        }
        catch(error){
            console.log(error);
        }
          
    }


    return (


        <>
                    {reviewDelivery &&
                        <DeliveryPop message='Review Edited'/>
                        }

                    {editDelivery &&
                        <DeliveryPop message='Review Deleted'/>
                        }
                    { deleteReviewSurePop &&
                    
                        <SurePop action={'Delete'} message={'Your Review'} loadingFunction={reviewLoading} loadingMessage ={'DeletingReview'} yesFunction= {deleteReview} noFunction = {setDeleteFalse} /> 

                    }
        
            
                <div key={reviewer._id}  className='relative bg-gray-100 border-gray-300 rounded-md '>

                 <OutsideClickHandler     
                            onOutsideClick={() => {
                                setReviewEditor(false);
                            }}
                            >


                    {/* EDITOR */}
                    {reviewEditor && <div className="absolute bottom-2 w-2/3 bg-gray-100 py-1 items-center">
                            
                       
                    
                            
                            <div className='bg-transparent rounded-md p-0.5'>
                                <textarea value= {reviewData.body}
                                onChange={(e)=> setreviewData({reviewId:reviewer._id, body: e.target.value})}
                                type="text" placeholder="Edit Review Here..." className="h-16 w-full text-gray-700 font-light outline-none bg-gray-100 text-sm  border border-gray-300 rounded-md py-3 pl-3 pr-8"/>
                                
                                <div className='flex items-center justify-around'>
                                    <div onClick= {()=> setReviewEditor(false)}className='flex bg-gray-100 px-3 rounded-t-md cursor-pointer justify-center'>
                                    <p className='text-xs'>Cancel</p>
                                    </div>

                                    <div >
                                            {reviewData && reviewData.body.length > 0 && reviewData.body.length < 2000 &&
                                            <>
                                                {!reviewLoading &&
                                                <div className='flex bg-gray-100 px-3 rounded-t-md cursor-pointer justify-center'>
                                                <p className= 'text-xs'>Edit </p>
                                                <MdSend onClick= {patchReview}/> 
                                                </div>
                                                }
                                                {reviewLoading && 
                                                <>
                                                {/* <p className= 'text-xs font-extralight'>sending review</p> */}
                                                <BeatLoader size={7} color='black' loading/>
                                                </> }
                                            </>
                                            } 
                                    </div>
                                </div>

                            </div>
                    </div>
                    }
            
                
                    <div className="p-0.5 flex w-full justify-start items-center text-xs font-bold text-gray-600 rounded-md lg:max-w-none">
                        
                            {/* EMoji & Pic */}
                            <div className="space-y-3 mb-7 items-center inline-block items-center p-1">
                                
                                <img src={reviewer.reviewerMiniProfile.dpUrl} alt="DP" className="rounded-full object-cover h-8 w-8"/>
                                
                            </div>

                            {/* Name and Comment*/}
                            <div className="items-center m-1 bg-transparent w-5/6">  
                            <div className="flex bg-transparentrounded-2xl w-fit">
                                <div className= "bg-gray-100 border  border-gray-300 p-3 rounded-2xl max-w-3/4">
                                    
                                    <div className= 'flex bg-transparent rounded-md w-min '>

                                        
                                        <p className='text-xs font-semibold'> @{reviewer.reviewerMiniProfile.userName}:</p>
                                        
                                    </div>
                                    
                                <div className= "font-light text-xs break-words">{reviewer.body}</div>
                                <p className='font-extralight'>{reviewer.edited===true && 'edited '}{moment (reviewer.time).fromNow()}</p>
                                </div>
                                

                            </div>

                            {reviewLoading === false ? <div className='ml-2 pt-1 flex space-x-8 items-center'>
                                        <div className="bg-transparent rounded-full flex justify-center cursor-pointer h-5 w-5 items-center hover:bg-teal-100 group">
                                            {/* <GiTakeMyMoney size ={24} className="text-gray-400"/> */}
                                            <p>tip</p>
                                        </div>
                                        { reviewer.reviewerId === userId && reviewer.edited===false && <div onClick= {()=>{
                                            setreviewData({...reviewData, body:reviewer.body});
                                            setReviewEditor(true);
                                            }} className="bg-transparent rounded-full flex justify-center cursor-pointer h-5 w-5 items-center hover:bg-yellow-100 group">
                                            {/* <BiCommentEdit  size ={20} className="text-gray-400"/> */}
                                            <p>edit</p>
                                        </div>}
                                        {reviewer.reviewerId === userId && <div onClick = {() => setDeleteReviewSurePop(true)}className="bg-transparent rounded-full flex justify-center cursor-pointer h-5 w-5 items-center hover:bg-red-100 group ">
                                            {/* <GiTakeMyMoney size ={24} className="text-gray-400"/> */}
                                            <p>delete</p>
                                        </div>}
                                    </div>: 
                                    <div className='ml-5'>
                                        <BeatLoader size={7} color='black' loading/>
                                    </div>
                                    }

                        </div>
                                
                    </div>
                </OutsideClickHandler>
                
            </div>

            </>
     
    )
}