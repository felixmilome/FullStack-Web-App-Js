
import{useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'; 
import { postConvosAction } from "../Midwares/rdx/actions/convosAction.js";

import {HiOutlineChatAlt2} from "react-icons/hi"
//import {BsLightningCharge} from "react-icons/bs"
import { XCircleIcon } from "@heroicons/react/outline"




function ConvoForm({miniProfile, user, setpopConvoForm}) {
    
    const[freeConvoData, setfreeConvoData] = useState({host: user.result._id, guest: miniProfile._id, members: [user.result._id, miniProfile._id], type:'2', tip: 0, intro:''});
    const[tipConvoData, settipConvoData] = useState({host: user.result._id, guest: miniProfile._id, members: [user.result._id, miniProfile._id], type:'2', tip: 30, intro:''}); //miniProfile.convoTip

    const[messageData, setmessageData] = useState({convoId: user.result._id, senderId: user.result._id, receiverId: miniProfile._id, body:''});

    const dispatch = useDispatch();

    const requestFree = async ()=>{
      

            try{
                dispatch(postConvosAction (freeConvoData)); 
                console.log(freeConvoData); 
            }
            catch(err){    
                console.log(err);
            }
            
    }
    const requestWithTip = async ()=>{
       

            try{
                dispatch(postConvosAction (tipConvoData)); 
                console.log(tipConvoData);
            }
            catch(err){
                console.log(err);
            }
            
    }
    return (
        <div className="w-96 border border-gray-200 bg-gray-200 rounded-md flex items-center justify-center">

                {/* { popPosted &&
                        <div className=" bg-gray-700 py-4 top-28 rounded-full px-20 flex justify-center fixed z-40 m-auto text-center font-bold text-white">
                           <p> Post Updated! </p>
                        </div>
                    } */}
               
                <div className="space-y-5 w-full bg-transparent items-center  z-30  m-4">
                        
                       
                       
                        {/* Cyan Heading */}
                        <div className="bg-transparent border-b items-center border-gray-300">
                           
                            <div className= "relative flex justify-center text-gray-400">
                                <div className="bg-transparent rounded-full p-1 border border-gray-400">
                                <HiOutlineChatAlt2 size={30} className="text-gray-400 p-1" />
                                </div>
                                <div onClick ={(e)=> setpopConvoForm(false)} className="p-1 flex text-gray-400 items-center absolute right-2 bottom-2 bg-gray-300 hover:bg-gray-300 hover:text-white p-1 rounded-full cursor-pointer group text-xs font-light">
                               
                                <XCircleIcon className= "h-5 w-5 group-hover:text-white text-gray-400"/>
                                </div>
                            </div>
                            <div className="text-center p-3 font-light text-sm text-gray-500">
                            <p className="">Request Private Convo with: </p>
                            <p className="font-bold">@{miniProfile.userName}</p>
                            </div>
                           
                        </div>

                    {/*----- FORM------------------------- */}
                  

                        <div className= "flex justify-center items-center p-0.5 space-x-1">
                            
                            <img src={miniProfile.dpUrl} alt="DP" className="rounded-full h-8 w-8"/>
                            {/* <BsLightningCharge size={40} className="text-gray-400"/> */}
                            <img src={user.result.dpUrl} alt="DP" className="rounded-full h-8 w-8"/>
                        </div>

                        <div className="">
            

                                       {/*-- Title------------ */}
                                       {/* <div className="flex justify-center">
                                        <input name= "name"
                                         onChange={(e)=> setchatRoomData({...chatRoomData, room: e.target.value})}
                                        placeholder="Chat Room Name" className="text-sm text-gray-700 font-medium outline-none  mx-4 my-3 w-full px-4 p-1 sm:py-2 border border-gray-300 rounded-full bg-gray-200"/>
                                    </div> */}
                                {/* ---Content---------------  */}
                                    <div className="px-3 items-center flex justify-center">
                                        <textarea name= "body"
                                         onChange={(e)=> {
                                            setfreeConvoData({...freeConvoData, intro: e.target.value});
                                            settipConvoData({...tipConvoData, intro: e.target.value});
                                         }}
                                        
                                        placeholder="Enter Intro Message" className="resize-none h-28 text-gray-700 text-sm font-light outline-none  m-1 w-full  px-4 py-2 border border-gray-300 rounded-md bg-gray-200"/>
                                    </div>





                                     
                                    
                                {/* Button------------- */}
                                <div className="flex items-center">
                                    {/* <button type='submit' className="items-center mx-auto bg-gradient-to-r from-cyan-400 to-cyan-500 
                                    bg-gradient-to-r hover:from-pink-500
                                    hover:to-yellow-500 my-3 flex
                                    mx-auto w-1/3 rounded-full
                                        my-2 justify-center 
                                        text-white cursor-pointer
                                        font-semibold text-xs p-2">
                                       Request Room
                                    </button> */}
                                      <button onClick={requestFree}
                                      
                                      type='submit' className="items-center mx-auto bg-transparent border border-gray-300 
                                        my-3 flex hover:bg-gray-100
                                        mx-auto w-auto rounded
                                        my-2 justify-center 
                                        text-gray-400 cursor-pointer
                                        font-semibold text-xs p-3">
                                       Request with No Tip
                                    </button>
                                    <button onClick={requestWithTip} type='submit' className="items-center mx-auto bg-gradient-to-r from-cyan-400 to-cyan-500 
                                    bg-gradient-to-r hover:from-pink-500
                                    hover:to-yellow-500 my-3 flex
                                    mx-auto w-auto rounded
                                        my-2 justify-center 
                                        text-white cursor-pointer
                                        font-semibold text-xs p-3">
                                       Request with 30 Tips
                                    </button>
                                </div>

                            
                        
                            

                        </div>
                       
        </div>
        </div>
    )
}

export default ConvoForm;