import { LinkIcon, PlusIcon } from "@heroicons/react/outline";
import {IoMdChatboxes} from 'react-icons/io';

import {Link} from 'react-router-dom';
import Posts from "./Posts.jsx";
import CreatediaryModal from "../Modals/CreatediaryModal.jsx";
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import{SignupForm, LoginForm, VerifyForm} from '../Modals/RegForms.jsx'

function Feed(diaryId, setDiaryId) {
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const[popCreatediary, setpopCreatediary] = useState(false);
    const[popLogin, setpopLogin] = useState(false);
    const[popSignup, setpopSignup] = useState(true);
    console.log(user);
    console.log('yes'); 
   


    

    return (
    
    <div className="bg-transparent overflow-y-scroll">
                    
        {/*==============SIGN UP/ LOGIN =================*/}
        {/* {user && !user.result.verified  ? <VerifyForm popSignup ={popSignup} popLogin = {popLogin} setpopSignup = {setpopSignup}  setpopLogin ={setpopLogin}/> : <></>}
            
             { popSignup && !user ? <SignupForm popSignup ={popSignup} popLogin = {popLogin} setpopSignup = {setpopSignup}  setpopLogin ={setpopLogin}/> : <></>}
             {popLogin && !user ? <LoginForm  popLogin = {popLogin} popSignup ={popSignup}  setpopLogin ={setpopLogin} setpopSignup = {setpopSignup} />: <></>} */}
                <div className="my-4 flex justify-center space-x-10">
                {/* Button */}  

                        {user && user.result.verified == true &&
                            <Link to ='/PostForm'>
                                <div className="bg-gradient-to-r 
                                from-pink-500 to-yellow-500 
                                hover:from-gray-800 hover:to-gray-800
                                flex justify-center 
                                 py-2 text-sm px-5  w-36
                                items-center cursor-pointer space-x-1
                                font-bold rounded-md shadow-xl"
                                    >
                                    
                                    <PlusIcon className=" h-6 text-white"/>
                                    {/* <LinkIcon className=" h-6 text-white"/>   */}
                                    <p className="text-white"> Post</p>
                                    
                                </div>
                            </Link>
                        }

                        {user && user.result.verified == true &&
                        <Link to ='/ChatHunt'>
                            <div className="bg-gradient-to-r 
                            from-cyan-400 to-cyan-500 
                            hover:from-gray-800 hover:to-gray-800
                            flex justify-center 
                                py-2 text-sm px-5  w-36
                            items-center cursor-pointer space-x-1
                            font-bold rounded-md shadow-xl"
                                >
                                
                                <IoMdChatboxes className=" h-6 w-6 text-white"/>  
                                <p className="text-white"> Chat Hunt</p>
                               
                            </div>
                         </Link>
                        }
                           
                    

                </div>

     

            
        
       <Posts diaryId={diaryId} setDiaryId={setDiaryId}/>

      
      
        
    </div>
    )
}

export default Feed;
