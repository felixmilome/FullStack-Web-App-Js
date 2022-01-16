
import{useState, useEffect } from 'react';

import {HiOutlineChatAlt2} from "react-icons/hi"
//import {BsLightningCharge} from "react-icons/bs"
import { XCircleIcon } from "@heroicons/react/outline"




function ConvoForm({miniProfile, user, setpopConvoForm}) {

    

    const handleSubmit = async (e)=>{
        e.preventDefault();

            try{
                console.log('diariesData');

            }
            catch(err){

                console.log(err)

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
                        <div className="bg-transparent border-b-2 items-center border-gray-300">
                           
                            <div className= "relative flex justify-center text-gray-300">
                                <HiOutlineChatAlt2 size={30} />
                                
                                <div onClick ={(e)=> setpopConvoForm(false)} className="absolute right-0 bottom-0 hover:bg-gray-300 p-1 rounded-full cursor-pointer group">
                                <XCircleIcon className= "h-6 w-6 group-hover:text-white text-gray-300"/>
                                </div>
                            </div>

                            <p className="text-center p-3 font-light text-gray-500 ">Create Private Chat Room with @{miniProfile.userName}</p>
                           
                        </div>

                    {/*----- FORM------------------------- */}
                    <form onSubmit={handleSubmit}>

                        <div className= "flex justify-center items-center p-0.5 space-x-1">
                            <img src={miniProfile.dpUrl} alt="DP" className="rounded-full h-10 w-10"/>
                            {/* <BsLightningCharge size={40} className="text-gray-400"/> */}
                            <img src={user.result.dpUrl} alt="DP" className="rounded-full h-10 w-10"/>
                        </div>

                        <div className="">
            

                                       {/*-- Title------------ */}
                                       <div className="flex justify-center">
                                        <input name= "title"

                                        placeholder="Enter Room Name" className="text-gray-700 font-medium outline-none  mx-4 my-3 w-full px-4 p-1 sm:py-2 border border-gray-300 rounded-md bg-gray-200"/>
                                    </div>
                                {/* ---Content---------------  */}
                                    <div className="px-3 items-center flex justify-center">
                                        <textarea name= "caption"
                                        placeholder="Message" className="resize-none text-gray-700 text-base font-light outline-none  m-1 w-full  px-4 py-2 border border-gray-300 rounded-md bg-gray-200"/>
                                    </div>





                                     
                                    
                                {/* Button------------- */}
                                    <button type='submit' className="items-center mx-auto bg-gradient-to-r from-cyan-400 to-cyan-500 
                                    bg-gradient-to-r hover:from-pink-500
                                    hover:to-yellow-500 my-3 flex
                                    mx-auto w-1/3 rounded
                                        my-2 justify-center 
                                        text-white cursor-pointer
                                        font-semibold text-base p-2">
                                       Create Room
                                    </button>

                            
                        
                            

                        </div>
                        </form>
        </div>
        </div>
    )
}

export default ConvoForm;