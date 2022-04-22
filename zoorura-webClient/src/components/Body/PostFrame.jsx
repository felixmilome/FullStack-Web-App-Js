import { DotsCircleHorizontalIcon} from "@heroicons/react/outline";



import{BsFacebook, BsInstagram, BsTwitch} from "react-icons/bs";
import{RiSoundcloudLine, RiPinterestLine, RiRedditFill} from "react-icons/ri";
import{ImInstagram, ImReddit, ImWordpress, ImYoutube2} from "react-icons/im";
import{SiFacebook, SiTiktok, SiTwitter} from "react-icons/si";
import { MdSend,MdOutlineCancel} from "react-icons/md";
import { FaGoogleDrive } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import{BsFillEmojiLaughingFill} from 'react-icons/bs';

import {BeatLoader} from "react-spinners";
import {useNavigate} from 'react-router-dom';


import {FbForm, IgForm, PnForm, RdForm, SnForm, TchForm, TkForm, TwForm, WpForm, YtForm, PicForm, PicFrame, VideoFrame, AudioForm, VideoForm} from "./PostForms/Previews.jsx";


import{GiDividedSquare, GiTakeMyMoney} from "react-icons/gi"; 
import{GoMegaphone} from "react-icons/go";
import { RiShareForwardBoxLine  } from "react-icons/ri";
import { AiOutlineComment, AiOutlineFolderView  } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import{} from "@fortawesome/free-regular-svg-icons";
//import{faComments, faMoneyBillWave, faMoneyBillWaveAlt, faShareSquare,} from "@fortawesome/free-solid-svg-icons";

import TipModal from '../Modals/TipModal.jsx'
import { useState, useEffect } from 'react';
import PostoptionsModal from "../Modals/PostoptionsModal.jsx";
import OutsideClickHandler from 'react-outside-click-handler';
import ReviewBubble from "./ReviewBubble.jsx";
import { tipDiariesAction, reviewDiariesAction } from "../Midwares/rdx/actions/diariesAction.js";
//import {getMiniProfileAction} from "../Midwares/rdx/actions/profileAction.js"
import {postTipsAction, getTipsAction} from "../Midwares/rdx/actions/tipsAction.js"
import {postReviewsAction, getReviewsAction} from "../Midwares/rdx/actions/reviewsAction.js"
import {postDisplayDiariesAction} from "../Midwares/rdx/actions/diariesAction.js";
import {quickFollowAction} from "../Midwares/rdx/actions/profileAction.js";

import moment from 'moment'; 
import {useDispatch,useSelector} from 'react-redux';
import { PostFrameTips } from "./PostFrameTips.jsx";
import { DeliveryPop } from "../Modals/DeliveryPop.jsx";
import { PostFrameReviews } from "./PostFrameReviews.jsx";
import {Link} from 'react-router-dom';
import Picker from 'emoji-picker-react'

//Search Area title 5 img follow subscribe




