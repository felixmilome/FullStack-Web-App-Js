import {HiOutlineChatAlt2} from "react-icons/hi"
import {quickFollowAction} from "../Midwares/rdx/actions/profileAction.js";
import {BeatLoader} from "react-spinners";
import { useDispatch} from "react-redux";
import { useState } from "react";

export const ChatHuntRow = ({person}) => {

    const[loadingFollow, setLoadingFollow] = useState(false);

    const dispatch = useDispatch ();

    const followHandler= (userId) => {
        const followDataObj = {follower:'', followed:userId}; 
        setLoadingFollow(true);
        dispatch (quickFollowAction(followDataObj));
    }

  return (
  
          
            <div className= 'z-30 m-auto my-2 flex justify-center items-center rounded-xl  p-2 h-52 text-xs w-3/4 bg-gray-100'>
                <div className='m-auto'>

                    <img src={person.dpUrl} alt="DP" className="m-auto p-0.5 rounded-full h-20 w-20 "/>
                    
                    <div className='m-auto w-32 break-words my-1 text-center font-bold'>
                        <p>@{person.userName}</p>
                    </div>

                    <div className='space-y-2 my-2'>
                        {loadingFollow ===false &&
                        <div onClick={()=>followHandler(person._id)} className='flex justify-center mx-auto text-center font-bold text-white bg-gray-800 hover:bg-cyan-400 rounded  p-1 cursor-pointer'>
                            <p>subscribe</p>
                        </div>}
                        {loadingFollow === true &&
                        <div className='flex justify-center mx-auto text-center font-bold text-white bg-gray-800 hover:bg-cyan-400 rounded  p-1 cursor-pointer'>
                           <BeatLoader size={5} color ='cyan'/>
                        </div>}
                        <div className='flex justify-center mx-auto flex items-center text-center   border border-gray-800 hover:bg-white rounded py-1 px-2 cursor-pointer'>
                            <HiOutlineChatAlt2 className=" h-4 w-4 text-gray-700"/> 
                            <p>Start Chat</p>
                        </div>
                    </div>

                </div>
            </div> 

  )
}

