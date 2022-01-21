import { PhoneIcon, VideoCameraIcon, XCircleIcon } from "@heroicons/react/outline"
import ReceivedBubble from "./ReceivedBubble.jsx"
import SentBubble from "./SentBubble.jsx";
import {BeatLoader} from "react-spinners";
import {useSelector, useDispatch} from 'react-redux';
import { MdSend} from "react-icons/md";
import {useState, useRef, useEffect} from 'react';
import {postMessagesAction, getMessagesAction} from '../Midwares/rdx/actions/messagesAction.js';


function ContactMod({setpopChatBox, convoId, displayed, viewer}) {
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getMessagesAction(convoId));
    }, [dispatch]); 

    const messages = useSelector((state) => state.messagesReducer);

    console.log(messages);

    const[messageData, setmessageData] = useState({convoId:convoId, senderId:viewer._id, receiverId:displayed._id, body:''});
    // console.log(convoId);
    // console.log(displayed);
    // console.log(viewer); 

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);
  
    const sendMessage = () => {
        console.log(messageData); 
        dispatch(postMessagesAction(messageData));
    }

    return (
        <div className="border-gray-300 fixed top-24 xl:top-20 xl:bottom-0 right-0 xl:right-2 m-auto w-full xl:w-1/4  bg-gray-200">
            {/* Top Part */}
            <div className="fixed z-20 
            border-b-2 border-gray-200
             bg-gray-100 p-1
             w-full xl:w-1/4  flex  
             justify-between items-center">

                <div className="flex items-center space-x-2
                 bg-transparent justify-around 
                 p-0.5 px-2 rounded-full 
                 text-xs
                  font-bold
                   text-gray-500">
                    <img src={displayed.dpUrl} alt="DP" className="rounded-full object-cover h-8 w-8 m-0.5"/>    
                    <p>@{displayed.userName}</p>
                </div>
                <div className="mx-5 space-x-4 sm:space-x-2 bg-transparent flex items-center justify-around">
                    <div className="hover:bg-cyan-400
                     p-1 rounded-full cursor-pointer group">
                        <VideoCameraIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                    </div>
                    <div className="hover:bg-cyan-400
                     p-1 rounded-full cursor-pointer group">
                        <PhoneIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                    </div>
                    <div onClick ={(e)=> setpopChatBox(false)} className="hover:bg-gray-300
                     p-1 rounded-full cursor-pointer group">
                        <XCircleIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                    </div>
                </div>

            </div>
            
            {/* ALL MESSAGE CHATs CONTAINER */}
            <div className= "pb-48 mt-12 max-h-screen min-h-screen w-full overflow-y-scroll">
                {/* <ReceivedBubble ReceivedMessage="Hello Sir Milome"/>
                <SentBubble SentMessage="I am Fine"/>
                */}
                {messages.length ?

                    <>
                        {
                        messages.map((message) =>{
                            

                            if (viewer._id === message.senderId){ //BELONGS TO ME(VIEWER)
                              
                                return(
                                    <SentBubble key={message._id} SentMessage={message.body}/>
                                )
                            }
                            if (displayed._id === message.senderId){ //BELONGS TO THEM(DISPLAYED)
                             
                                return(
                                    <ReceivedBubble key={message._id} ReceivedMessage={message.body}/>
                                )
                            }
                        }
                       
                        )

                        }     
                </> :

                        <div className='flex justify-start p-5'>
                            <div className=''>
                                <BeatLoader size={15} color='white' loading/>
                                <p className= 'text-sm text-gray-400'>fetching messages..</p>
                            </div>
                        </div>
                }

                    <div className="w-full items-center">
                               
                                <div className='flex justify-end'>
                                    <div className=' m-1 p-1 rounded-full flex bg-cyan-200 w-3/4'>
                                        <div className='p-2 bg-gray-100 rounded-xl w-full'>
                                        
                                        <textarea 
                                        onChange={(e)=> setmessageData({...messageData, body: e.target.value})}
                                        type="text" placeholder="TYPE MESSAGE HERE..." className=" resize-none h-36 max-h-screen w-full m-auto text-gray-700 font-medium outline-none bg-gray-100 text-sm rounded"/>
                                    
                                        </div>

                                    </div>
                                     { messageData.body.length > 0 && 
                                        <div className='flex justify-center p-3 text-xs font-bold text-gray-400 '>
                                            
                                            <div className='flex rounded-full items-center justify-center space-x-1 '>
                                              
                                               <div onClick= {sendMessage} className='bg-cyan-400 rounded-full p-2'>
                                                    <MdSend className='text-gray-100 text-white h-6 w-6 '/>
                                                </div>
                                            
                                            </div>
                                        </div>
                                        }
                                  
                                         <div ref={messagesEndRef} />
                                </div>
                                 
                                
                    </div>

            </div>
        </div>
    )
}

export default ContactMod;