function PostFrame({diary, diaryId, setDiaryId, params}) {

    const user = JSON.parse(localStorage.getItem('profile'));
   const dispatch = useDispatch();
    const[popTip, setpopTip] = useState(false);
    //const[tipData, setTipData] = useState({tipper: '', tipperId: '', amount: null, tipperObj: {tipper: '', tipperId:'', amount: null}});
    const[tipData, setTipData] = useState({receiverId:'', tippedPostId:'', type: '', amount: null});
    //const[reviewData, setreviewData] = useState({reviewer: user.result.userName, reviewerId:user.result._id, body: ''});
    const[reviewData, setreviewData] = useState({reviewedId:diary.creator, reviewedPostId:diary._id, body: '', replied:null, repliedPostId:null, reply:false});
    const[socketReviewData, setSocketReviewData] = useState({reviewerId:user.result._id, reviewerMiniProfile:{_id: user.result._id, dpUrl: user.result.dpUrl, userName:user.result.userName}, reviewedMiniProfile:diary.creator, reviewedPostId:diary._id, body: ''});
    const [socketReviewNotification, setSocketReviewNotification] = useState({sender:{_id:user.result._id, dpUrl:user.result.dpUrl, userName:user.result.userName}, receiver:diary.creator, body:'',postId:diary._id, type: 'review'});
    const [displayData, setDisplayData] = useState({
        title:diary.title, caption:diary.caption, media:diary.media, creator:diary.creator, file: diary.file, type: 'display', originalId:diary._id
    }); 
    const[popSure, setpopSure] = useState(false);
    const[spam, setSpam] = useState(false);
    const[tip, setTip] = useState({tips:null});
    const[popOptions, setpopOptions] = useState(false);
    const[tipLoading, setTipLoading] = useState(false);
   // const [followData, setFollowData] = useState({follower:user.result._id, followed:miniProfile._id});
     
    const[tipperView, seTipperview] = useState(false);
    const [miniProfile, setMiniProfile] = useState(null);
    const [displayer, setDisplayer] = useState(null);
    const[tipDelivery, setTipDelivery] = useState(false);
    const[loadingDisplay, setLoadingDisplay] = useState(false);

    const[reviewLoading, setReviewLoading] = useState(false); 
    const[reviewDelivery, setReviewDelivery] = useState(false); 
    const[reviewDisplay, setReviewDisplay] = useState(false); 
    const[popDisplayPosted, setPopDisplayPosted] = useState(false); 
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [emojiBox, setEmojiBox] = useState(false);
    const [loadingFollow, setLoadingFollow] = useState(false);
    

    const socket = useSelector((state) => state.socketReducer);
    const walletBalance = useSelector((state) => state.walletReducer);
    const follows = useSelector((state) => state.followsReducer);

    const navigate = useNavigate();
      



        function getSum(total, num) { 
            return total + num;
        }
        const tipsArray = diary.tipsArray;
        const unroundedTips = tipsArray.reduce(getSum, 0);
        const tips = Math.trunc(unroundedTips * Math.pow(10, 2)) / Math.pow(10, 2);
       

    
        const onEmojiClick = (event, emojiObject) => { 
        
          
            setreviewData({reviewedId:diary.creator, reviewedPostId:diary._id, body: reviewData.body+emojiObject.emoji+' ', replied:null, repliedPostId:null, reply:false});
            console.log(reviewData);  
        };
    

    const reviewDiary = () =>{

        setReviewLoading(true);
        setEmojiBox(false);
       
        try{
            dispatch(postReviewsAction(reviewData, setreviewData, setReviewLoading, setReviewDelivery, socket));
            console.log(reviewData);
        }
        catch(error){
            console.log(error);
        }
          
    }

    const prepareTip = (tipAmount, type) => {

        setTipData ({receiverId:diary.creator, tippedPostId:diary._id, type:type, amount: tipAmount});
        setpopSure(true);
        console.log(tipData); 

    }

    const followHandler= (creatorId) => {

        const followDataObj = {follower:user.result._id, followed:creatorId}
        setLoadingFollow(true);
        dispatch (quickFollowAction(followDataObj));


    }

    const tipDiary = () =>{
       
        setTipLoading(true);
        

        try{

           dispatch(postTipsAction(tipData, setpopSure, setpopTip, setTipLoading, setTipDelivery, socket));
            
        }
        catch(error){
            console.log(error);
        }
    }

    const handleDisplay = () =>{

        setLoadingDisplay(true);
        console.log(socket);
       
        dispatch(postDisplayDiariesAction(displayData, setPopDisplayPosted, navigate, setSpam, socket));
        console.log(displayData);

    }
  

    return (

        <>
        {tipDelivery &&
        <DeliveryPop message='Tip Sent'/>
        }
        {reviewDelivery &&
        <DeliveryPop message='Review Sent'/>
        }
        {spam ==true &&
        <DeliveryPop message='Todays Review Limit(25) reached! Try Tomorrow '/>
         } 
        <div className="text-black p-2 sm:px-12 py-4 rounded-md sm:rounded-xl bg-gray-100 relative sm:w-3/4 xl:w-2/5 mx-auto mb-6"> 
         

            {/* Post-Top-Cyan Invisible Parent*/}
            <div className="flex justify-end">
                {/* Top-Cyan */}
                <div className="rounded-t-xl w-full transition delay-50 py-0.5 flex items-center font-bold justify-between">
                        {/*Top-Mid*/}
                        <div className="flex items-center justify-between">
                            {/* Top-Mid Img*/}
                            {diary.miniProfile &&
                            <>
                            <div className="ml-3 bg-white rounded-full">
                                <img src={diary.miniProfile[0].dpUrl} alt="DP" className=" rounded-full object-cover h-10 w-10 m-0.5"/>
                            </div> 
                           
                            <div className="sm:ml-2 items-center ml-0.5 py-3"> 
                                <p className="leading-3 text-sm font-medium my-1 ">@{diary.miniProfile[0].userName}</p>
                                <p className="p-0.5 leading-3 text-xs font-extralight my-1"><b></b>{moment (diary.time).fromNow()}</p>
                                
                                {params !== 'profile' && !follows.includes(diary.miniProfile[0]._id) && 
                                    <>
                                        {loadingFollow === false ?

                                            <div onClick={()=>followHandler(diary.miniProfile[0]._id)} className='flex text-sm justify-center items-center w-24 border border-cyan-400 rounded-md font-normal hover:bg-cyan-400  cursor-pointer'>
                                                <p>subscribe</p>
                                            </div>
                                            :
                                            <div  className='flex text-sm justify-center items-center w-24 border border-cyan-400 rounded-md font-normal hover:bg-cyan-400  cursor-pointer'>
                                            <BeatLoader size={7} color ='cyan'/>
                                            </div>

                                        }
                                    </>
                                }



                            </div>
                            </>
                            }
                            {!diary.miniProfile &&
                            <>
                            <div className="ml-3 bg-white rounded-full">
                                <img src={diary.diaryMiniProfile.dpUrl} alt="DP" className=" rounded-full object-cover h-10 w-10 m-0.5"/>
                            </div> 
                           
                            <div className="sm:ml-2 items-center ml-0.5 py-3"> 
                                <p className="leading-3 text-sm font-medium my-1 ">@{diary.diaryMiniProfile.userName}</p>
                                <p className="p-0.5 leading-3 text-xs font-extralight my-1"><b></b>{moment (diary.time).fromNow()}</p>
                               
                                {params !== 'profile' && !follows.includes(diary.diaryMiniProfile._id) && 
                                    <>
                                        {loadingFollow === false ?

                                            <div onClick={()=>followHandler(diary.diaryMiniProfile._id)} className='flex text-sm justify-center items-center w-24 border border-cyan-400 rounded-md font-normal hover:bg-cyan-400  cursor-pointer'>
                                                <p>subscribe</p>
                                            </div>
                                            :
                                            <div  className='flex text-sm justify-center items-center w-24 border border-cyan-400 rounded-md font-normal hover:bg-cyan-400  cursor-pointer'>
                                            <BeatLoader size={7} color ='cyan'/>
                                            </div>

                                        }
                                    </>
                                }

                            </div>
                            </>
                            } 
                             
                          
                        </div>
                    {/* Top-Menu */}

                    {diary.postType === 'display' &&
                    <div className=" items-center bg-transparent ">
                              
                              <div className=" m-auto bg-gray-200 p-0.5 w-10/12 sm:px-3 rounded-full w-full">
                              {/* <div className="flex justify-start bg-white w-1/3 rounded-full">
                                  <img src={user.result.dpUrl} alt="DP" className=" rounded-full object-cover h-6 w-6 m-0.5"/>
                                  <div className= 'flex justify-center bg-transparent p-1 rounded-full items-center'>
                                      <GoMegaphone size ={15} className="text-gray-400"/>    
                                  </div> 

                              </div>  */}
                              
                                  <div className=" items-center"> 
                                      <div className='flex items-center justify-center space-x-2 w-full'>
                                          <GoMegaphone size ={20} className="text-yellow-500"/> 
                                          <p className="leading-3 text-xs text-gray-700 font-medium my-1 ">@{diary.displayerMiniProfile[0].userName}</p>
                                      </div>
                                  
                                  
                                  </div>
                              
                              </div>
                                  
                              <p className="p-0.5 leading-3 text-xs font-extralight my-1"><b></b>Endorsed: {moment (diary.displayTime).fromNow()}</p>

                    </div>}

                  
                    <div>
                    
                    </div>
                    <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopOptions(false);
                            }}
                            >
                            <div className="h-10 w-10 m-1 
                            rounded-full flex justify-around 
                             items-center bg-transparent"
                            onClick={ () => 
                            {setpopOptions(!popOptions)}
                            }>
                                <DotsCircleHorizontalIcon className=" h-8 w-8
                                 items-center cursor-pointer
                                  hover:text-gray-600 text-gray-300"/>
                    </div>
                            {popOptions && <PostoptionsModal setpopOptions={setpopOptions} diary= {diary} creator={diary.creator} setDiaryId = {setDiaryId}/>}
                            
                        </OutsideClickHandler>    
                
                </div> 

            </div>


        {/* Post Mid Invisible Parent */}
        <div className=" rounded-b-xl break-words">

        {/* Post Caption Invisible Parent */}
        <div className="relative flex justify-center   my-0.5">
            {/* Post Mid Frame*/}
            <div onClick= {()=> {console.log(diary.reviewers)}} className="max-h-screen overflow-scroll w-full items-center p-4 text-sm rounded-t-xl break-words"> 
                    <p className="leading-5 font-semibold my-1 text-gray-700">{diary.title}</p>
                    
                    {diary.caption.split('\n').map(function(item) {
                    return (
                        <p key={item} className="leading-5 font-light text-gray-700">{item}</p> 
                        )
                    })}


            </div>  

        </div>

        <div className="flex p-1 justify-center ">
            {/* Post Mid Frame*/}
            {diary.file && diary.file.length > 0 && <div className="max-h-screen w-full transition delay-50 flex z-30 justify-center p-1 rounded-md shadow-md items-center cursor-pointer bg-gray-200 font-bold hover:bg-gray-300">
                            
            
            {/*=============================IFRAMES========================================*/}
                                   {/* ======IMAGE FILE====== */}
                                   { diary.file.length && diary.media === 'image' && diary.file.includes('zooruraweb.appspot.com') &&
                                        <div className =" w-full">
                                            <div className="relative z-50 flex justify-center m-auto w-full lg:p-0">
                                                <PicFrame Url= {diary.file}/>
                                            </div>     
                                       </div> 
                                    }
                                     {/* ======VIDEO FILE====== */}
                                   { diary.file.length && diary.media === 'video' && diary.file.includes('zooruraweb.appspot.com') &&
                                        <div className =" w-full">
                                            <div className="relative z-10 flex justify-center m-auto w-full lg:p-0">
                                                <VideoForm Url= {diary.file} DP={user.result.dpUrl}/>
                                            </div>  
                                       </div> 
                                    }
                                       {/* ======AUDIO FILE====== */}
                                   { diary.file.length && diary.media === 'audio' && diary.file.includes('zooruraweb.appspot.com') &&
                                        <div className =" w-full">
                                            <div className="relative z-10 flex justify-center m-auto w-full lg:p-0">
                                                <AudioForm Url= {diary.file} DP={user.result.dpUrl}/>
                                            </div>
 
                                       </div> 
                                    }
                                    
                                {/* ======YOUTUBE======== */}
                                {diary.media === 'url' &&
                                <>
                                { diary.file.length && diary.file.includes('youtube.com/')?
                                        <div className ="w-full">
                                            <div className=' w-full flex justify-center text-gray-400'>
                                           <ImYoutube2 size={40}/>
                                           </div>
                                      {/* <p className= 'text-center  text-gray-400 p-1 text-xs' >Youtube Attachment</p> */}
                                            <div className="flex justify-center m-auto w-full  lg:p-0">
                                                 <YtForm Url= {diary.file}/>
                                                 <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Youtube Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                           
                                        </>
                                    }
                                    {/* ======INSTAGRAM======== */}
                                     { diary.file.length && diary.file.includes('www.instagram.com')?
                                        <div className ="w-full">
                                            <div className='p-3 flex justify-center text-gray-400'>
                                                <BsInstagram/>
                                                
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Instagram Attachment</p> */}
                                            <div className="relative flex justify-center m-auto w-full lg:p-0">
                                                <IgForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Instagram Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                    {/* ======TIKTOK======== */}
                                    { diary.file.length && diary.file.includes('www.tiktok.com')?
                                        <div >
                                            <div className='p-3 flex justify-center text-gray-400'>
                                                <SiTiktok/>
                                            </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Tiktok Attachment</p> */}
                                            <div className="relative flex justify-center m-auto lg:p-0">
                                                 <TkForm Url= {diary.file}/>
                                                 <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Tiktok Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                    {/* tiktok app */}
                                    { diary.file.length && diary.file.includes('vm.tiktok.com') || diary.file.includes('vt.tiktok.com') ?
                                            <div >
                                            <div className='relative flex justify-center text-gray-400'>
                                                <SiTiktok/>
                                            </div>
                                          
                                            <p className= 'text-center text-red-400 p-1 text-xs' >Apologies. Tiktok Id not found. fetch Tiktok Link from <b>WEB-BROWSER</b> and <b>NOT APP</b></p>
                                            </div>
                                       : 
                                       <>
                                          
                                        </>
                                    }
                                    {/* ======Twitter======== */}
                                    { diary.file.length && diary.file.includes('twitter.com')?
                                        <div className ="w-full" >
                                            <div className='p-3 flex justify-center text-gray-400'>
                                           <SiTwitter/>
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Twitter Attachment</p> */}
                                            <div className="relative flex justify-center m-auto lg:p-0">
                                             <TwForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Tweet...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                       {/* ======SOUNDCLOUD======== */}
                                       { diary.file.length && diary.file.includes('soundcloud.com')?
                                        <div >
                                            <div className='flex p-3 justify-center text-gray-400'>
                                           <RiSoundcloudLine/>
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Soundcloud Attachment</p> */}
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                             <SnForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Soundcloud Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                         
                                        </>
                                    }
                                     {/* ======PINTEREST======== */}
                                     { diary.file.length && diary.file.includes('pinterest.com')?
                                        <div >
                                            <div className='flex p-3 justify-center text-gray-400'>
                                           <RiPinterestLine/>
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Pinterest Attachment</p> */}
                                            <div className="relative flex justify-center m-auto lg:p-0">
                                             <PnForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Pin...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                            
                                        </>
                                    } 
                                    
                                            {/* pin app */}
                                            { diary.file.length && diary.file.includes('pin.it')?
                                                    <div >
                                                    <div className='relative p-3  flex justify-center text-gray-400'>
                                                        <RiPinterestLine/>
                                                    </div>
                                                
                                                    <p className= 'text-center text-red-400 p-1 text-xs' >Apologies! Pin Id not found. Kindly fetch Pinterest Link from Web-Browser ADDRESS BAR</p>
                                                    </div>
                                            : 
                                            <>
                                                   
                                                </>
                                            }
                                            
                                     {/* ======REDDIT======== */}
                                     { diary.file.length && diary.file.includes('www.redditmedia')?
                                        <div className ="w-full">
                                            <div className='flex p-3 justify-center text-gray-400'>
                                           <RiRedditFill/>
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Reddit Attachment</p> */}
                                            <div className="relative flex justify-center m-auto lg:p-0">
                                             <RdForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Reddit Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                         
                                        </>
                                    }
                                       {/* ======FACEBOOK======== */}
                                       { diary.file.length && diary.file.includes('facebook.com')?
                                        <div className ="w-full">
                                            <div className='flex p-3 justify-center text-gray-400'>
                                           <SiFacebook/>
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Facebook Attachment</p> */}
                                            <div className="relative flex justify-center m-auto  lg:p-0">
                                             <FbForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Facebook Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                          
                                        </>
                                    }
                                     {/* ======GOOGLE DRIVE======== */}
                                     { diary.file.length && diary.file.includes('drive.google.com')?
                                        <div >
                                            <div className='flex p-3 justify-center text-gray-400'>
                                           <FaGoogleDrive/>
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Google Drive Attachment</p> */}
                                            <div className="relative flex justify-center m-auto lg:p-0">
                                             <FbForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Google Drive File...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                         
                                        </>
                                    }
                                     {/* ======TWITCH======== */}
                                     { diary.file.length && diary.file.includes('player.twitch.tv')?
                                        <div >
                                            <div className='flex p-3 justify-center text-gray-400'>
                                           <BsTwitch/>
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Twitch Attachment</p> */}
                                            <div className="relative flex justify-center m-auto  lg:p-0">
                                             <TchForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Twitch Post...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                           
                                        </>
                                    }
                                     {/* ======WORDPRESS======== */}
                                     { diary.file.length && diary.file.includes('wordpress.com')?
                                        <div >
                                            <div className='flex p-3 justify-center text-gray-400'>
                                           <ImWordpress/>
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Wordpress Attachment</p> */}
                                            <div className="relative flex justify-center m-auto lg:p-0">
                                             <WpForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Wordpress Post...
                                                </div>
                                            </div> 
                                       </div> : 
                                       <>
                                       
                                        </>
                                    }
                                      { diary.file.length && diary.file.includes('https://')
                                      && !diary.file.includes('youtube.com/')
                                      && !diary.file.includes('zooruraweb.appspot.com')
                                      && !diary.file.includes('www.instagram.com')
                                      && !diary.file.includes('www.tiktok.com')
                                      && !diary.file.includes('twitter.com')
                                      && !diary.file.includes('www.soundcloud.com')
                                      && !diary.file.includes('redditmedia.com')
                                      && !diary.file.includes('www.facebook.com')
                                      && !diary.file.includes('drive.google.com')
                                      && !diary.file.includes('player.twitch.com')
                                      && !diary.file.includes('wordpress.com')
                                      && !diary.file.includes('pin.it')
                                      && !diary.file.includes('pinterest.com')
                                      && !diary.file.includes('vt.tiktok.com')
                                      && !diary.file.includes('vm.tiktok.com')
                        
                                      ?
                                        <div >
                                            <div className='flex p-3 justify-center text-gray-400'>
                                           <CgWebsite/>
                                           </div>
                                            {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Website Attachment</p> */}
                                            <div className="relative flex justify-center m-auto  lg:p-0">
                                             <WpForm Url= {diary.file}/>
                                                <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                    Attaching Webpage...
                                                </div>
                                            </div>
                                       </div> : 
                                       <>
                                        
                                        </>
                                    } 
                                </>}
        {/* ====================================IFRAMES END====================================== */}
        
            </div> }    
            
        </div>
        </div>


        {/*Bottom Icon invisible Parent*/}
        <div className="">
            {/* Post Bottom Icons*/}
         {diary.postType !== 'display' && <>
            <div className="w-full  justify-around transition delay-50 flex items-center border-b border-t border-gray-300 font-bold p-3">
          

{/* TIIIIPPPPZZZZZ=+===================== */}
                                    {/* are you sure */}
        { popSure &&  <div className="flex justify-center  fixed left-0 z-40 flex w-full  bg-transparent text-base font-light text-gray-700">
                    <div className= "fixed z-40 top-80 bg-gray-100 rounded-xl p-8 text-center">
                    
                            <p> Give <span className="font-bold">{tipData.amount}</span> Honours to this post? No reversal</p>
                            <div className="flex justify-around items-center pt-4 m-auto">

                               { tipLoading === true &&
                               
                                    <div className= "flex items-center bg-green-300 text-white p-2 rounded-md cursor-pointer">
                                        Verifying Tip
                                        <BeatLoader size={7} color='white' loading/>
                                    </div>

                                }

                                { tipLoading === false &&
                                    <>
                                        <div onClick = {tipDiary} className= "bg-green-400 text-white p-2 rounded-md cursor-pointer hover:bg-green-500">
                                            Yes
                                        </div>
                                    
                                        <div onClick = {()=> [setpopTip(false), setpopSure(false)]} className= "bg-gray-400 text-white p-2 rounded-md cursor-pointer hover:bg-gray-500">
                                            No
                                        </div> 
                                    </>
                                
                                }
                            </div>
                                    
                            
                    </div>
            
            <div className="fixed opacity-70 top-10 z-10 left-0 w-full h-full bg-gray-800"></div>
                </div> 
                }

    {/* TIPS WEREW HERE */}
    
        {/*========== ENDTIPZZZZZZZZ======================== */}
                    <div className='sm:flex'>

                        <div className="relative flex items-center border border-cyan-400 rounded-full p-1 m-1 cursor-pointer bg-white hover:bg-gray-200"
                            onClick={ () => {setpopTip(!popTip)}}>
                            
                            <GiTakeMyMoney  size ={29} className="text-gray-600"/> 
                            <p className="font-light text-xs m-1 text-gray-800">Promote</p>
                            
                        </div>   
                         {/* Tip Amount box */}
                         {diary.tippers && diary.tippers.length  >0 &&

                          
                                <div onClick={() => {setpopTip(!popTip)}} className="font-bold bg-transparent p-1 cursor-pointer  h-10 rounded-md text-xs items-center text-center text-gray-500">

                                    {user && diary.tippers.includes(user.result._id) && <p className= 'text-xs font-bold text-cyan-500 text-center'> +you</p>}
                                
                                
                                            <div  className= ' shadow-md m-auto flex justify-around bg-transparent rounded-md '>
                                            <p className= "text-xs text-center text-gray-500">{tips}</p>                                  
                                            </div>
                                
                                    
                                </div>
                        
                        }
                        
                    </div> 
                   
                {/* <OutsideClickHandler onOutsideClick={() => {setpopTip(false);}}> */}
                
                {/* </OutsideClickHandler> */}

                {/* Other Icon */}
                <div className ='sm:flex '>
                    
                    <div onClick={()=>setReviewDisplay(!reviewDisplay)} className="flex items-center border border-cyan-400 rounded bg-white p-2 m-1 rounded-full cursor-pointer hover:bg-gray-200">
                                    <AiOutlineComment  size ={22} className="text-gray-500"/>
                                    <p className="font-light  text-xs text-gray-800">Reviews:</p>
                    </div>
                    
                    {diary.reviewers && diary.reviewers.length > 0 && 
                    <div onClick={()=> setReviewDisplay(!reviewDisplay)} className="font-bold bg-transparent p-1  h-10 rounded-md text-xs items-center text-center cursor-pointer text-gray-500">
                        
                           {user && diary.reviewers.includes(user.result._id) && <p className='text-cyan-500'> +you</p>}
                           <div className= 'shadow-md m-auto flex justify-around bg-transparent rounded-md '>
                                <p>{diary.reviewers.length}</p>
                            </div>
                    
                    </div>
                    }
                </div>
                
                    <div className ='flex'>

                            <div onClick= {()=> setDisplayer(true)} className="flex items-center border border-cyan-400 rounded bg-white p-2 m-1 rounded-full cursor-pointer hover:bg-gray-200">
                                    <GoMegaphone size ={22} className="text-gray-500"/>
                                    <p className="font-light text-xs m-1 text-gray-800">Endorse</p>  
                            </div>

                            {diary.displays && diary.displays.length>0 && 
                                <div onClick={()=> setReviewDisplay(!reviewDisplay)} className="font-bold bg-transparent p-1  h-10 rounded-md text-xs items-center text-center cursor-pointer text-gray-500">
                                    
                                    {user && diary.displays.includes(user.result._id) && <p className='text-cyan-500'> +you</p>}
                                        <div className= 'shadow-md m-auto flex justify-around bg-transparent rounded-md '>
                                             <p>{diary.displays.length}</p>
                                        </div>
                                
                                </div>
                            }
                    </div> 
            </div>

            {/* Opinion Box */} 

            <div className="relative p-3 rounded-b-md  border-gray-300">

            

                 {/* ======== Like Comment Display Modals============== */}
                
                    { popTip && <>  

                     <div className='absolute top-0 bg-gray-200 w-16 my-1 text-center rounded-r-full '>
                        <p onClick= {()=> setpopTip(false)}className ='text-gray-500 text-xs '>hide</p>
                    </div>   
                    <div className='absolute top-0 right-4 md:right-28 xl:right-16 border border-gray-300 w-ful p-2 my-1 text-center rounded cursor-pointer'>
                        <p className ='text-gray-500 text-xs font-bold '>wallet balance:</p>
                        <p className ='text-cyan-600 text-sm font-bold '>{walletBalance.zbx} zbx</p>
                        {walletBalance.zbx < 1 && <p className='cursor-pointer text-red-600 font-light text-xs cursor-pointer'>add funds</p>}
                    </div>   


                    {popTip &&  <div className="relative bg-red-100">
                        <div className='flex w-96 bg-transparent left-2 absolute bottom-2.5 z-30 sm:p-1'>
                    <div className= "bg-transparent items-center justify-center">
                            {/* <div className="font-mono flex items-center space-x-3 w-full rounded-r-full rounded-tl-full opacity-80 m-1 p-1 bg-gradient-to-r from-cyan-300 to-teal-700 font-bold text-lg text-teal-300"> */}
                            <div className="flex items-center space-x-3 w-full rounded-r-full rounded-tl-full opacity-90 m-1 p-1 border border-gray-400 bg-gray-100 font-medium text-lg text-gray-300 shadow-md">
                            
                                <div onClick={()=> prepareTip(1, 'post')} className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                                    <div className= "items-center flex justify-center border-2 border-gray-700 group-hover:border-cyan-600 rounded-full h-9 w-9">
                                        1
                                    </div>
                                </div>
                                <div onClick={()=> prepareTip(5, 'post')}  className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                                    <div className= " items-center flex justify-center border-2 border-gray-700 group-hover:border-cyan-600 rounded-full h-9 w-9">
                                        5
                                    </div>
                                </div>
                                <div onClick={()=> prepareTip(10, 'post')}  className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                                    <div className= "items-center flex justify-center border-2 border-gray-700 group-hover:border-cyan-600 rounded-full h-9 w-9">
                                        10
                                    </div>
                                </div>
                                <div onClick={()=> prepareTip(25, 'post')} className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                                    <div className= "items-center flex justify-center border-2 border-gray-700 group-hover:border-teal-600 rounded-full h-9 w-9">
                                        25
                                    </div>
                                </div>
                                <div onClick={()=> prepareTip(50, 'post')} className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                                    <div className= "items-center flex justify-center border-2 border-gray-700 group-hover:border-teal-600 rounded-full h-9 w-9">
                                        50
                                    </div>
                                </div>
                        
                            </div>
                        </div>
                        </div>
                        </div> 
                        }





                                       
                        <PostFrameTips diaryId = {diary._id} userId= {user.result._id} /></>
                    }
          

                {/* Comment Box */}
                <div >
                    {reviewDisplay &&
                    <div className= 'fixed top-0 bg-gray-200 left-0 w-full z-50 h-screen overflow-scroll'>
                       
                       <div className='flex justify-center items-center fixed top-0 z-50 bg-gray-200 w-full'>

                            <div className='rounded  border border-cyan-400 bg-gray-100 w-20 hover:bg-gray-200 text-center cursor-pointer'>
                                <p onClick= {()=> setReviewDisplay(false)}className ='text-gray-500 text-xs '>Go back</p>
                                
                            </div> 
                            <div className= 'p-3'>
                                        <p className='font-normal'>Reviews of post: </p>
                                        <p className='font-bold'> {diary.title} </p>
                            </div> 

                        </div>

                        <div  className= 'pt-28 pb-80 bg-gray-100 h-screen overflow-scroll'>
                            <PostFrameReviews diary ={diary} diaryId={diary._id} diaryCreator={diary.creator} userId={user.result._id} setpopTip={setpopTip}/>
                        </div>
                   
                

                    <div className="fixed p-4 bottom-0 w-full items-center">
                            
                         
                             
                          <div className='flex items-center space-x-2'>

                                <textarea value= {reviewData.body}
                                onChange={(e)=> {
                                    
                                    setreviewData({reviewedId:diary.creator, reviewedPostId:diary._id, body:e.target.value, replied:null, repliedPostId:null, reply:false});
                                

                                }}
                                type="text" placeholder="Write Review Here..." className="h-20 w-full text-gray-700 font-light outline-none bg-gray-100 text-sm  border border-gray-300 rounded-md py-3 pl-3 pr-8"/>
                                <div  className=''>
                                    { reviewData.body.length > 0 && reviewData.body.length < 2000 &&
                                    <>
                                        {!reviewLoading && <MdSend size={24} onClick= {reviewDiary}/> }
                                        {reviewLoading && 
                                        <>
                                        {/* <p className= 'text-xs font-extralight'>sending review</p> */}
                                        <BeatLoader size={7} color='black' loading/>
                                        </> }
                                    </>
                                    } 
                                </div>
                                
                                <div className=''>
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
                     </div>
                    }
                </div>
        </div></>}
        {diary.postType === 'display' &&
            <div className="w-full  justify-around transition delay-50 flex items-center  bg-gray-100 rounded-b-lg border-t border-gray-300 font-bold p-3">
              <Link to={'/DiaryLink/'+diary._id}>
                <div className="relative flex items-center rounded-full p-1 m-1 cursor-pointer bg-white hover:bg-gray-200"
                                onClick={ () => {setpopTip(!popTip)}}>
                                
                                <AiOutlineFolderView  size ={24} className="text-gray-600"/> 
                                <p className="font-light text-xs m-1 text-gray-800">See Original</p>
                                
                </div> 
            </Link> 
            </div>
        }

        </div>
    </div>





    

                     

