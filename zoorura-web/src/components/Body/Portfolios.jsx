
import PostBox from "./PostBox";
import {BeatLoader} from "react-spinners";
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';

import {RiUserAddLine} from "react-icons/ri";
import {HiOutlineChatAlt2} from "react-icons/hi"

//import IGbox from './IGbox.jsx'
import Portfolio from "./Portfolio";
import { DpCropper } from "./DpCropper.jsx";
//import { Test } from "./test";
import {useParams} from "react-router-dom";
import {getMiniProfileAction} from "../Midwares/rdx/actions/profileAction.js"
import { useEffect } from 'react';


function Portfolios(diaryId, setDiaryId) { 

        const {profileName} = useParams();
        console.log(profileName);

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(getMiniProfileAction(profileName));
        }, [dispatch]);
    
        const miniProfile = useSelector((state) => state.getMiniProfileReducer);

        console.log(miniProfile.dpUrl);

    const user = JSON.parse(localStorage.getItem('profile'));
    const[dpCropper, setdpCropper] = useState(false);
    const userName = user.result.userName;
    const diaries = useSelector((state) => state.diariesReducer);





//console.log(diaries);

    return (
        
    
       <div>
                <div >
                    {/* portbox */}
                    { dpCropper &&
                    <DpCropper dpCropper={dpCropper} setdpCropper ={setdpCropper}/>
                    }
                    
                        <div className='w-full opacity-90  m-auto z-30  bg-transparent'>
                            <div className= 'flex m-auto bg-transparent'>
                            <div className="bg-gray-100 w-full lg:w-2/5 rounded-lg  text-gray-700 m-auto justify-around text-center items-center p-2 ">
                                
                                    {/* PIC frame */}
                                    <div className='rounded-md'>
                                            <div className= " cursor-pointer mx-3 space-y-2 rounded-xl text-xs  bg-transparent items-center mt-4 mb-3 group">
                                             
                                             
                                                <img onClick={()=>{setdpCropper(true)}} src={miniProfile.dpUrl} alt="Dp" className="mx-auto rounded-full group-hover:text-white h-8 w-8"/>
                                               
                                                
                                                <p className= "text-gray-600 leading-3 text-center text-base font-bold ">@{miniProfile.userName}</p>
                                            <div className="bg-gray-100 rounded-md items-center"> 
                                            
                                                <p className= "w-1/2 m-auto text-gray-600 leading-4 text-center font-light break-words ">The Journey to Being a Billionaire is possible and exciting. Work smart and stay motivated </p> 
                                                <p className= "text-gray-600 leading-3 text-center font-semibold"></p>
                                            </div>
                                             
                                             
                                              {/* Buttons */}
                                        <div className= 'flex justify-center text-sm items-center'>

                                            {/* FOLLOW BUTTON ===*/}
                                            <div className="flex m-1 bg-gray-100 border border-gray-300 rounded-md items-center p-1"> 
                                                <p className= "p-1 text-gray-500 leading-4 text-center font-semibold">Follow</p> 
                                                <RiUserAddLine/>
                                            </div>
                                            {/* INBOX BUTTON ===*/}
                                            <div className="flex m-1 bg-gray-100 border border-gray-300 rounded-md items-center p-1"> 
                                                <p className= "p-1 text-gray-500 leading-4 text-center font-semibold">Inbox</p> 
                                                <HiOutlineChatAlt2 />
                                            </div>
                                         </div>
                                        
                                         </div> 
                                        
                                         
                                    </div>

                                    
                                    <div className='w-full'>
                                        {/* Follows */}
                                        <div className='text-base flex justify-around items-center py-2'>
                                            <div className='leading-4'>
                                                <p className= 'font-bold '>#3</p>
                                                <p className= 'font-light text-sm'>Rank</p>
                                            </div>
                                            <div className='leading-4'>
                                                <p className= 'font-bold '>3000</p>
                                                <p className= 'font-light text-sm'>Posts</p>
                                            </div>
                                            <div className='leading-4'>
                                                <p className= 'font-bold '>1.9B</p>
                                                <p className= 'font-light text-sm'>Followers</p>
                                            </div>
                                            <div className='leading-4'>
                                                <p className= 'font-bold '>1</p>
                                                <p className= 'font-light text-sm'>Following</p>
                                            </div>

                                        </div>

                                      
                                    </div>
                            </div>
                            </div>
                              
                            
                      
                        
                    </div> 


                           {/* //Diaries Map ========================== */}
                            <div className=''>
                                
                                   { diaries.map((diary) =>(
                                        
                                        // <Test key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId}/>
                                        
                                    <Portfolio key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId}/>
                                        // <PostBox key={diary._id} diary={diary} setDiaryId ={setDiaryId}/>
                                    ))
                                    }
                            </div>
                        
                    
                </div>
            
            
           

      
          


           </div>   
   
    )}


export default Portfolios;
