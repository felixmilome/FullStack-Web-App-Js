
import{useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import { postConvosAction } from "../Midwares/rdx/actions/convosAction.js";

import {HiOutlineChatAlt2} from "react-icons/hi";
import {ImHappy2} from 'react-icons/im';
import {FaSadTear} from "react-icons/fa";

//import {BsLightningCharge} from "react-icons/bs"
import { XCircleIcon } from "@heroicons/react/outline"
import {BeatLoader, DotLoader} from "react-spinners";
import { getWalletAction } from '../Midwares/rdx/actions/walletAction';

 


function ConvoForm({miniProfile, user, setpopConvoForm}) { 
    
  
    const[tipConvoData, setTipConvoData] = useState({host: user.result._id, guest: miniProfile._id, members: [user.result._id, miniProfile._id], type:'2', tip: 0, intro:''}); 
   // const[freeConvoData, setFreeConvoData] = useState({host: user.result._id, guest: miniProfile._id, members: [user.result._id, miniProfile._id], type:'2', tip:0, intro:''});
    //const[messageData, setmessageData] = useState({convoId: user.result._id, senderId: user.result._id, receiverId: miniProfile._id, body:'', type:'text'});
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    const socket = useSelector((state) => state.socketReducer);
    const walletBalance = useSelector((state) => state.walletReducer);

    // const requestFreeConvo = async ()=>{ 
        

    //     try{ 
    //         setLoading(true);
    //         dispatch(postConvosAction (freeConvoData, setLoading, setpopConvoForm, socket)); 
    //         console.log(freeConvoData);
    //     }
    //     catch(err){
    //         console.log(err);
    //     }

    // }
    console.log(miniProfile);
    console.log(user)
   
    useEffect(() => {
      
        dispatch(getWalletAction()); 
   
    }, []); 

    const requestTipConvo = async ()=>{
        

            try{ 
                setLoading(true);
                dispatch(postConvosAction (tipConvoData, setLoading, setpopConvoForm, socket)); 
                console.log(tipConvoData);
            }
            catch(err){
                console.log(err);
            }
            
    }
    return (
        
        <div className="w-96 z-30 border border-gray-200 bg-gray-200 rounded-md flex items-center justify-center">

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
                            <p className="">Start Chat With: </p>
                           
                            <p className="font-bold">@{miniProfile.userName}</p>
                            
                            {/* {miniProfile?.convoRequesters.includes(user.result._id) && 
                            <p className="">Again</p> 
                            } */}
                            </div>
                           
                        </div>

                    {/*----- FORM------------------------- */}
                  

                        <div className= "flex justify-center items-center p-0.5 space-x-1">
                            
                            <img src={miniProfile?.dpUrl} alt="DP" className="rounded-full h-8 w-8"/>
                            {/* <BsLightningCharge size={40} className="text-gray-400"/> */}
                            <img src={user?.result?.dpUrl} alt="DP" className="rounded-full h-8 w-8"/>
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
                            
                                            setTipConvoData({...tipConvoData, intro: e.target.value});
                                            //setFreeConvoData({...freeConvoData, intro: e.target.value});

                                         }}
                                        
                                        placeholder="Enter Intro Message" className="resize-none h-28 text-gray-700 text-sm font-light outline-none  m-1 w-full  px-4 py-2 border border-gray-300 rounded-md bg-gray-200"/>
                                    </div>

                                    {/* ---Check Tip---------------  */}

                                    {tipConvoData.intro.length >0 &&
                                    <>
                                    <div className="pt-3 items-center font-bold text-sm text flex justify-center">
                                        <div onClick={(e) =>  {

                                                console.log(tipConvoData);

                                                    if (tipConvoData.tip === miniProfile.convoTip){ 
 
                                                        setTipConvoData({...tipConvoData, tip:0});

                                                    } else if(tipConvoData.tip === 0) {

                                                        setTipConvoData({...tipConvoData, tip:miniProfile.convoTip});  

                                                    }
                                                    
                                                    }
                                                } className='cursor-pointer'>
                                            <input className= "bg-gray-100" type="checkbox"/>
                                         </div>
                                            <p className= 'ml-2'> Send {miniProfile.convoTip} Tips (Optional)</p>
                                           

                                    </div>

                                    <div className="py-1 text-gray-800 font-light text-xs items-center m-auto text-center">
                                           <p>* Tipping Motivates One to Chat with You </p>
                                           <div className='m-auto w-max  text-xs font-semibold rounded-md px-2 text-gray-900'>
                                                <p>Wallet Balance: {walletBalance.zbx} zbx</p>
                                            </div>

                                   </div>
                                   
                                   </>}


                                     
                                    
                                {/* Button------------- */}
                                {tipConvoData.intro.length >0 &&
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
                                      {loading === false &&
                                      <>
                                      {/* <button onClick={requestFreeConvo}
                                      
                                      type='submit' className="items-center mx-auto bg-transparent border border-gray-300 
                                        my-3 flex hover:bg-gray-100
                                        mx-auto w-auto rounded
                                        my-2 justify-center 
                                        text-gray-400 cursor-pointer
                                        font-semibold text-xs p-3">
                                      
                                       {miniProfile?.convoRequesters.includes(user.result._id) ? "Request Again Without Tip" : " Request with No Tip"}
                                    </button> */}
                                  
                                   
                                    <button onClick={requestTipConvo} type='submit' className={`items-center mx-auto 
                                     ${tipConvoData.tip===0 && 'bg-gradient-to-r from-cyan-300 to-cyan-400'} 
                                     ${tipConvoData.tip>0 && 'bg-gradient-to-r from-teal-400 to-teal-500'} 
                                     bg-gradient-to-r hover:from-pink-500
                                    hover:to-yellow-500 my-3 flex
                                    mx-auto w-auto rounded-full
                                        my-2 justify-center 
                                        text-white cursor-pointer
                                        font-semibold text-xs p-3`}>
                                            
                                            
                                            
                                            {tipConvoData.tip===0 ? <FaSadTear className='mx-1' size={20}/> : <ImHappy2 className='mx-1' size={20}/>}
                                       {/* {miniProfile?.convoRequesters.includes(user.result._id) ? "Request Again With " + miniProfile.convoTip + " Tip" : "Request With " + miniProfile.convoTip + " Tips"} */}
                                       {tipConvoData.tip===0 ? 'Start With No Tips' : `Start With ${tipConvoData.tip} Tips`}
                                       
                                       
                                    </button>
                                    

                                    </>
                                    }
                                    {loading === true &&
                                      <div className='flex space-x-3 items-center text-cyan-600 justify-center w-full text-sm'>
                                      
                                         <BeatLoader size={15} color='gray' loading/>
                                    </div>
                                    }

                                </div>}

                            
                        
                            

                        </div>
                       
            </div>
        </div>
    )
}

export default ConvoForm;