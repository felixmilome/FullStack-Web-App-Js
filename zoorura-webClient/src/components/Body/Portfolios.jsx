
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {Link} from 'react-router-dom';

import {RiUserAddLine, RiUserUnfollowLine} from "react-icons/ri";
import {MdOutlineBlock} from "react-icons/md";
import {HiOutlineChatAlt2} from "react-icons/hi"
import {BeatLoader} from "react-spinners";
import Portfolio from "./Portfolio";
import { DpCropper } from "./DpCropper.jsx";
import {useParams} from "react-router-dom";
import {getMiniProfileAction, followAction, quickFollowAction, blockAction} from "../Midwares/rdx/actions/profileAction.js";
import {getUsersDiariesAction} from "../Midwares/rdx/actions/diariesAction.js";
import { useEffect } from 'react';
import ConvoForm from './ConvoForm.jsx';
import ContactMod from '../Modals/ContactMod.jsx';
import {SurePop} from "./SurePop.jsx"; 
import ContactModIndi from "../Modals/ContactModIndi.jsx";
import PostFrame from "./PostFrame.jsx";
import { SkeletonPosts } from "./SkeletonPosts";

// Search Area  Chat

function Portfolios({diaryId, setDiaryId, setpopContacts, popContacts}) { 

        const {profileName} = useParams();
        console.log(profileName);

        const dispatch = useDispatch();

        useEffect(() => { 
            dispatch(getMiniProfileAction(profileName));   
        }, [profileName]);
    
        const miniProfile = useSelector((state) => state.getMiniProfileReducer);

       console.log(miniProfile);

       const allUsersDiaries = useSelector((state) => state.usersDiariesReducer);

       const usersDiaries =  allUsersDiaries?.filter(diary => diary.creator === miniProfile?._id); //creator part for displays
        console.log(allUsersDiaries);
       useEffect(() => {     
           
           if(miniProfile?._id?.length >0 && !usersDiaries?.length){
               console.log(miniProfile)
               dispatch(getUsersDiariesAction(miniProfile?._id)); 
               console.log(allUsersDiaries);   
           }
   
       }, [miniProfile]);


    const user = JSON.parse(localStorage.getItem('profile'));
    const[dpCropper, setdpCropper] = useState(false);
    const [Ifollow, setIfollow] = useState(false);
    const [followSpam, setFollowSpam] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contactsIndi, setContactsIndi] = useState(false);
    const [loadingButtons, setLoadingButtons] = useState(false);
    const [blockSurePop, setBlockSurePop] = useState(false);
   
    const [blockError, setBlockError] = useState(false);
    const [popConvoForm, setpopConvoForm] = useState(false);

    const [members, setMembers] = useState([]);
    const [convoCreator, setconvoCreator] = useState(false);

    const diaries = useSelector((state) => state.diariesReducer);// remove this code and fetch diaries that are of this user
    const blockFeedback = useSelector((state) => state.blockReducer);
    const convosAll = useSelector((state) => state.convosReducer);
    const convoState = useSelector((state) => state.convoStateReducer); 
    
    const socket = useSelector((state) => state.socketReducer);

    const  Chat = convosAll.filter( Chat =>
     ( Chat.guest._id == user.result._id &&  Chat.host._id === miniProfile._id)
     ||( Chat.host._id == user.result._id &&  Chat.guest._id === miniProfile._id)
     );
    

    const setFollowData = async()=>{
        return new Promise((resolve, reject) => {
            const folowData = {follower:user.result._id, followed:miniProfile._id};
            resolve (folowData);
        });
    }
    const setBlockData = async()=>{
        return new Promise((resolve, reject) => {
            const blockData = {blocked:miniProfile._id};
            resolve (blockData);
        });
    }
   const handleFollow = async() =>{
        setLoadingButtons(true);
        const followData = await setFollowData();
        dispatch(followAction(followData, setLoadingButtons, socket, setFollowSpam));
        console.log(followData);
        console.log(user.result._id);
        console.log(miniProfile._id);
   }
   const handleBlock = async() =>{

    setLoading(true);
    setLoadingButtons(true);
  
    const blockData = await setBlockData();
    dispatch(blockAction(blockData, setBlockSurePop, setBlockError, setLoading, setLoadingButtons));
    console.log(blockData);

}
const handleConvo = async() =>{
    //    console.log ( Chat[0]._id);
    //    console.log(convosAll);
    //    console.log (convoState);
    if( Chat.length < 1 && convoState !== 'SearchingConvo'){  
       // setMembers([user.result._id, miniProfile.Id]); //Revisist
        setpopConvoForm(true);
    }else if ( Chat.length > 0 && convoState === 'YesConvo'){
       setpopContacts(false);
       setContactsIndi(true);
    }

    // dispatch(createConvoAction(followData));
    // console.log(followData);
    // console.log(user.result._id);
    // console.log(miniProfile._id);
}




