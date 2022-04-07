import { LinkIcon, PlusIcon } from "@heroicons/react/outline";

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
                <div className="my-4 flex justify-center">
                {/* Button */}  

                        {user && user.result.verified == true &&
                            <Link to ='/PostForm'>
                                <div className="bg-gradient-to-r 
                                from-pink-500 to-yellow-500 
                                hover:from-cyan-500 hover:to-yellow-500
                                flex justify-around  
                                 py-2 text-sm px-5  
                                items-center cursor-pointer 
                                font-bold rounded-full shadow-xl"
                                    >
                                    
                                    <PlusIcon className=" h-6 text-white"/>  
                                    <p className="text-white"> Post</p>
                                    <LinkIcon className=" h-6 text-white"/>
                                </div>
                            </Link>
                        }
                           
                    

                </div>

     

            
        
       <Posts diaryId={diaryId} setDiaryId={setDiaryId}/>

      
      
        
    </div>
    )
}

export default Feed;
