import { ChatHuntRow } from "./ChatHuntRow";
import {IoMdChatboxes} from 'react-icons/io';
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from 'react';
import {getUsersAction} from '../Midwares/rdx/actions/profileAction.js';




export const ChatHunt = () => { 
    const user = JSON.parse(localStorage.getItem('profile'));
    const follows = useSelector((state) => state.followsReducer);
    const dispatch = useDispatch ();

    useEffect(() => {
        const userObj = {type:'ChatHunt'}; 
        dispatch(getUsersAction(userObj));
      }, []);



      const chatPeople = useSelector((state) => state.chatHuntReducer);

  return (
    <div className= 'top-0  w-screen h-full'>

            <div className='fixed h-16 top-24 z-40  xl:top-16 items-center  top-0 flex justify-center  w-full m-auto space-x-1 '>
                <div className='flex justify-center p-2 bg-gray-200 lg:w-2/5 w-full'>
                    <div className='p-2 bg-gray-800 rounded-full'>
                    <IoMdChatboxes className=" h-4 w-4 text-white"/> 
                    </div> 
                    <div className=' font-bold text-normal text-gray-800 p-1 rounded-md text-center'>
                            Chat Hunt
                    </div>
                </div>

            </div>
       
        <div className='flex justify-center'>

            <div className= 'border border-gray-200 rounded-xl grid grid-cols-2 mx-auto mt-14   w-full lg:w-2/5 '>    
                {/* Person Box MAPS */}

                {
                            
                            chatPeople.map((person) =>(
                                <>
                                    {!user.result.blocked.includes(person._id) && !user.result.blockers.includes(person)  &&
                                    !person.blockers.includes(user.result._id) && !person.blocked.includes(user.result._id) && 
                                    !follows.includes(person._id) &&  person._id !== user.result._id &&
                                        <ChatHuntRow  key={person._id} person={person} />
                                    } 
                                </>  
                            ))
                        } 
            

            </div>
        </div>


    </div>
  )
}