{displayer &&

       <div className= "fixed top-0 py-20 z-40 bg-gray-900 opacity-90 w-full h-screen overflow-scroll"> 
     
                       
        <div className="p-2 sm:px-12 py-4 rounded-xl bg-transparent xl:w-1/2 mx-auto my-1"> 

                                <div className="w-full bg-transparent flex justify-center">
                                {loadingDisplay ===false && 
                                    <>
                                    <div onClick= {handleDisplay} className= 'flex bg-cyan-500 hover:bg-teal-600 cursor-pointer rounded-full p-2 space-x-2 w-2/5  text-gray-100  justify-center items-center m-4'>      
                                        <GoMegaphone size ={20} className="text-gray-100"/>
                                        <p className= 'text-lg'>Endorse</p>                                
                                    </div>
                                    
                                    <div onClick= {()=> setDisplayer(false)}className= 'flex bg-red-500 hover:bg-red-600 cursor-pointer rounded-full p-2 space-x-2 w-2/5  text-gray-100  justify-center items-center m-4'>      
                                        <MdOutlineCancel size ={22} className="text-gray-100"/>
                                        <p className= 'text-lg'>Cancel</p>                                
                                    </div>
                                    </>
                                }

                                {loadingDisplay ===true && 
                                <div className= 'flex bg-cyan-500 hover:bg-teal-600 cursor-pointer rounded-full p-2 space-x-2 w-2/5  text-gray-100  justify-center items-center m-4'>      
                                    <p className= 'text-lg'>Endorsing</p> 
                                    <BeatLoader size={7} color='white' loading/>                                       
                                </div>}

                                </div>   

                {/* Post-Top-Cyan Invisible Parent*/}
                <div className="flex  justify-end">
                    
                    
                    {/* Top-Cyan */}
                    <div className="bg-gray-100 rounded-t-xl w-full transition delay-50 py-0.5 flex items-center font-bold justify-between">
                           
                             
                           
                            {/*Top-Mid*/}
                            <div className="flex items-center justify-between">
                                {/* Top-Mid Img*/}
                                {diary.miniProfile &&
                                <>
                                <div className="ml-3 bg-white rounded-full"> 
                                    <img src={diary.miniProfile[0].dpUrl} alt="DP" className=" rounded-full object-cover h-10 w-10 m-0.5"/>
                                </div> 
                            
                                <div className="sm:ml-2 items-center ml-0.5 py-3"> 
                                    <p className="leading-3 text-sm font-medium my-1 ">@{diary.miniProfile[0].userName}</p>
                                    <p className="p-0.5 leading-3 text-xs font-extralight my-1"><b></b>{moment (diary.time).fromNow()}</p>
                                
                                </div>
                                
                                </>
                                }
                                {!diary.miniProfile &&
                                <>
                                <div className="ml-3 bg-white rounded-full">
                                    <img src={diary.diaryMiniProfile.dpUrl} alt="DP" className=" rounded-full object-cover h-10 w-10 m-0.5"/>
                                </div> 
                            
                                <div className="sm:ml-2 items-center ml-0.5 py-3"> 
                                    <p className="leading-3 text-sm font-medium my-1 ">@{diary.diaryMiniProfile.userName}</p>
                                    <p className="p-0.5 leading-3 text-xs font-extralight my-1"><b></b>{moment (diary.time).fromNow()}</p>
                                
                                </div>

                              
                                </>
                                }
                            </div>
                        {/* Top-Menu */}
                        <div className=" items-center ">
                              
                                <div className=" m-auto bg-gray-200 p-0.5 w-10/12 sm:px-3 rounded-md">
                                {/* <div className="flex justify-start bg-white w-1/3 rounded-full">
                                    <img src={user.result.dpUrl} alt="DP" className=" rounded-full object-cover h-6 w-6 m-0.5"/>
                                    <div className= 'flex justify-center bg-transparent p-1 rounded-full items-center'>
                                        <GoMegaphone size ={15} className="text-gray-400"/>    
                                    </div> 

                                </div>  */}
                                
                                    <div className=" items-center"> 
                                        <div className='flex items-center justify-center space-x-2'>
                                            <GoMegaphone size ={20} className="text-yellow-500"/> 
                                            <p className="leading-3 text-xs text-gray-700 font-medium my-1 ">@{user.result.userName}</p>
                                        </div>
                                    
                                    
                                    </div>
                                
                                </div>
                                    
                                <p className="p-0.5 leading-3 text-xs font-extralight my-1"><b></b>Endorsed: {moment (Date.now()).fromNow()}</p>

                        </div>
                     
                        <div className="h-10 w-10 m-1 
                        rounded-full flex justify-around
                        items-center bg-transparent">
                             
                                    <DotsCircleHorizontalIcon className=" h-8 w-8
                                    items-center cursor-pointer
                                    hover:text-gray-600 text-gray-300"/>
                        </div>
                                
                         
                    
                    </div> 

                </div>


            {/* Post Mid Invisible Parent */}
            <div className="bg-gray-100 rounded-b-xl break-words">

            {/* Post Caption Invisible Parent */}
            <div className="relative flex justify-center bg-gray-100  my-0.5">
                {/* Post Mid Frame*/}
                <div className="w-full items-center text-sm p-4 rounded-t-xl break-words"> 
                        <p className="leading-5  font-semibold my-1 text-gray-700">{diary.title}</p>
                        <p className="leading-5  font-light text-gray-700">{diary.caption}</p>                 
                </div>  

            </div>

            <div className="flex p-1 justify-center bg-gray-600 rounded-b-xl ">
                {/* Post Mid Frame*/}
                <div className="max-h-screen w-full transition delay-50 flex justify-center p-1 rounded-md shadow-md items-center cursor-pointer bg-gray-200 font-bold hover:bg-gray-300">
                                
                
                {/*=============================IFRAMES========================================*/}
                                        
                                    {/* ======YOUTUBE======== */}
                                    { diary.file.length && diary.file.includes('youtube.com/')?
                                            <div className ="w-full">
                                                <div className=' w-full flex justify-center text-gray-400'>
                                            <ImYoutube2 size={40}/>
                                            </div>
                                        {/* <p className= 'text-center  text-gray-400 p-1 text-xs' >Youtube Attachment</p> */}
                                                <div className="flex justify-center m-auto w-full  lg:p-0">
                                                    <YtForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Youtube Post...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* ======INSTAGRAM======== */}
                                        { diary.file.length && diary.file.includes('www.instagram.com')?
                                            <div className ="w-full">
                                                <div className='p-3 flex justify-center text-gray-400'>
                                                    <BsInstagram/>
                                                    
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Instagram Attachment</p> */}
                                                <div className="relative flex justify-center m-auto w-full lg:p-0">
                                                    <IgForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Instagram Post...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* ======TIKTOK======== */}
                                        { diary.file.length && diary.file.includes('www.tiktok.com')?
                                            <div >
                                                <div className='p-3 flex justify-center text-gray-400'>
                                                    <SiTiktok/>
                                                </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Tiktok Attachment</p> */}
                                                <div className="relative flex justify-center m-auto lg:p-0">
                                                    <TkForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Tiktok Post...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* tiktok app */}
                                        { diary.file.length && diary.file.includes('vm.tiktok.com') || diary.file.includes('vt.tiktok.com') ?
                                                <div >
                                                <div className='relative flex justify-center text-gray-400'>
                                                    <SiTiktok/>
                                                </div>
                                            
                                                <p className= 'text-center text-red-400 p-1 text-xs' >Apologies. Tiktok Id not found. fetch Tiktok Link from <b>WEB-BROWSER</b> and <b>NOT APP</b></p>
                                                </div>
                                        : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* ======Twitter======== */}
                                        { diary.file.length && diary.file.includes('twitter.com')?
                                            <div className ="w-full" >
                                                <div className='p-3 flex justify-center text-gray-400'>
                                            <SiTwitter/>
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Twitter Attachment</p> */}
                                                <div className="relative flex justify-center m-auto lg:p-0">
                                                <TwForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Tweet...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* ======SOUNDCLOUD======== */}
                                        { diary.file.length && diary.file.includes('soundcloud.com')?
                                            <div >
                                                <div className='flex p-3 justify-center text-gray-400'>
                                            <RiSoundcloudLine/>
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Soundcloud Attachment</p> */}
                                                <div className="relative flex justify-center m-auto p-2 lg:p-0">
                                                <SnForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Soundcloud Post...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* ======PINTEREST======== */}
                                        { diary.file.length && diary.file.includes('pinterest.com')?
                                            <div >
                                                <div className='flex p-3 justify-center text-gray-400'>
                                            <RiPinterestLine/>
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Pinterest Attachment</p> */}
                                                <div className="relative flex justify-center m-auto lg:p-0">
                                                <PnForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Pin...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                                
                                            </>
                                        } 
                                        
                                                {/* pin app */}
                                                { diary.file.length && diary.file.includes('pin.it')?
                                                        <div >
                                                        <div className='relative p-3  flex justify-center text-gray-400'>
                                                            <RiPinterestLine/>
                                                        </div>
                                                    
                                                        <p className= 'text-center text-red-400 p-1 text-xs' >Apologies! Pin Id not found. Kindly fetch Pinterest Link from Web-Browser ADDRESS BAR</p>
                                                        </div>
                                                : 
                                                <>
                                                    
                                                    </>
                                                }
                                                
                                        {/* ======REDDIT======== */}
                                        { diary.file.length && diary.file.includes('www.redditmedia')?
                                            <div className ="w-full">
                                                <div className='flex p-3 justify-center text-gray-400'>
                                            <RiRedditFill/>
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Reddit Attachment</p> */}
                                                <div className="relative flex justify-center m-auto lg:p-0">
                                                <RdForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Reddit Post...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* ======FACEBOOK======== */}
                                        { diary.file.length && diary.file.includes('facebook.com')?
                                            <div className ="w-full">
                                                <div className='flex p-3 justify-center text-gray-400'>
                                            <SiFacebook/>
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Facebook Attachment</p> */}
                                                <div className="relative flex justify-center m-auto  lg:p-0">
                                                <FbForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Facebook Post...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* ======GOOGLE DRIVE======== */}
                                        { diary.file.length && diary.file.includes('drive.google.com')?
                                            <div >
                                                <div className='flex p-3 justify-center text-gray-400'>
                                            <FaGoogleDrive/>
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Google Drive Attachment</p> */}
                                                <div className="relative flex justify-center m-auto lg:p-0">
                                                <FbForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Google Drive File...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* ======TWITCH======== */}
                                        { diary.file.length && diary.file.includes('player.twitch.tv')?
                                            <div >
                                                <div className='flex p-3 justify-center text-gray-400'>
                                            <BsTwitch/>
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Twitch Attachment</p> */}
                                                <div className="relative flex justify-center m-auto  lg:p-0">
                                                <TchForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Twitch Post...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
                                        {/* ======WORDPRESS======== */}
                                        { diary.file.length && diary.file.includes('wordpress.com')?
                                            <div >
                                                <div className='flex p-3 justify-center text-gray-400'>
                                            <ImWordpress/>
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Wordpress Attachment</p> */}
                                                <div className="relative flex justify-center m-auto lg:p-0">
                                                <WpForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Wordpress Post...
                                                    </div>
                                                </div>
                                        </div> : 
                                        <>
                                        
                                            </> 
                                        }
                                        { diary.file.length && diary.file.includes('https://')
                                        && !diary.file.includes('/youtube.com')
                                        && !diary.file.includes('zooruraweb.appspot.com')
                                        && !diary.file.includes('www.instagram.com')
                                        && !diary.file.includes('www.tiktok.com')
                                        && !diary.file.includes('twitter.com')
                                        && !diary.file.includes('www.soundcloud.com')
                                        && !diary.file.includes('redditmedia.com')
                                        && !diary.file.includes('www.facebook.com')
                                        && !diary.file.includes('drive.google.com')
                                        && !diary.file.includes('player.twitch.com')
                                        && !diary.file.includes('wordpress.com')
                                        && !diary.file.includes('pin.it')
                                        && !diary.file.includes('pinterest.com')
                                        && !diary.file.includes('vt.tiktok.com')
                                        && !diary.file.includes('vm.tiktok.com')
                            
                                        ?
                                            <div >
                                                <div className='flex p-3 justify-center text-gray-400'>
                                            <CgWebsite/>
                                            </div>
                                                {/* <p className= 'text-center text-gray-400 p-1 text-xs' >Website Attachment</p> */}
                                                <div className="relative flex justify-center m-auto  lg:p-0">
                                                <WpForm Url= {diary.file}/>
                                                    <div className="absolute text-sm text-gray-400 z-0 mt-20">
                                                        Attaching Webpage...
                                                    </div>
                                                </div> 
                                        </div> : 
                                        <>
                                            
                                            </>
                                        }
            {/* ====================================IFRAMES END====================================== */}
                </div>     
            </div>
            </div> 
            
            </div> 
        
        </div>
    }


</>
    )
}

export default PostFrame;

