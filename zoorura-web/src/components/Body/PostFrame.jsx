import { DotsCircleHorizontalIcon} from "@heroicons/react/outline";



import{BsFacebook, BsInstagram, BsTwitch} from "react-icons/bs";
import{RiSoundcloudLine, RiPinterestLine, RiRedditFill} from "react-icons/ri";
import{ImInstagram, ImReddit, ImWordpress, ImYoutube2} from "react-icons/im";
import{SiFacebook, SiTiktok, SiTwitter} from "react-icons/si";
import { FaGoogleDrive } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
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

import moment from 'moment';
function PostFrame({diary, diaryId, setDiaryId}) {

    const[popTip, setpopTip] = useState(false);
    const[popOptions, setpopOptions] = useState(false);

    return (

        // Post-Box
        <div className="p-2 sm:px-12 py-4 rounded-xl bg-transparent relative xl:w-1/2 mx-auto my-1"> 

            {/* Post-Top-Cyan Invisible Parent*/}
            <div className="flex  justify-end">
                {/* Top-Cyan */}
                <div className="bg-gray-100 rounded-t-xl w-full transition delay-50 py-0.5 flex items-center font-bold justify-between">
                        {/*Top-Mid*/}
                        <div className="flex items-center justify-between">
                            {/* Top-Mid Img*/}
                            <div className="ml-3 bg-white rounded-full">
                                <img src="./assets/images/milome.jpeg" alt="DP" className=" rounded-full object-cover h-10 w-10 m-0.5"/>
                            </div> 
                            {/*Top-Mid-Words */}
                            <div className="sm:ml-2 items-center ml-0.5 py-3"> 
                                <p className="leading-3 text-sm font-medium my-1 ">@FelixMilome #3</p>
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
        <div className="bg-gray-100 rounded-b-xl">

        {/* Post Caption Invisible Parent */}
        <div className="flex justify-center bg-gray-100  my-0.5">
            {/* Post Mid Frame*/}
            <div className="w-full lg:w-2/3 text-center items-center p-2 rounded-t-xl"> 
                                <p className="leading-5 text-base font-bold my-1 text-gray-400">{diary.title}</p>
                                <p className="leading-5 text-sm font-base text-gray-700">{diary.caption}</p>                 
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
                                            <div className="flex justify-center m-auto w-full p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto w-full p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
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
                                            <div className="relative flex justify-center m-auto p-2 lg:p-0">
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
            {popTip && <TipModal />}
                    
                    <div className="relative flex items-center rounded-full p-1 cursor-pointer bg-gradient-to-r hover:bg-cyan-100 hover:from-blue-100 hover:to-green-100"
                        onClick={ () => {setpopTip(!popTip)}}>
                           
                        <GiTakeMyMoney  size ={29} className="text-gray-600"/>
                        <p className="font-light text-xs m-1 text-gray-800">{diary.tips} Honours</p>
                        
                    </div>   
                    </OutsideClickHandler>
                {/* <OutsideClickHandler onOutsideClick={() => {setpopTip(false);}}> */}
                
                {/* </OutsideClickHandler> */}

                {/* Other Icon */}
                <div className="flex items-center rounded-full p-1 cursor-pointer hover:bg-blue-100">
                                <AiOutlineComment  size ={22} className="text-gray-500"/>
                    <p className="font-light text-xs m-1 text-gray-800">{diary.reviews} Reviews</p>
                </div>
                <div className="flex items-center p-1 rounded-full cursor-pointer hover:bg-green-100">
                                 <RiShareForwardBoxLine size ={22} className="text-gray-500"/>
                    <p className="font-light text-xs m-1 text-gray-800">{diary.displays} Displays</p>
                </div>
            </div> 

            {/* Opinion Box */}

            <div className="p-3 bg-transparent border-b-2 border-gray-300">
                            {/* Comment Box */}
                            <div className="w-full items-center">
                                <textarea type="text" placeholder="Write Review Here..." className="max-h-screen w-full text-gray-700 font-medium outline-none bg-gray-100 text-sm rounded-md p-3"/>
                            </div>
                            <ReviewBubble Src= "./assets/images/beyonce.jpeg" Name="@Beyonce" Review="Wow Milome"/>
                            <ReviewBubble Src= "./assets/images/jayz.jpeg" Name="@Hover" Review="Wow Milome I am jealous. He knows how to invest and can give you anything you ask for or want He is a good friend of mine. hhddfjkbdfhjbdfhkbdfhjbdfjhbdjfhbdfjhbkbdjhbjhbhjbjhbjhbjhbbfsjhkb jknbjbnj jnkbnkj huihiuhuihi uhiuhiuhiuh h
                            hahahahahahah"/>
                </div>

        </div>
    </div>
    )
}

export default PostFrame;

