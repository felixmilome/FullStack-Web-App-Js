
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { DotsVerticalIcon} from "@heroicons/react/outline";
import{faPrayingHands} from "@fortawesome/free-solid-svg-icons";
import {GiTakeMyMoney, GiMoneyStack} from 'react-icons/gi';
import {PicForm, AudioForm, VideoForm} from "../Body/PostForms/Previews.jsx";
import {useState,  useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import OutsideClickHandler from 'react-outside-click-handler';
import {messageTipsAction} from '../Midwares/rdx/actions/tipsAction';
import {readMessagesAction} from '../Midwares/rdx/actions/messagesAction';
import { DeliveryPop } from "./DeliveryPop.jsx";
import {BeatLoader} from "react-spinners";





function  ReceivedBubble({ReceivedMessage, contactViewed, setContactViewed, message, Type, displayed, File}) {
    const[popTip,setPopTip] = useState(false);
    const[tipLoading,setTipLoading] = useState(false);
    const[tipDelivery,setTipDelivery] = useState(false);
    const[tipData, setTipData] = useState({receiverId:displayed._id, tippedPostId:message._id, type: 'message', amount: displayed.convoTip}); 
    const dispatch = useDispatch(); 
    const socket = useSelector((state) => state.socketReducer);
    const [thisUnread, setThisUnread] = useState(false);  
    
  

    useEffect(() => {    
        if(message.read === false){ 
            
           // setUnread(true);
            setThisUnread(true); //Mark BLUE and keep despite object edited to read.

            setTimeout(function() {
                dispatch(readMessagesAction(message._id)) }
            , 3000);

        }
    }, ); 

   const tipMessage = ()=> {
       
       console.log(tipData);
       setTipLoading(true); 
     dispatch(messageTipsAction(tipData, setPopTip, setTipLoading, setTipDelivery, socket)); 
   }

   const tipSetter =()=>{

    setPopTip(true);
    setTipData ({receiverId:displayed._id, tippedPostId:message._id, type: 'message', amount: displayed.convoTip})
    
   }

    return (
        <div className="relative mx-1 p-0.5 bg-transparent flex justify-start items-center">
   

        {tipDelivery &&
        <DeliveryPop message='Message Tip Sent'/>
         }
            {tipLoading === false &&  message.tipAmount == 0 && <OutsideClickHandler     
                            onOutsideClick={() => {
                                setPopTip(false);
                            }}
                            >
                     <div onClick={tipSetter}className="absolute left-0 top-0 flex justify-center items-center bg-gray-100 rounded-full h-7 w-7 hover:bg-gray-800 group cursor-pointer">
                        <GiMoneyStack size={20} className="group-hover:text-cyan-400 text-gray-400 "/>
                    </div>
                    {popTip && 
                        <div className="absolute text-xs font-bold w-fit p-1 left-12 top-0 flex justify-center items-center bg-gray-100 rounded-md  ">
                            <div className="space-y-2 text-center p-2">
                                <div>Tip ({displayed.convoTip})?</div>
                                 <div onClick= {(tipMessage)} className='bg-teal-400 rounded-md text-white hover:bg-teal-600 group cursor-pointer'>
                                    Yes
                                </div>

                            </div>
                        </div>
                    }
            </OutsideClickHandler>}
            {tipLoading === true && message.tipAmount === 0 &&
                     <div onClick={()=>setPopTip(!popTip)}className="absolute  left-0 top-0 flex justify-center items-center bg-gray-100 rounded-full w-fit">
                       <BeatLoader size={12} color='pink' loading/>
                    </div>
            }
            {message.tipAmount > 0 &&
                     <div className="absolute text-xs text-cyan-400 left-0 top-0 flex justify-center items-center bg-gray-700 rounded p-0.5 w-fit">
                       <p>tipped:</p>
                       <p className='font-bold'>{message.tipAmount}</p>
                    </div>
            }
                    {/* <div className="absolute text-xs font-bold w-fit p-1 right-4 bottom-0 flex justify-center items-center bg-gray-100 rounded-full  hover:bg-cyan-400 group cursor-pointer">
                        <div>Delete</div>
                    </div> */}
           
           {/* <div className="flex justify-center items-center bg-gray-100 rounded-full h-9 w-9 hover:bg-cyan-400 group cursor-pointer">
                <TrashIcon className="group-hover:text-white text-gray-300 p-1"/>
            </div>    */}
            {Type === 'text' &&
            <div className="flex justify-start max-w-3/4 bg-transparent p-0.5 sm:w-2/3">
                
                    <div className="rounded-full bg-pink-100">
                        <div className="flex justify-start p-1 text-sm font-light">
                            <div style={{wordBreak: 'break-word'}}  className="p-3 max-w-xs  bg-gray-100 rounded-t-xl rounded-br-xl bg-gray-100 text-gray-600">
                                <p>{ReceivedMessage}</p>

                                {ReceivedMessage.split('\n').map(function(item) {
                                    return (
                                        <p key={item}>{item}</p> 
                                        )
                                })}

                                <div style={{wordBreak: 'break-word'}} className="text-xs text-gray-400 text-right pt-2">
                                <p>14.4.23, 4.32 pm</p>
                                </div>
                                {thisUnread=== true &&  contactViewed === false &&
                                    <div className= 'w-full text-cyan-600 font-bold flex justify-end items-center font-light text-xs '>
                                    <p>new</p>
                                    </div>
                                }
                             </div>
                        </div>
                        
                    </div>
            </div>}

            {File?.length > 0 && 
                    
                    <div className="flex w-4/5 h-60 m-1  justify-start text-sm font-light">
                        <div className='bg-transparent'>
                            <div style={{wordBreak: 'break-word'}} className=" flex w-full  justify-center my-0 p-0.5 rounded-r-xl rounded-tl-xl  bg-pink-100 text-white">

                            
                                        {Type ==='video' &&
                                            <VideoForm Url={File}/>
                                        }
                                          {Type ==='audio' &&
                                            <AudioForm Url={File}/>
                                        }
                                         {Type ==='image' &&
                                            <PicForm Url={File}/>
                                        }
                                    
                                
                            
                            </div>
                            <div style={{wordBreak: 'break-word'}} className="text-xs text-gray-500 text-right pt-2 pr-2">
                                    <p>14.4.23, 4.32 pm</p>
                            </div>
                            {thisUnread=== true && contactViewed === false &&
                                    <div className= 'w-full text-cyan-600 font-bold flex justify-end items-center font-light text-xs '>
                                    <p>new</p>
                                    </div>
                                }
            
                        </div>
                    

                    </div>}




            {/* <div className="flex justify-center items-center bg-gray-100 rounded-full h-9 w-9 hover:bg-cyan-400 group cursor-pointer">
                <DotsVerticalIcon className="group-hover:text-white text-gray-300 p-1.5"/>
            </div> */}

            

        </div>
        
    )
}

export default ReceivedBubble;