//console.log(diaries);
 
    return (
         
    
       <div className="">
                         <div className='flex justify-start fixed z-40 bottom-2 right-2 items-center w-full  m-auto bg-transparent w-full'>
                               <div className='bg-gray-800 py-2 px-10 font-bold text-gray-100 text-xs rounded-md'>
                                   <p>@{profileName}'s profile</p>
                                </div>
                            </div>
          
        {contactsIndi && Chat[0]?._id && <ContactMod convoId={ Chat[0]?._id} setpopChatBox={setContactsIndi} displayed= {miniProfile} viewer = {user.result}/>}
            {blockFeedback !=='Success' && blockError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-red-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-red-100 text-xs' > 
                                <p>An Error occured</p>
                           </div>
                        </div>
                        }
                        { blockFeedback ==='Success' && blockError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-green-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-green-100 text-xs' > 
                                <p>Account Blocked</p>
                           </div>
                        </div>
                        }
           { blockSurePop &&
        <SurePop action={'Block'} token={`@${miniProfile.userName}`} loadingFunction={loading} loadingMessage={`Blocking @${miniProfile.userName}`} yesFunction ={handleBlock} noFunction= {()=>setBlockSurePop(false)}/>
        }
           
        {user && miniProfile && miniProfile._id != user.result._id ?
            <>
            {popConvoForm &&
            <div className="fixed  top-36 z-40  flex w-full justify-center">

                <OutsideClickHandler     
                onOutsideClick={() => {
                    setpopConvoForm(false);
                }}>
                    <div className="m-auto">
                    <ConvoForm miniProfile={miniProfile} user= {user} setpopConvoForm ={setpopConvoForm}/>
                    </div>
                </OutsideClickHandler>
                </div>
             } 
            </>:
            <></>
        }

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
                    
                        <div className=' w-full opacity-90  m-auto  bg-transparent'>
                         
                  
                            <div className= 'flex m-auto bg-transparent'>
                            <div className="bg-gray-100 dark:bg-gray-900 w-full lg:w-2/5 rounded-lg  text-gray-700 dark:text-gray-300 m-auto justify-around text-center items-center p-2 ">
                                
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
                                                        <img onClick={()=>{setdpCropper(true)}} src={miniProfile.dpUrl} alt="" className="mx-auto rounded-full group-hover:text-white h-32 w-32"/>
                                                        <p className= "leading-3 text-center text-base font-bold ">@{miniProfile.userName}</p>
                                                    <div className=" rounded-md items-center">
                                                        <p className= "w-1/2 m-auto  leading-4 text-center font-light break-words ">{miniProfile.bio} </p> 
                                                        
                                                        {user && miniProfile.follows.includes(user.result._id) &&  
                                                                <p className= " leading-3 text-center font-semibold">I Subscribe to @{user.result.userName}</p>
                                                            }

                                                    </div>
                                                    
                                                    
                                                    {user &&
                                                    <div className= 'flex justify-center text-sm items-center'>
                                                    { followSpam == true &&
                                                            <div className=" bg-gray-700 py-4 rounded-full px-20 flex justify-center fixed z-40 m-auto text-center font-bold text-white">
                                                            <p> Todays Subscription Limit(100) reached! Try Tomorrow </p>
                                                            </div>
                                                     } 
                                                       
                                                    {loadingButtons===false && 
                                                        <>
                                                            {miniProfile.followers.includes(user.result._id) ?
                                                            <div onClick= {handleFollow} className=" flex text-gray-100 dark:text-gray-900 m-1 bg-cyan-400 rounded-md items-center p-1 cursor-pointer hover:bg-cyan-600"> 
                                                                <p className= "p-1 leading-4  text-center font-semibold">Unsubscribe</p> 
                                                                <RiUserUnfollowLine/>
                                                            </div>
                                                            :
                                                            <div onClick= {handleFollow} className=" flex m-1  border border-gray-300 rounded-md items-center p-1 cursor-pointer dark:hover:bg-gray-800  hover:bg-gray-200"> 
                                                                <p className= "p-1 text-gray-500 dark:text-gray-300 leading-4 text-center font-semibold">Subscribe</p> 
                                                                <RiUserAddLine/>
                                                            </div>
                                                            } 
                                                            {miniProfile._id != user.result._id &&
                                                                <>
                                                            
                                                                    <div onClick= {handleConvo} className="flex m-1 border border-gray-300 rounded-md items-center p-1 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200"> 
                                                                        <p className= "p-1 text-gray-500 dark:text-gray-300 leading-4 text-center font-semibold">
                                                                            {miniProfile?.convoRequesters.includes(user.result._id) ? "Requested" : "Convo/Chat"}
                                                                            </p> 
                                                                        <HiOutlineChatAlt2 />  
                                                                      
                                                                       
                                                                     
                                                               </div>

                                

                                                                <div onClick= {()=>setBlockSurePop(true)} className="flex m-1 border border-gray-300 rounded-md items-center p-1 cursor-pointer dark:hover:bg-gray-800  hover:bg-gray-200"> 
                                                                        <p className= "p-1 text-gray-500 dark:text-gray-300 leading-4 text-center font-semibold">Block</p> 
                                                                        <MdOutlineBlock />
                                                                    </div>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                    {loadingButtons === true &&
                                                        
                                                        <BeatLoader size={22} color='gray' loading/>

                                                    }
                                                        
                                                    </div>
                                                    }
                                                
                                                </div> 
                                                
                                                
                                            </div>

                                            
                                            <div className='w-full'>
                                            
                                                <div className='text-base flex justify-around items-center py-2'> 
                                                    <div className='leading-4'>
                                                        <p className= 'font-bold '>{miniProfile.convoTip}</p>
                                                        <p className= 'font-light text-sm'>Chat Tip</p>
                                                    </div>
                                                    <div className='leading-4'>
                                                        <p className= 'font-bold '>{miniProfile.postTotal}</p>
                                                        <p className= 'font-light text-sm'>Posts</p>
                                                    </div>
                                                    <Link to ={`/Portfolios/${miniProfile.userName}/Followers`}> 
                                                        <div className='leading-4 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md border border-gray-200  cursor-pointer p-1'>
                                                            <p className= 'font-bold '>{miniProfile.followers.length}</p>
                                                            <p className= 'font-light text-sm'>Subscribers</p>
                                                        </div>
                                                    </Link>
                                                    <Link to ={`/Portfolios/${miniProfile.userName}/Following`}> 
                                                        <div className='leading-4 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md border border-gray-200 cursor-pointer p-1'>
                                                            <p className= 'font-bold '>{miniProfile.follows.length}</p>
                                                            <p className= 'font-light text-sm'>Subscriptions</p>
                                                        </div>
                                                    </Link>

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
                            {usersDiaries?.length>0 && <div className='m-auto my-2'>
                                
                                   { usersDiaries?.map((diary) =>(
                                        
                                        
                                        
                                    <PostFrame key={diary._id} diary={diary} diaryId={diaryId} setDiaryId ={setDiaryId} params ='profile'/>
                                     
                                    ))
                                    }
                            </div>}
                            {!usersDiaries?.length>0 && <div className='m-auto my-2'>      
                                     
                            <SkeletonPosts/> 
                            
                         </div>}
                        
                    
                </div>
            
            
           

      
          


           </div>   
   
    )}


export default Portfolios;
