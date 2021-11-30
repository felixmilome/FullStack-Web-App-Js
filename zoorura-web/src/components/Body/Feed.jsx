import { LinkIcon, PlusIcon } from "@heroicons/react/outline";

import {Link} from 'react-router-dom';
import Posts from "./Posts.jsx";
import CreatediaryModal from "../Modals/CreatediaryModal.jsx";
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import{SignupForm, LoginForm} from '../Modals/RegForms.jsx'

function Feed(diaryId, setDiaryId) {
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const[popCreatediary, setpopCreatediary] = useState(false);
    const[popLogin, setpopLogin] = useState(false);
    const[popSignup, setpopSignup] = useState(true);
   

    

    return (
    
    <div className="overflow-y-scroll">
                    
        {/*==============SIGN UP/ LOGIN =================*/}

             { popSignup && !user ? <SignupForm popSignup ={popSignup} popLogin = {popLogin} setpopSignup = {setpopSignup}  setpopLogin ={setpopLogin}/> : <></>}
             {popLogin && !user ? <LoginForm  popLogin = {popLogin} popSignup ={popSignup}  setpopLogin ={setpopLogin} setpopSignup = {setpopSignup} />: <></>}
                <div className="flex justify-center">
                {/* Button */}  
                    {/* <OutsideClickHandler onOutsideClick={() => {setpopCreatediary(false);}}>
                        
                            <div className="bg-gradient-to-r bg-gray-700 hover:from-pink-500 hover:to-yellow-500 flex justify-around mx-4 mt-2 sm:mt-4 py-2 text-sm px-5 items-center cursor-pointer  font-bold rounded-full shadow-xl"
                                onClick={ () => {setpopCreatediary(!popCreatediary)}}>
                                <LinkIcon className="p-0.5 h-6 text-white"/>
                                <p className="text-white">Attach Post</p>
                            </div>
                            <div className="flex bg-red-300 justify-center">
                                {popCreatediary && <CreatediaryModal diaryId ={diaryId} setDiaryId ={setDiaryId}/>}
                            </div>
                    </OutsideClickHandler> */}

                   
                   
                            <Link to ='/PostForm'>
                                <div className="bg-gradient-to-r bg-gray-700 
                                hover:from-pink-500 hover:to-yellow-500 
                                flex justify-around mx-4 mt-2 
                                sm:mt-4 py-2 text-sm px-5 
                                items-center cursor-pointer 
                                font-bold rounded-full shadow-xl"
                              // onClick={ () => {setpopCreatediary(!popCreatediary)}}
                                    >
                                    <LinkIcon className="p-0.5 h-6 text-white"/>
                                    <p className="text-white">Attach Post</p>
                                </div>
                            </Link>
                           
                    

                </div>

            
        
       <Posts diaryId={diaryId} setDiaryId={setDiaryId}/>
      
        
    </div>
    )
}

export default Feed;
