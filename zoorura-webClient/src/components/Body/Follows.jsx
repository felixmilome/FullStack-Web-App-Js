import { FollowsRow } from "./FollowsRow";
import {IoMdChatboxes} from 'react-icons/io';
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from 'react';
import {getUsersAction} from '../Midwares/rdx/actions/profileAction.js';
import { SkelChatHunt } from "./SkelChatHunt.jsx";
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';




export const Follows = ({setpopContacts, userName}) => { 
    const user = JSON.parse(localStorage.getItem('profile'));
    const {profileName} = useParams();
    const {getItem} = useParams();
    const [followersOn, setFollowersOn] = useState(getItem);
  
    const dispatch = useDispatch ();
    

    useEffect(() => {

        if(followersOn === 'Followers'){
            dispatch({type:'CLEAR_FOLLOWERS'}); 
            const userObj = {type:'Followers', profileName:profileName}; 
            dispatch(getUsersAction(userObj));
        }

      }, [followersOn]);

      useEffect(() => {

        if(followersOn === 'Following'){
            dispatch({type:'CLEAR_FOLLOWING'});
            const userObj = {type:'Following', profileName:profileName}; 
            dispatch(getUsersAction(userObj));
        }

      }, [followersOn]);

    const setpopContactsFalse = () => {

        setpopContacts(false);
        console.log('setCons');

    }


      const followers = useSelector((state) => state.followersReducer);
      const followings = useSelector((state) => state.followingReducer);

  return (
    <div className= 'top-0  w-screen h-full'>

            <div className='fixed h-16 top-28 z-40  xl:top-16 items-center  flex justify-center  w-full m-auto space-x-1 '>
                <div className='flex justify-center items-center p-2 bg-gray-200 rounded-md  lg:w-2/5 w-full shadow-xl'>
                   
                    <Link to ={`/Portfolios/${profileName}`}> 
                        <div className='flex justify-center px-4 items-center border border-cyan-400 rounded-md font-light text-xs text-gray-800 mx-4 h-6 rounded-md text-center '>
                            @{profileName}
                        </div>
                    </Link>
                   
                   {followersOn ==='Followers' &&
                    <div className=' font-semibold text-sm text-gray-800 p-1 rounded-md text-center'>
                         Subscribers
                    </div>}
                    {followersOn ==='Following' &&
                    <div className=' font-semibold text-sm text-gray-800 p-1 rounded-md text-center'>
                         Subscriptions
                    </div>}
                </div>

            </div> 
       
        <div className='flex justify-center'>

            <div className= '  grid grid-cols-2 mx-auto mt-14   w-full lg:w-2/5 '>    
                {/* Person Box MAPS */}
                        {followersOn ==='Followers' &&
                            <>
                                {!followers?.length > 0 &&
                                    
                                    <SkelChatHunt/>
                                    
                                } 

                                {followers?.length > 0 &&
                                    
                                    followers.map((miniProfile) =>(
                                        <>
                                            {!user.result.blocked.includes(miniProfile._id) && !user.result.blockers.includes(miniProfile)  &&
                                            !miniProfile.blockers.includes(user.result._id) && !miniProfile.blocked.includes(user.result._id) &&  
                                         

                                                <FollowsRow  key={miniProfile._id} miniProfile={miniProfile} setpopContactsFalse={setpopContactsFalse} />
                                            } 
                                        </>  
                                    ))
                                }
                            </> 
                        }
                          {followersOn ==='Following' &&
                            <>
                                {!followings?.length > 0 &&
                                    
                                    <SkelChatHunt/>
                                    
                                } 

                                {followings?.length > 0 &&
                                    
                                    followings.map((miniProfile) =>(
                                        <>
                                            {!user.result.blocked.includes(miniProfile._id) && !user.result.blockers.includes(miniProfile)  &&
                                            !miniProfile.blockers.includes(user.result._id) && !miniProfile.blocked.includes(user.result._id) && 

                                                <FollowsRow  key={miniProfile._id} miniProfile={miniProfile} setpopContactsFalse={setpopContactsFalse} />
                                            } 
                                        </>  
                                    ))
                                }
                            </> 
                        }
                       
            

            </div>
        </div>


    </div>
  )
}

