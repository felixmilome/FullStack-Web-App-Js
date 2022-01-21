import { DotsCircleHorizontalIcon} from "@heroicons/react/outline";



import{BsFacebook, BsInstagram, BsTwitch} from "react-icons/bs";
import{RiSoundcloudLine, RiPinterestLine, RiRedditFill} from "react-icons/ri";
import{ImInstagram, ImReddit, ImWordpress, ImYoutube2} from "react-icons/im";
import{SiFacebook, SiTiktok, SiTwitter} from "react-icons/si";
import { MdSend} from "react-icons/md";
import { FaGoogleDrive } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { BiCommentEdit } from "react-icons/bi";

import {BeatLoader} from "react-spinners";

import {FbForm, IgForm, PnForm, RdForm, SnForm, TchForm, TkForm, TwForm, WpForm, YtForm} from "./PostForms/Previews.jsx";


import{GiMoneyStack, GiTakeMyMoney} from "react-icons/gi";
import { RiShareForwardBoxLine  } from "react-icons/ri";
import { AiOutlineComment  } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import{} from "@fortawesome/free-regular-svg-icons";
//import{faComments, faMoneyBillWave, faMoneyBillWaveAlt, faShareSquare,} from "@fortawesome/free-solid-svg-icons";

import TipModal from '../Modals/TipModal.jsx'
import { useState } from 'react';
import PostoptionsModal from "../Modals/PostoptionsModal.jsx";
import OutsideClickHandler from 'react-outside-click-handler';
import ReviewBubble from "./ReviewBubble.jsx";
import { tipDiariesAction, reviewDiariesAction } from "../Midwares/rdx/actions/diariesAction.js";

import moment from 'moment';
import {useDispatch} from 'react-redux'; 
import {useSelector} from 'react-redux';




