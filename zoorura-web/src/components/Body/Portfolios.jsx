
import PostBox from "./PostBox";
import {BeatLoader} from "react-spinners";
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';

import {RiUserAddLine, RiUserUnfollowLine} from "react-icons/ri";
import {HiOutlineChatAlt2} from "react-icons/hi"

//import IGbox from './IGbox.jsx'
import Portfolio from "./Portfolio";
import { DpCropper } from "./DpCropper.jsx";
//import { Test } from "./test";
import {useParams} from "react-router-dom";
import {getMiniProfileAction, followAction} from "../Midwares/rdx/actions/profileAction.js"
import { useEffect } from 'react';


function Portfolios(diaryId, setDiaryId) { 

        const {profileName} = useParams();
        console.log(profileName);

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(getMiniProfileAction(profileName));
        }, [dispatch]);
    
        const miniProfile = useSelector((state) => state.getMiniProfileReducer);

       console.log(miniProfile);

    const user = JSON.parse(localStorage.getItem('profile'));
    const[dpCropper, setdpCropper] = useState(false);
    const [Ifollow, setIfollow] = useState(false);
    //const userName = user.result.userName;
    const diaries = useSelector((state) => state.diariesReducer);
    // if(miniProfile && miniProfile!="NO_USER"){
    //     if (miniProfile && miniProfile.followers.includes(user.result._id));{
    //         setIfollow(true);
    //     }
    // }

    const setFollowData = async()=>{
        return new Promise((resolve, reject) => {
            const folowData = {follower:user.result._id, followed:miniProfile._id};
            resolve (folowData);
        });
    }
   const handleFollow = async() =>{
  
        const followData = await setFollowData();
        dispatch(followAction(followData));
        console.log(followData);
        console.log(user.result._id);
        console.log(miniProfile._id);
   }




//console.log(diaries);

    return (
        
    
       <div>
                <div >
                    {/* portbox */}
                    {user && user.result._id == miniProfile._id ?
                        <>
                            { dpCropper &&
                            <DpCropper dpCropper={dpCropper} setdpCropper ={setdpCropper}/>
                            }
                        </> :
                        <></>
                    }
                    
                        <div className='w-full opacity-90  m-auto z-30  bg-transparent'>
                            <div className= 'flex m-auto bg-transparent'>
                            <div className="bg-gray-100 w-full lg:w-2/5 rounded-lg  text-gray-700 m-auto justify-around text-center items-center p-2 ">
                                
                            { miniProfile == "NO_USER" ?
                                //return value 'not found' to be read if no miniprofile doesnt exist, differ from null
                                <div className="p-3 flex">   
                                    <div className="text-center text-sm text-gray-400 p-3 m-auto bg-transparent rounded-xl">
                                        
                                        {/* <BeatLoader size={24} color='white' loading/> */}
                                        <p className= 'text-lg text-gray-700 font-bold'>Ensure The User "{'@' + profileName}" Exists.</p>
                                        
                                    </div>
                                </div>

                                :(
                                      <>  
                                    {miniProfile.dpUrl ?
                                        <>
                                            <div className='rounded-md'>
                                                    <div className= "mx-3 space-y-2 rounded-xl text-xs  bg-transparent items-center mt-4 mb-3 group">
                                                        <img onClick={()=>{setdpCropper(true)}} src={miniProfile.dpUrl} alt="" className="mx-auto rounded-full group-hover:text-white h-8 w-8"/>
                                                        <p className= "text-gray-600 leading-3 text-center text-base font-bold ">@{profileName}</p>
                                                    <div className="bg-gray-100 rounded-md items-center">
                                                        <p className= "w-1/2 m-auto text-gray-600 leading-4 text-center font-light break-words ">The Journey to Being a Billionaire is possible and exciting. Work smart and stay motivated </p> 
                                                        
                                                        {user && miniProfile.followers.includes(user.result._id) &&  
                                                                <p className= "text-gray-600 leading-3 text-center font-semibold">I follow @{user.result.userName}</p>
                                                            }

                                                    </div>
                                                    
                                                    
                                                    {user &&
                                                    <div className= 'flex justify-center text-sm items-center'>

                                                        {miniProfile.followers.includes(user.result._id) ?
                                                        <div onClick= {handleFollow} className=" flex text-gray-100 m-1 bg-cyan-400 rounded-md items-center p-1 cursor-pointer hover:bg-cyan-600"> 
                                                            <p className= "p-1 leading-4 text-center font-semibold">Unfollow</p> 
                                                            <RiUserUnfollowLine/>
                                                        </div>
                                                        :
                                                        <div onClick= {handleFollow} className=" flex m-1 bg-gray-100 border border-gray-300 rounded-md items-center p-1 cursor-pointer hover:bg-gray-200"> 
                                                            <p className= "p-1 text-gray-500 leading-4 text-center font-semibold">Follow</p> 
                                                            <RiUserAddLine/>
                                                        </div>
                                                        }
                                                
                                                        <div className="flex m-1 bg-gray-100 border border-gray-300 rounded-md items-center p-1"> 
                                                            <p className= "p-1 text-gray-500 leading-4 text-center font-semibold">Inbox</p> 
                                                            <HiOutlineChatAlt2 />
                                                        </div>
                                                        
                                                    </div>
                                                    }
                                                
                                                </div> 
                                                
                                                
                                            </div>

                                            
                                            <div className='w-full'>
                                            
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
                                         </>
                                      :
                                      <>
                                        <BeatLoader size={24} color='white' loading/>
                                        <p className= 'text-sm text-gray-400 font-bold'>Searching for "@{profileName}'s" profile</p>
                                       </>
                                    } 
                                </>
                                )
                                }
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
