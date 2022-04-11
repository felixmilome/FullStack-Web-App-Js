import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState} from 'react';
import { getReviewsAction } from '../Midwares/rdx/actions/reviewsAction';
import moment from 'moment'; 
import{GiMoneyStack, GiTakeMyMoney} from "react-icons/gi"; 
import { BiCommentEdit } from "react-icons/bi";
import { MdSend,MdOutlineCancel} from "react-icons/md";
import{BsFillEmojiLaughingFill} from 'react-icons/bs';

import {BeatLoader} from "react-spinners";
import {patchReviewsAction, postReviewsAction, deleteReviewsAction} from "../Midwares/rdx/actions/reviewsAction.js"
import OutsideClickHandler from 'react-outside-click-handler';
import { DeliveryPop } from "../Modals/DeliveryPop.jsx";
import { SurePop } from './SurePop';
import {postTipsAction} from "../Midwares/rdx/actions/tipsAction.js";
import {ReviewTipRow} from "./ReviewTipRow.jsx"
import { PostRevReply } from './PostRevReply';
import Picker from 'emoji-picker-react'

//SearchArea: textarea replied

export const PostFrameRevRow = ({ diaryId, diaryCreator, userId, reviewer}) => {

     const[reviewData, setreviewData] = useState({reviewedId:diaryCreator, reviewedPostId:diaryId, body:'', replied:null, repliedPostId:null, reply:null});
     const[tipData, setTipData] = useState({receiverId:'', tippedPostId:'', type:'', amount:''});
      const[loading, setLoading] = useState(false);
      const[replyInput, setReplyInput] = useState(false);
      const[reviewDelivery, setReviewDelivery] = useState(false); 
      const[tipDelivery, setTipDelivery] = useState(false);  
      const[deleteDelivery, setDeleteDelivery] = useState(false);
       const[reviewEditor, setReviewEditor] = useState(false); 
       const[deleteReviewSurePop, setDeleteReviewSurePop] = useState(false); 
       const[tipReviewSurePop, setTipReviewSurePop] = useState(false);
       const[popTip, setpopTip] = useState(false); 
       const [chosenEmoji, setChosenEmoji] = useState(null);
       const [emojiBox, setEmojiBox] = useState(false);

       const socket = useSelector((state) => state.socketReducer);
       const reviewersAll = useSelector((state) => state.reviewsReducer);
       const availableRepliers = reviewersAll.filter(reviewer => reviewer.reviewedPostId === diaryId && reviewer.reply === true);
       


   
    const dispatch = useDispatch(); 


    const setDeleteFalse =()=> {
        setDeleteReviewSurePop(false);
    }
    const setTipFalse =()=> {
        setTipReviewSurePop(false);
    }

    function getSum(total, num) { 
        return total + num;
    }


    const onEmojiClick = (event, emojiObject) => { 
        
          
        setreviewData({reviewedId:diaryCreator, reviewedPostId:diaryId, body: reviewData.body+emojiObject.emoji+' ', replied:null, repliedPostId:null, reply:false});
        console.log(reviewData);  
    };

    const reviewTipsArray = reviewer.tipsArray;
    const unroundedReviewTips = reviewTipsArray.reduce(getSum, 0);
    const reviewTips = Math.trunc(unroundedReviewTips * Math.pow(10, 2)) / Math.pow(10, 2);
    

    const prepareTip = (tipAmount, type) => {

        setTipData ({receiverId:reviewer.reviewerId, tippedPostId:reviewer._id, type:type, amount: tipAmount});
        setTipReviewSurePop(true);
        console.log(tipData); 

    }

    const tipReview = () =>{
       
        setLoading(true);

        try{

           dispatch(postTipsAction(tipData, setTipReviewSurePop, setpopTip, setLoading, setTipDelivery, socket));
            
        }
        catch(error){
            console.log(error);
        }
    }

  
  

    const deleteReview = () =>{

        setLoading(true);
        const reviewId = reviewer._id;
       
        try{
            dispatch(deleteReviewsAction(reviewId, setLoading, setDeleteDelivery));
            console.log(reviewId);
        }
        catch(error){
            console.log(error);
        }
          
    }
    const patchReview = () =>{

        setLoading(true);
       
        try{
            dispatch(patchReviewsAction(reviewData, setreviewData, setLoading, setReviewDelivery, setReviewEditor));
            console.log(reviewData);
        }
        catch(error){
            console.log(error);
        }
          
    }
    const reviewDiary = () =>{

        setLoading(true);
        setReplyInput(false);
       
        try{
            dispatch(postReviewsAction(reviewData, setreviewData, setLoading, setReviewDelivery, socket));
            console.log(reviewData);
        }
        catch(error){
            console.log(error);
        }
          
    }
    const allReviews = useSelector((state) => state.reviewsReducer);
    const thisReplies = allReviews.filter(review => review.repliedPostId === reviewer._id && review.reply === true);

    return (


        <>
                    
        
            
                <div key={reviewer._id}  className='relative bg-gray-100 border-gray-300 rounded-md '>

         
                {reviewDelivery &&
                        <DeliveryPop message='Review Posted'/>
                        }

                    {deleteDelivery &&
                        <DeliveryPop message='Review Deleted'/>
                        }
                        
                    {tipDelivery &&
                        <DeliveryPop message='Tip Sent'/>
                        }
                    { deleteReviewSurePop &&    
                        <SurePop action={'Permanently Delete'} message={'Your Review?'} loadingFunction={loading} loadingMessage ={'DeletingReview'} yesFunction= {deleteReview} noFunction = {setDeleteFalse} /> 
                    }
                     { tipReviewSurePop &&    
                        <SurePop action={'Tip'} token={tipData.amount} message={'On this Review. No Reversal'} loadingFunction={loading} loadingMessage ={'Verifying Tip'} yesFunction= {tipReview} noFunction = {setTipFalse} /> 
                    }
        

                    
            
                
                    <div className=" relative p-0.5 flex w-full justify-start items-center text-xs font-bold text-gray-600 rounded-md lg:max-w-none">
                        
                            {/* EMoji & Pic */}
                            <div className="space-y-3 mb-7 items-center inline-block items-center p-1">
                                
                               {reviewer.reply===false && <img src={reviewer.reviewerMiniProfile.dpUrl} alt="DP" className="rounded-full object-cover h-8 w-8"/>}
                               {reviewer.reply===true && <img src={reviewer.reviewerMiniProfile.dpUrl} alt="DP" className="rounded-full object-cover h-6 w-6"/>}
                                
                            </div>

                            {/* Name and Comment*/}
                            <div className="items-center m-1 bg-transparent w-5/6">  
                            <div className="flex bg-transparentrounded-2xl w-fit">
                                <div  className= "max-h-96 overflow-scroll bg-gray-100 border  border-gray-300 p-3 rounded-2xl max-w-3/4">
                                    
                                    <div className= ' bg-transparent rounded-md w-full '> 

                                        
                                        <p className='text-xs font-semibold'> @{reviewer.reviewerMiniProfile.userName}:</p>
                                       {reviewer.reply === true &&
                                       <div className= 'w-max p-0.5 rounded border border-gray-300 flex justify-center'>
                                            <p className='text-xs font-light'> to: @{reviewer.repliedMiniProfile.userName}</p>
                                        </div>}
                                        
                                        
                                    </div>
                                    
                              
                                    {reviewer.body.split('\n').map(function(item) {
                                    return (
                                        <p style={{wordBreak: 'break-word'}} key={item} className="leading-5 font-light text-gray-700">{item}</p> 
                                        )
                                    })}

                                <p className='font-extralight'>{reviewer.edited===true && 'edited '}{moment (reviewer.time).fromNow()}</p>
                                </div>
                                

                            </div>

                            {loading === false ? <div className='ml-2 pt-1 flex justify-left space-x-2 items-center'>

                                        <OutsideClickHandler     
                                        onOutsideClick={() => {
                                            setpopTip(false);
                                        }}
                                        >
                                        <div onClick = {()=> setpopTip(!popTip)} className="bg-transparent rounded-full flex justify-center cursor-pointer items-center hover:bg-gray-200 px-2 group">
                                            {/* <GiTakeMyMoney size ={24} className="text-gray-400"/> */}
                                            <div className= 'flex items-center'>
                                                <p>tips</p>
                                               {reviewTips>0 && <p>({reviewTips})</p>}
                                               {reviewTips>0 && <p>+you</p>}
                                            </div>
                                 
                                            {popTip && 
                                            <div className='flex  space-x-0.5'>
                                                <div className= 'flex absolute bottom-6 left-0 justify-right space-x-2 font-bold bg-gray-200 border border-gray-300 p-1'>
                                                
                                                        <div onClick={()=> prepareTip(1, 'review')} className= 'p-1 border border-gray-300 bg-gray-100 hover:bg-white'>
                                                            <p>1</p>
                                                        </div>
                                                        <div onClick={()=> prepareTip(5, 'review')} className= 'p-1 border border-gray-300 bg-gray-100 hover:bg-white'>
                                                            <p>5</p>
                                                        </div>
                                                        <div onClick={()=> prepareTip(10, 'review')} className= 'p-1 border border-gray-300 bg-gray-100 hover:bg-white'>
                                                            <p>10</p>
                                                        </div>
                                                        <div onClick={()=> prepareTip(25, 'review')} className= 'p-1 border border-gray-300 bg-gray-100 hover:bg-white'>
                                                            <p>25</p>
                                                        </div>
                                                        <div onClick={()=> prepareTip(50, 'review')} className= 'p-1 border border-gray-300 bg-gray-100 hover:bg-white'>
                                                            <p>50</p>
                                                        </div>
                                                </div>
                                                <div className= 'w-1/2 text-xs justify-around absolute  bottom-6 right-0 font-bold bg-gray-200 '>
                                                      <ReviewTipRow reviewId={reviewer._id}/>                 
                                                </div>
                                               


                                            </div>
                                            }

                                        </div>
                                        
                                        </OutsideClickHandler>


                                        
                                        { reviewer.reply === false && //if this is not a reply
                                            <div onClick= {()=>{
                                                setReplyInput(!replyInput);
                                                setreviewData({...reviewData, body:'', replied:reviewer.reviewerId});
                                                }}className= 'inline-flex items-center hover:bg-gray-200 rounded-xl px-1 cursor-pointer'>
                                                        <p>reply {thisReplies.length>0 && (thisReplies.length)}</p>
                                            </div>
                                        }
                                        
                                        { reviewer.reply === true && reviewer.reviewerId !== userId &&

                                            <div className='relative'>
                                                <div onClick= {()=>{
                                                    setReplyInput(!replyInput);
                                                    setreviewData({...reviewData, body:'', replied:reviewer.reviewerId});
                                                    }}className= 'inline-flex items-center hover:bg-gray-200 rounded-xl px-1 cursor-pointer'>
                                                            <p>reply</p>
                                                </div>
                                                
                                               
                                            </div>
                                        }
                                      
                                        
                                       
                                      

                                        { reviewer.reviewerId === userId && reviewer.edited===false && 
                                        <div onClick= {()=>{
                                            setreviewData({...reviewData, body:reviewer.body});
                                            setReviewEditor(true);
                                            setReplyInput(false);
                                            }} className="bg-transparent rounded-full flex justify-center cursor-pointer hover:bg-gray-200 px-2 items-center  group">
                                            {/* <BiCommentEdit  size ={20} className="text-gray-400"/> */}
                                            <p>edit</p>
                                        </div>}
                                        {reviewer.reviewerId === userId && <div onClick = {() => setDeleteReviewSurePop(true)}className="bg-transparent rounded-full flex justify-center cursor-pointer hover:bg-gray-200 px-2 items-center  group ">
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

                   
                    
                    {/* INPUT */}



                                        {/* EDITOR */}
                    {reviewEditor &&  <div className=" w-2/3 bg-gray-100 items-center">
                            
                            <OutsideClickHandler     
                                    onOutsideClick={() => {
                                        setReviewEditor(false);
                                    }}
                                    > 
                            
                                    
                                    <div className='bg-transparent border  border-gray-300 rounded-md p-1'>
                                   
                                      
                                                
                                        <textarea value= {reviewData.body}
                                        onChange={(e)=> setreviewData({reviewId:reviewer._id, body: e.target.value})}
                                        type="text" placeholder="Edit Review Here..." className="h-16 w-full text-gray-700 font-light outline-none bg-gray-100 text-sm  border border-gray-300 rounded-md py-3 pl-3 pr-8"/>
                                           <div className='w-full flex justify-end'>
                                                <div onClick={()=>setEmojiBox(!emojiBox)} className='w-max text-left text-gray-100 bg-gray-400 hover:bg-gray-500 rounded-full p-1'>
                                                            <BsFillEmojiLaughingFill/>
                                                </div>
                                            </div>
                                            {emojiBox && <div className='flex justify-center bg-gray-300'>
                                            <Picker className= 'bg-gray-300' onEmojiClick={onEmojiClick} />
                                            </div>}
                                        <div className='flex items-center justify-around'>
                                            <div onClick= {()=> setReviewEditor(false)}className='flex bg-gray-100 px-3 rounded-t-md cursor-pointer justify-center'>
                                            <p className='text-xs'>Cancel</p>
                                            </div>
        
                                            <div >
                                                    {reviewData && reviewData.body.length > 0 && reviewData.body.length < 2000 &&
                                                    <>
                                                        {!loading &&
                                                        <div className='flex bg-gray-100 px-3 rounded-t-md cursor-pointer justify-center'>
                                                        <p className= 'text-xs'>Edit </p>
                                                        <MdSend onClick= {patchReview}/> 
                                                        </div>
                                                        }
                                                        {loading && 
                                                        <>
                                                        {/* <p className= 'text-xs font-extralight'>sending review</p> */}
                                                        <BeatLoader size={7} color='black' loading/>
                                                        </> }
                                                    </>
                                                    } 
                                            </div>
                                        </div>
        
                                    </div>
                                    </OutsideClickHandler>
                            </div>
                            }

                                    {/*REPLY A REPLY INPUT */}
                                    { reviewer.reply === true && reviewer.reviewerId !== userId &&
                                                 <div className=" w-full rounded-xl items-center">
                                                    
                                                    <div className="relative w-full flex items-center justify-center space-x-2">
                                                            <textarea value= {reviewData.body}
                                                                onChange={(e)=> {
                                                                    
                                                                    setreviewData({...reviewData, reviewedId:diaryCreator, reviewedPostId:diaryId, body:e.target.value, replied:reviewer.reviewerId, repliedPostId:reviewer.repliedPostId, reply:true});
                 
                                                                }}
                                                                type="text" placeholder={`reply @${reviewer.reviewerMiniProfile.userName}`} className="max-h-screen
                                                                w-full ml-8 text-gray-700 outline-none bg-gray-100
                                                                text-xs  border border-gray-300 rounded-md py-3 pl-3 pr-8" 
                                                                
                                                                />
                
                                                                    <div  className=''>
                                                                        { reviewData.body.length > 0 && reviewData.body.length < 2000 &&
                                                                        <>
                                                                            {!loading && <MdSend onClick= {reviewDiary}/> }
                                                                            {loading && 
                                                                            <>
                                                                            {/* <p className= 'text-xs font-extralight'>sending review</p> */}
                                                                            <BeatLoader size={7} color='black' loading/>
                                                                            </> }
                                                                        </> 
                                                                        } 
                                                                    </div>
                                                            
                                                            <div className='p-3'>
                                                                <div onClick={()=>setEmojiBox(!emojiBox)} className='w-max text-left text-gray-100 bg-gray-400 hover:bg-gray-500 rounded-full p-1'>
                                                                            <BsFillEmojiLaughingFill/>
                                                                </div>
                                                            </div>
                                                    </div>
                                                   
                                                             {emojiBox && 
                                                                <div className='flex justify-center bg-gray-300'>
                                                                    <Picker className= 'bg-gray-300' onEmojiClick={onEmojiClick} />
                                                                </div>
                                                            } 
                                                            
                                                </div>
                                            }
                    
                  

                  {/*REPLY INPUT */}
                       { reviewer.reply ===false && replyInput ===true && reviewEditor=== false &&
                       <div className=" w-full rounded-xl items-center">
                            
                           

                               
                                    <div className="relative flex items-center justify-center p-3 space-x-2">
                                            <textarea value= {reviewData.body}
                                                onChange={(e)=> {
                                                    
                                                    setreviewData({...reviewData, reviewedId:diaryCreator, reviewedPostId:diaryId, body:e.target.value, replied:reviewer.reviewerId, repliedPostId:reviewer._id, reply:true});
                                                    

                                                }}
                                                type="text" placeholder={`reply @${reviewer.reviewerMiniProfile.userName}`} className="max-h-screen
                                                w-full ml-8 text-gray-700 outline-none bg-gray-100
                                                text-xs  border border-gray-300 rounded-md py-3 pl-3 pr-8"/>

                                                    <div  className=''>
                                                        { reviewData.body.length > 0 && reviewData.body.length < 2000 &&
                                                        <>
                                                            {!loading && <MdSend onClick= {reviewDiary}/> }
                                                            {loading && 
                                                            <>
                                                            {/* <p className= 'text-xs font-extralight'>sending review</p> */}
                                                            <BeatLoader size={7} color='black' loading/>
                                                            </> }
                                                        </> 
                                                        } 
                                                    </div>
                                            
                                            <div className='w-full'>
                                                <div onClick={()=>setEmojiBox(!emojiBox)} className='w-max text-left text-gray-100 bg-gray-400 hover:bg-gray-500 rounded-full p-1'>
                                                            <BsFillEmojiLaughingFill/>
                                                </div>
                                            </div>
                                    </div>
                                    {emojiBox && 
                                                <div className='flex justify-center bg-gray-300'>
                                                    <Picker className= 'bg-gray-300' onEmojiClick={onEmojiClick} />
                                                </div>
                                            } 
                        </div>
                        }
                         {replyInput===true && availableRepliers?.length > 0 &&
                         <div className='max-h-80 overflow-scroll bg-gray-200  w-fit rounded-xl'>  
                                {availableRepliers?.map((replier) =>(
                                    <> 
                                        {replier.repliedPostId === reviewer._id && 
                                        <div key={replier._id}  className='ml-20 bg-gray-100'>            
                                            <PostRevReply diaryId={diaryId} diaryCreator={diaryCreator} userId= {userId} reviewer= {replier}/>
                                        </div>
                                        } 
                                    </>
                                    ))
                                }
                                </div>
                        }
                        
                         
                
            </div>

           

            </>
     
    )
}