function Portfolio({diary, diaryId, setDiaryId}) {
    const diaries = useSelector((state) => state.diariesReducer);
    const user = JSON.parse(localStorage.getItem('profile'));
   const dispatch = useDispatch();
    const[popTip, setpopTip] = useState(false);
    //const[tipperData, settipperData] = useState({tipper: '', tipperId: '', amount: null, tipperObj: {tipper: '', tipperId:'', amount: null}});
    const[tipperData, settipperData] = useState({tipper: '', tipperId: '', amount: null});
    //const[reviewData, setreviewData] = useState({reviewer: user.result.userName, reviewerId:user.result._id, body: ''});
    const[reviewData, setreviewData] = useState({reviewer:'', reviewerId:'', body: ''});
    const[popSure, setpopSure] = useState(false);
    const[tip, setTip] = useState({tips:null});
    const[popOptions, setpopOptions] = useState(false);
    const[tipperView, seTipperview] = useState(false);

    const reviewDiary = () =>{
        const id = diary._id;
        console.log(id);
        console.log(reviewData);
        try{
            dispatch(reviewDiariesAction(id, reviewData, setreviewData));
        }
        catch(error){
            console.log(error);
        }
        
    }

    const tipDiary = () =>{
       // const tipper = user.result.name;
        const id = diary._id;
        const userName = user.result.userName;
        const userId = user.result._id;
        
       
        console.log(userName);
        console.log(userId)
       // console.log(tipper);
       // console.log(amount);
        console.log(tipperData);
    
        try{
            dispatch(tipDiariesAction(id, tipperData, setpopSure, setpopTip));
            //setpopSure(false);
            //setpopTip(false);
        }
        catch(error){
            console.log(error);
        }
    }
  

    return (

        // Post-Box
        <div className="z-30 p-2 sm:px-12 py-4 rounded-xl bg-transparent relative xl:w-1/2 mx-auto my-1"> 

            {/* Post-Top-Cyan Invisible Parent*/}
            <div className="flex  justify-end">
                {/* Top-Cyan */}
                <div className="bg-gray-100 rounded-t-xl w-full transition delay-50 py-0.5 flex items-center font-bold justify-between">
                        {/*Top-Mid*/}
                        <div className="flex items-center justify-between">
                            {/* Top-Mid Img*/}
                            <div className="ml-3 bg-white rounded-full">
                                <img src={diary.diaryMiniProfile.dpUrl} alt="DP" className=" rounded-full object-cover h-10 w-10 m-0.5"/>
                            </div> 
                            {/*Top-Mid-Words */}
                            <div className="sm:ml-2 items-center ml-0.5 py-3"> 
                                <p className="leading-3 text-sm font-medium my-1 ">@{diary.diaryMiniProfile.userName} #3</p>
                                <p className="p-0.5 leading-3 text-xs font-extralight my-1"><b></b>{moment (diary.time).fromNow()}</p>
                            
                            </div>
                        </div>
                    {/* Top-Menu */}
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
                            {popOptions && <PostoptionsModal setpopOptions={setpopOptions} diary= {diary} diaryId={diaryId}  setDiaryId = {setDiaryId}/>}
                            
                        </OutsideClickHandler>   
                
                </div> 

            </div>


        {/* Post Mid Invisible Parent */}
        <div className="bg-gray-100 rounded-b-xl break-words">

        {/* Post Caption Invisible Parent */}
        <div className="relative flex justify-center bg-gray-100  my-0.5">
            {/* Post Mid Frame*/}
            <div className="w-full items-center p-4 rounded-t-xl break-words"> 
                    <p className="leading-5 text-base font-semibold my-1 text-gray-700">{diary.title}</p>
                    <p className="leading-5 text-base font-light text-gray-700">{diary.caption}</p>                 
            </div>  

        </div>

        <div className="flex p-1 justify-center bg-gray-100 rounded-b-xl ">
            {/* Post Mid Frame*/}
            <div className="max-h-screen w-full transition delay-50 flex justify-center p-1 rounded-md shadow-md items-center cursor-pointer bg-gray-200 font-bold hover:bg-gray-300">
                            
            
            {/*=============================IFRAMES========================================*/}
                                    
                                {/* ======YOUTUBE======== */}
                                { diary.file.length && diary.file.includes('www.youtube.com')?
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
                                      && !diary.file.includes('www.youtube.com')
                                      && !diary.file.includes('www.instagram.com')
                                      && !diary.file.includes('www.tiktok.com')
                                      && !diary.file.includes('twitter.com')
                                      && !diary.file.includes('www.soundcloud.com')
                                      && !diary.file.includes('redditmedia.com')
                                      && !diary.file.includes('www.facebook.com')
                                      && !diary.file.includes('drive.google.com')
                                      && !diary.file.includes('player.twitch.com')
                                      && !diary.file.includes('www.wordpress.com')
                                      && !diary.file.includes('pin.it')
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


        {/*Bottom Icon invisible Parent*/}
        <div className="">
            {/* Post Bottom Icons*/}
            <div className="w-full  justify-around transition delay-50 flex items-center  bg-transparent border-b-2 border-gray-300 font-bold p-3">
            <OutsideClickHandler onOutsideClick={() => {setpopTip(false);}}>
            {/* {popTip && <TipModal />} */}

{/* TIIIIPPPPZZZZZ=+===================== */}
                                    {/* are you sure */}
        { popSure &&  <div className="flex justify-center  fixed left-0 z-40 flex w-full  bg-transparent text-base font-light text-gray-700">
                    <div className= "fixed z-40 top-80 bg-gray-100 rounded-xl p-8 text-center">
                    
                            <p> Give <span className="font-bold">{tipperData.amount}</span> Honours to this post? No reversal</p>
                            <div className="flex justify-around items-center pt-4 m-auto">
                                
                                <div onClick = {tipDiary} className= "bg-red-400 text-white p-2 rounded-md cursor-pointer hover:bg-red-500">
                                    Yes
                                </div>
                            
                                <div onClick = {()=> [setpopTip(false), setpopSure(false)]} className= "bg-gray-400 text-white p-2 rounded-md cursor-pointer hover:bg-gray-500">
                                    No
                                </div>
                            </div>
                                    
                            
                        </div>
                        <div className="fixed opacity-70 top-10 z-10 left-0 w-full h-full bg-gray-800"></div>
                </div> 
                }

    {popTip &&  <div className="relative bg-red-100">
        <div className='flex w-96 bg-transparent left-2 absolute -bottom-2.5 z-30 sm:p-1'>
       <div className= "bg-transparent items-center justify-center">
            {/* <div className="font-mono flex items-center space-x-3 w-full rounded-r-full rounded-tl-full opacity-80 m-1 p-1 bg-gradient-to-r from-cyan-300 to-teal-700 font-bold text-lg text-teal-300"> */}
            <div className="flex items-center space-x-3 w-full rounded-r-full rounded-tl-full opacity-90 m-1 p-1 border border-gray-400 bg-gray-100 font-medium text-lg text-gray-300 shadow-md">
               
                <div onClick={()=> [settipperData ({tipper:user.result.userName, tipperId: user.result._id, amount: 1}), setpopSure(true)]} className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= "items-center flex justify-center border-2 border-gray-700 group-hover:border-cyan-600 rounded-full h-9 w-9">
                        1
                    </div>
                </div>
                <div onClick={()=> [settipperData ({tipper:user.result.userName, tipperId: user.result._id, amount: 5}), setpopSure(true)]} className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= " items-center flex justify-center border-2 border-gray-700 group-hover:border-cyan-600 rounded-full h-9 w-9">
                        5
                    </div>
                </div>
                <div onClick={()=> [settipperData ({tipper:user.result.userName, tipperId: user.result._id, amount: 10}), setpopSure(true)]} className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= "items-center flex justify-center border-2 border-gray-700 group-hover:border-cyan-600 rounded-full h-9 w-9">
                        10
                    </div>
                </div>
                <div onClick={()=> [settipperData ({tipper:user.result.userName, tipperId: user.result._id, amount: 25}), setpopSure(true)]} className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= "items-center flex justify-center border-2 border-gray-700 group-hover:border-teal-600 rounded-full h-9 w-9">
                        25
                    </div>
                </div>
                <div onClick={()=> [settipperData ({tipper:user.result.userName, tipperId: user.result._id, amount: 50}), setpopSure(true)]} className="cursor-pointer rounded-full bg-gray-700 hover:bg-gray-800 hover:text-white p-1 group">
                    <div className= "items-center flex justify-center border-2 border-gray-700 group-hover:border-teal-600 rounded-full h-9 w-9">
                        50
                    </div>
                </div>
        
            </div>
        </div>
        </div>
        </div> 
        }
        {/*========== ENDTIPZZZZZZZZ======================== */}
                    <div className=''>

                        <div className="relative flex items-center rounded-full p-1 cursor-pointer bg-gradient-to-r hover:bg-cyan-100 hover:from-blue-100 hover:to-green-100"
                            onClick={ () => {setpopTip(!popTip)}}>
                            
                            <GiTakeMyMoney  size ={29} className="text-gray-600"/>
                            <p className="font-light text-xs m-1 text-gray-800">Honours:</p>
                            
                        </div>  
                         {/* Tip Amount box */}
                       { diary.tips > 0  && <div  className= "flex p-0.5">
                            <div onClick={() => {seTipperview(true)}} className= 'bg-gray-200 shadow-md m-auto flex justify-around p-1 bg-transparent border rounded-md border-gray-300 cursor-pointer hover:bg-gray-100'>
                            <p className= "text-xs text-center text-cyan-500">{diary.tips}</p>
                            </div>
                        </div>}
                    </div> 
                    </OutsideClickHandler>
                {/* <OutsideClickHandler onOutsideClick={() => {setpopTip(false);}}> */}
                
                {/* </OutsideClickHandler> */}

                {/* Other Icon */}
                <div className="flex items-center rounded-full p-1 cursor-pointer hover:bg-blue-100">
                                <AiOutlineComment  size ={22} className="text-gray-500"/>
                    <p className="font-light text-xs m-1 text-gray-800">Reviews: {diary.reviews.length}</p>
                </div>
                <div className="flex items-center p-1 rounded-full cursor-pointer hover:bg-green-100">
                                 <RiShareForwardBoxLine size ={22} className="text-gray-500"/>
                    <p className="font-light text-xs m-1 text-gray-800">Displays: {diary.displays}</p>
                </div>
            </div> 

            {/* Opinion Box */}

            <div className="relative p-3 bg-transparent border-b-2 border-gray-300">

                 {/* ======== Like Comment Display Modals============== */}
                 <OutsideClickHandler onOutsideClick={() => {seTipperview(false);}}>
                    { tipperView && <div className='flex text-xs text-gray-600  z-30 top-1 left-0 max-h-1/2 max-w-1/2 absolute overflow-scroll'>
                                    <div className=" border border-gray-300 p-2 mx-auto bg-gray-200 rounded"> 
                                    {
                                        diary.tippers.map((tip) =>(
                                            <div className= "p-0.5"> 
                                                <p>@{tip.tipper} : <b> {tip.amount}</b></p>
                                            </div>
                                            ))
                                        }                    
                                        </div>

                        </div>}
            </ OutsideClickHandler>
                         {/* Comment Box */}
                           
                            
                            
                              <div className='bg-gray-200 border border-gray-300 rounded-md max-h-64 overflow-y-auto'>
                            {diary.reviews.length > 0  && diary.reviews.map((reviewmap) =>(
                               
                                    <div key={reviewmap._id} className="p-0.5 flex w-full justify-start items-center text-xs font-bold text-gray-600 rounded-md lg:max-w-none">
                                        
                                        {/* EMoji & Pic */}
                                            <div className="space-y-3 items-center inline-block p-1">
                                                {/* <img src={Src} alt="DP" className="rounded-full object-cover h-8 w-8"/> */}
                                                
                                            </div>
                                            {/* Name and Comment*/}
                                            <div className="flex items-center m-1 bg-transparent w-5/6">  
                                            <div className="bg-gray-100 border  border-gray-300 p-3 rounded-2xl max-w-3/4">
                                                    <div className= 'bg-transpparent rounded-md'>
                                                    <p className='text-xs font-light'> @{reviewmap.reviewer}:</p>
                                                     {/* <p className='font-light'>{moment (reviewmap.time).fromNow()}</p></p> */}
                                                     </div>
                                                    
                                                <div className= "font-normal text-xs break-words">{reviewmap.body}</div>
                                                </div>
                                                <div className="bg-transparent rounded-full flex justify-center cursor-pointer h-7 w-7 items-center hover:bg-white group m-3">
                                                    <GiTakeMyMoney onclick  size ={24} className="text-gray-400"/>
                                                </div>
                                                  <div className="bg-transparent rounded-full flex justify-center cursor-pointer h-7 w-7 items-center hover:bg-white group m-3">
                                                    <BiCommentEdit  size ={20} className="text-gray-400"/>
                                                </div>
                                            </div>
                                                
                                    </div>
                                
                                    // Src= "./assets/images/beyonce.jpeg" 
                            //<ReviewBubble Name = {review.reviewer} Review={review.body}/>
                            // <ReviewBubble Name="@Hover" Review="Wow Milome I am jealous. He knows how to invest and can give you anything you ask for or want He is a good friend of mine. hhddfjkbdfhjbdfhkbdfhjbdfjhbdjfhbdfjhbkbdjhbjhbhjbjhbjhbjhbbfsjhkb jknbjbnj jnkbnkj huihiuhuihi uhiuhiuhiuh h
                            // hahahahahahah"/>
                            ))
                            
                        } 
                        </div>

                        <div className="relative w-full items-center">
                                <div className='absolute bottom-2 right-2'>
                                  { reviewData.body.length > 0 &&  <MdSend onClick= {reviewDiary}/> }
                                </div>
                                <textarea value= {reviewData.body}
                                onChange={(e)=> setreviewData({reviewer: user.result.userName, reviewerId:user.result._id, body: e.target.value})}
                                type="text" placeholder="Write Review Here..." className="max-h-screen w-full text-gray-700 font-medium outline-none bg-gray-100 text-sm rounded-md py-3 pl-3 pr-8"/>
                            </div>
        </div>

        </div>
    </div>
    )
}

export default Portfolio;

