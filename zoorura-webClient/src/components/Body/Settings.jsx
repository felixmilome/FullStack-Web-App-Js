import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineCancel, MdSecurity } from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import {BsEyeFill,BsEyeSlashFill} from "react-icons/bs";
import {BeatLoader} from "react-spinners";

import {BsCheck2Circle} from "react-icons/bs";
import { DpCropper } from "./DpCropper.jsx";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

import { editProfileAction, editSecurityAction} from "../Midwares/rdx/actions/profileAction.js";
import * as axs from "../Midwares/rdx/actions/axs.js"
import {Link} from 'react-router-dom';

const profileSchema = yup.object().shape({
   
    userName: yup.string().strict(false).trim().required('username required').matches(/^\d*[a-zA-Z][a-zA-Z\d]*$/, "letters or letters+number for username").min(2).max(30),
    bio: yup.string().strict(false).trim().required('Bio required').min(1).max(150),
    convoTip: yup.number().required('Convo Charge cant be empty. Set between 0-100').typeError('must be a number').min(0, "no negative numbers").max(100, "set below 100").test(
        'no decimals',
        'no decimals allowed',
        value => (value + "").match(/^(0|[1-9]\d*)$/),
      ),
 
}); 
const securitySchema = yup.object().shape({
   
    email: yup.string().strict(false).trim().email("email must be valid").required('email required').min(3).max(40),
    currentPassword: yup.string().required('current password required'),
    
    password:yup.string().nullable().notRequired().when('password', {
        is: (value) => value?.length,
        then:(rule)=> rule.matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "no spaces").min(5).max(25),
        }),

    confirmPassword: yup.string().strict(false).trim().oneOf([yup.ref("password"), null]),


    },

['password', 'password'],

);  


function emailIsValid (email) {
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length > 3 && email.length <41); 
}
function userNameIsValid (userName) {
    return (/^\d*[a-zA-Z][a-zA-Z\d]*$/.test(userName) && userName.length > 1 && userName.length <31 );
}



export const Settings = () => {
    const[dpCropper, setdpCropper] = useState(false);

    const[visible, setVisible] = useState (false);
    const[visibleErrorProfile, setVisibleErrorProfile] = useState (false);
    const[passwordInput, setPasswordInput] = useState (false);
    const[visibleSuccessProfile, setVisibleSuccessProfile] = useState (false);
    const[loadingProfile, setLoadingProfile] = useState (false);

    const[visibleErrorSecurity, setVisibleErrorSecurity] = useState (false);
    const[visibleSuccessSecurity, setVisibleSuccessSecurity] = useState (false);
    const[loadingSecurity, setLoadingSecurity] = useState (false);

    const [emailCheck, setEmailCheck] = useState(null);
    const [userNameCheck, setUserNameCheck] = useState(null);

    const[profileChanged, setProfileChanged] = useState(false);
    const[securityChanged, setSecurityChanged] = useState(false);
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [profileFormData, setProfileFormData] = useState({userName:user.result.userName, bio: user.result.bio, convoTip: user.result.convoTip});
    const [securityFormData, setSecurityFormData] = useState({email:user.result.email, password: '', confirmPassword:'', currentPassword:''});
   
    const dispatch = useDispatch();
    
    const profileFeedback = useSelector((state) => state.profileResetReducer);
    const securityFeedback = useSelector((state) => state.securityResetReducer);

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(profileSchema),
        resolver: yupResolver(securitySchema),
    });
  
    
    useEffect(() => {
        if (user.result.userName === profileFormData.userName
             && user.result.bio === profileFormData.bio
              && user.result.convoTip == profileFormData.convoTip){
        setProfileChanged(false);
        } else {
            setProfileChanged(true);
        }
    }, [profileFormData.userName, profileFormData.bio, profileFormData.convoTip]);


    useEffect(() => {
        if (user.result.email === securityFormData.email){
            setSecurityChanged(false);
        } else {
            setSecurityChanged(true);
        }
    }, [securityFormData.email]);

    const checkEmail = async() => {
        if(securityFormData.email && emailIsValid(securityFormData.email)){
            try{
                const {data} = await axs.checkEmailApi(securityFormData.email);
                setEmailCheck (data);
                console.log(data); 
            }catch(error){
                console.log(error);
            }  
        } else{
            return;
        } 
    } 

    const checkUsername = async () => {
        if(profileFormData.userName && userNameIsValid(profileFormData.userName)){
            try{
               
                console.log(profileFormData.userName);
                const {data} = await axs.checkUsernameApi(profileFormData.userName);
                console.log(data);
                setUserNameCheck (data); 
                console.log(userNameCheck); 
                
            }catch(error){
                console.log(error);
            } 
        } else{
            console.log('empty');
        }
    } 

    const submitProfile = (e) =>{ 
       
        setLoadingProfile(true);
       
        dispatch(editProfileAction (profileFormData, setVisibleErrorProfile, setVisibleSuccessProfile, setLoadingProfile)); 
    } 
    const submitSecurity = (e) =>{ 

        setLoadingSecurity(true);
        
       dispatch(editSecurityAction (securityFormData, setVisibleErrorSecurity, setVisibleSuccessSecurity, setLoadingSecurity)); 
    } 
    //   const handleSubmit = () =>{ 
    //     console.log('c')
    // } 
 
  

 
    
   
  return (
      <>
       { dpCropper &&
        <DpCropper dpCropper={dpCropper} setdpCropper ={setdpCropper}/>
        }
        
    <div className="fixed text-gray-400 font-bold top-12 bg-transparent pt-8 pb-48 left-0 w-full flex justify-center z-20 max-h-screen overflow-y-scroll">
                    
        {/* ============Floating Box======== */}

        

            <div className="w-full lg:w-2/5 bg-gray-100 rounded-md shadow-xl m-2 h-full">
            
            <form onSubmit={handleSubmit(submitProfile)} className='border-b border-gray-300 m-1'>
  
                      
                    
                        {/* { loggedUser && visibleSuccessProfile &&
                       <div className= ' bg-transparent flex justify-center items-center font-bold text-sm text-white'>
                           <div className= 'flex p-2 m-2 rounded-md bg-green-400 text-xs' > 
                                <p>{loggedUser}</p>
                           </div>
                        </div>
                        } */}
                        <div className ='flex p-3 bg-gray-200 justify-center items-center'>
                                              
                             {/*========= Profile & Security Settings=============== */}
                            <div className= "flex items-center justify-around">
                                <CgProfile size={20} className= "text-gray-400"/>
                            </div> 
                            <div className="p-1 text-center bg-transparent">
                                    <p>Profile Settings</p>                        
                            </div>
                           
                        </div>
 
         


                        {/*========= Profile Settings=============== */}
                    <div className="p-3 text-sm space-y-1"> 
                    { profileFeedback && visibleErrorProfile &&
                       <div className= ' bg-transparent flex justify-center items-center font-bold text-sm text-white'>
                           <div className= 'flex p-2 m-2 rounded-md bg-red-400 text-xs' > 
                                <p>{profileFeedback}</p>
                           </div>
                        </div>
                        }
                        { profileFeedback && visibleSuccessProfile &&
                       <div className= ' bg-transparent flex justify-center items-center font-bold text-sm text-white'>
                           <div className= 'flex p-2 m-2 rounded-md bg-green-400 text-xs' > 
                                <p>{profileFeedback}</p>
                           </div>
                        </div>
                        }
                        
                        <div className='flex items-center justify-left'>
                             <p className='text-sm font-semibold text-gray-600'>Profile Picture:</p>
                            <div onClick={()=>{setdpCropper(true)}} className='flex sm:m-0 ml-3 w-full cursor-pointer hover:bg-gray-200 border border-gray-300 justify-center space-x-2 p-2 rounded-md items-center bg-gray-100 space-x-1'>                              
                                    <img src={user.result.dpUrl} alt="DP" className="rounded-full h-8 w-8 sm:h-10 sm:w-10"/>                   
                                    <p>Change Picture</p>                       
                            </div>
                        </div>

                            {/* UserName*/}
                            <div className= "flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>Username:</p>
                                <div onBlur= {checkUsername} onChange={(e)=>setUserNameCheck(null)}
                                    className="w-3/4 sm:w-5/6">
                                    <input  {...register('userName',{
                                    onChange: (e) => {
                                        setProfileFormData({...profileFormData, userName:e.target.value.trim()});
                                        setVisibleErrorProfile(false);
                                    }
                                    })}
                                    value= {profileFormData.userName}
                                    name='userName' className= "w-full bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "Change Username"/>
                                    <p className='text-xs text-red-700 font-light' >{errors.userName?.message}</p>

                                    <div className='bg-transparent absolute top-2.5 right-2 text-gray-500 text-xs text-center font-light '>
                                        <div className ='flex text-red-500'>
                                            {userNameCheck === "usernameExists" && user.result.userName !== profileFormData.userName && <><MdOutlineCancel size ={16}/>: username taken</>} 
                                        </div>
                                    </div>
                               
                                </div>
                                </div>
                            </div>

                             
                            {/*Bio*/}
                            <div className= "flex justify-between relative w-full pb-2">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>Bio:</p>
                                <div className='w-3/4 sm:w-5/6'>
                                        <textarea {...register('bio',{
                                        onChange: (e) => {setProfileFormData({...profileFormData, bio:e.target.value})}
                                        })}
                                        value= {profileFormData.bio}
                                        name='bio' className= "w-full resize-none bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "Change Bio"/>
                                        <p className='text-xs text-red-700 font-light' >{errors.bio?.message}</p>
                               </div>
                                </div>
                            </div>
                             {/*ConvoTip*/}
                            <div className= "flex justify-between relative w-full pb-2">
                                <div className='flex justify-left space-x-2 items-center w-full'>
                                    <div>
                                    <p className='text-sm font-semibold text-gray-600'>Convo Request Tip Charge</p>
                                    <p>(0-999):</p>
                                    </div>
                                    <div>
                                        <input {...register('convoTip',{
                                        onChange: (e) => {setProfileFormData({...profileFormData, convoTip:e.target.value})}
                                        })}
                                        value= {profileFormData.convoTip}
                                        name='convoTip' className= "w-1/3 bg-gray-100 border border-gray-300 p-2 rounded-md " type="number" placeholder= "Change Convo Request Tip Charge "/>
                                         <p className='text-xs text-red-700 font-light' >{errors.convoTip?.message}</p>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className='flex justify-between'>
                            {profileChanged ===true && 
                            <button 
                            type= {loadingProfile===false ? 'submit' : 'button'} className=" flex items-center px-4 py-2 mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                                bg-gradient-to-r hover:from-pink-500
                                hover:to-yellow-500 flex
                                mx-auto rounded-full
                                    justify-center 
                                    text-white text-sm cursor-pointer
                                    font-semibold p-1 mb-4 space-x-1">
                                     <CgProfile size={20} className= "text-gray-100"/>
                                
                                     {loadingProfile === false ? <p>Submit Profile Changes</p> : <BeatLoader size={10} color='white' loading/>}

                            </button>}


                            {profileChanged === false && <button 
                            
                            
                            type='button' className=" flex items-center px-4 py-2 mx-auto border border-gray-300 text-gray-400 
                              flex
                                mx-auto rounded-full
                                    justify-center 
                                    text-white text-sm cursor-pointer
                                    font-semibold p-1 mb-4 space-x-1">
                                     <CgProfile  size={20} className= ""/>
                                
                                <p>Submit Profile Changes</p> 

                            </button>}
                        
                        
                            
                    </div>
                    
            </form>

            <form onSubmit={handleSubmit(submitSecurity)} className='border-b border-gray-300 m-1'>



                     {/*========= Security Settings=============== */}
                       <div className ='p-3 bg-gray-200 justify-center items-center'>
                                              
                             {/*========= Security Settings=============== */}
                            <div className= "flex items-center text-center justify-center space-x-1">
                                <MdSecurity size={20} className= "text-gray-400"/>
                                <p>Security Settings</p>    
                            </div> 
                         

                            { securityFeedback && visibleErrorSecurity && 
                        
                        <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-red-700'>
                            <div className= 'flex p-2 m-2 rounded-md bg-red-100 text-xs' > 
                                 <p>{securityFeedback}</p>
                            </div>
                         </div>
                         }
                         { securityFeedback && visibleSuccessSecurity &&
                        <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-green-700'>
                            <div className= 'flex p-2 m-2 rounded-md bg-green-100 text-xs' > 
                                 <p>{securityFeedback}</p>
                            </div>
                         </div>
                         }
                          
                        </div>



                        
                           {/* CurrentPassword*/}
                           <div className= "flex mb-4 justify-between  w-full">
                                <div className='m-auto bg-transparent items-center w-2/3 sm:w-1/2'>

                                
                                  
                                            {/* <p className='text-sm font-semibold text-red-400'>Current Password Required</p> */}
                                            <input   {...register('currentPassword',{       
                                                onChange: (e)=>{
                                                setSecurityFormData({...securityFormData, currentPassword:e.target.value}); 
                                                setVisibleErrorSecurity(false);
                                            }
                                            })}
                                            name='currentPassword' className= "w-full  bg-gray-100 border border-gray-300 p-2 m-1 rounded-md"
                                             type={visible ? "text" : "password"} placeholder= "Current Password First"/>
                                             
                                             <p className='text-xs text-red-700 font-light' >{errors.currentPassword?.message}</p>
                                            <Link to= '/forgotPassword'>
                                             <div className= 'bg-gray-100 flex justify-center text-xs font-light cursor-pointer hover:bg-gray-200'>
                                            <p>Forgot Password?</p>
                                            </div>
                                            </Link>

                                            <div onClick = {(e)=>setVisible (!visible)} className='flex items-center space-x-1 justify-center bg-transparent 
                                            text-gray-400 cursor-pointer hover:text-cyan-500 text-xs
                                            text-center font-light m-1 '>{visible ? 
                                            <><BsEyeSlashFill size={20}/> <p>view passwords</p> </>
                                            : <><BsEyeFill size={20}/><p>hide passwords</p> </>}
                                            </div>
                                       
                                </div>
                                    
                            </div>


                     {/*========= Security Settings Inputs=============== */}
                    <div className="p-3 text-sm space-y-1">
            
                            

                            {/* Email*/}
                            <div className= "mb-5 flex justify-between relative w-full">
                                <div onBlur= {checkEmail} onChange={(e)=>setEmailCheck(null)} className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>Email:</p>
                                <div className='relative w-3/4'>
                                    <input  {...register('email',{
                                    onChange:(e)=>{
                                        setSecurityFormData({...securityFormData, email:e.target.value.trim()});
                                    setSecurityChanged(true);
                                    setVisibleErrorSecurity(false);
                                    }
                                    })}
                                    value= {securityFormData.email}
                                    name='email' className= "w-full bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "Email"/>
                                    <p className='text-xs text-red-700 font-light' >{errors.email?.message}</p>
                                    <div className='bg-transparent absolute top-2.5 right-1 text-gray-500 text-xs text-center font-light '>
                                            <div className ='flex text-red-500'>
                                                {emailCheck === "emailExists" && user.result.email !== securityFormData.email && <><MdOutlineCancel size ={16}/>: email taken</>} 
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>



                    <div className='flex items-center bg-transparent justify-between'>

                    <p className='text-sm font-semibold text-gray-600'>Change Password?</p>
                            <button onClick= {()=>setPasswordInput(!passwordInput)}
                            type= "button" className=" flex items-center px-4 py-2 mx-auto bg-transparent
                                
                                hover:bg-gray-200 flex
                                mx-auto rounded-md
                                    justify-center 
                                    text-gray-500 text-xs border border-gray-300 cursor-pointer
                                    font-semibold p-1 space-x-1">
                                     <MdSecurity size={20} />
                                
                                     {passwordInput === false ? <p>Click for Yes </p> :<p> Click for No</p> }

                            </button>
                        
                        
                            
                    </div>
                    {passwordInput === true &&
                    <>
                            {/* Password*/}
                            <div className= "flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>New Password:</p>
                                <div className='items-center w-1/2 bg-transparent'>
                                    <input  {...register('password',{ 
                                        onChange: (e)=>{
                                        setSecurityFormData({...securityFormData, password:e.target.value});
                                        setSecurityChanged(true);
                                        setVisibleErrorSecurity(false);
                                    }
                                    })}
                                    name='password' className= "bg-gray-100 border border-gray-300 p-2 rounded-md" type={visible ? "text" : "password"} placeholder= "Change Password"/>
                                    <p className='text-xs text-red-700 font-light' >{errors.password?.message}</p>
                                </div>
                                </div>
                            </div>


                            {/* ConfirmPassword*/}
                             <div className= "flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                    <p className='text-sm font-semibold text-gray-600'>Confirm New Password:</p>
                                    <div className='items-center w-1/2 bg-transparent'>
                                        <input  {...register('confirmPassword',{ 
                                            onChange: (e)=> {
                                            setSecurityFormData({...securityFormData, confirmPassword:e.target.value});
                                            setSecurityChanged(true);
                                            setVisibleErrorSecurity(false);
                                        }
                                        })}
                                        name='confirmPassword' className= "bg-gray-100 border border-gray-300 p-2 rounded-md" type={visible ? "text" : "password"} placeholder= "Confirm Password"/>
                                    <p className='text-xs text-red-700 font-light' >{securityFormData.password.trim() !== securityFormData.confirmPassword.trim() && "Passwords Should Match"}</p>
                                    
                                </div>
                                </div>
                            </div>
                            </>
                    }
                          

                      

                           
        
                    </div>
                

                    <div className='flex justify-between'>
                           {securityChanged ===true && <button 
                            
                            
                            type= {loadingSecurity === false ? 'submit' : 'button'} className=" flex items-center px-4 py-2 mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                                bg-gradient-to-r hover:from-pink-500
                                hover:to-yellow-500 flex
                                mx-auto rounded-full
                                    justify-center 
                                    text-white text-sm cursor-pointer
                                    font-semibold p-1 mb-4 space-x-1">
                                     <MdSecurity size={20} className= "text-gray-100"/>
                                
                                {loadingSecurity === false ? <p>Submit Security Changes</p> : <BeatLoader size={10} color='white' loading/>}

                            </button>}

                            {securityChanged=== false && <button 
                            
                            
                            type='button' className=" flex items-center px-4 py-2 mx-auto border border-gray-300 text-gray-400 
                              flex
                                mx-auto rounded-full
                                    justify-center 
                                    text-white text-sm cursor-pointer
                                    font-semibold p-1 mb-4 space-x-1">
                                     <MdSecurity size={20} className= ""/>
                                
                                <p>Submit Security Changes</p> 

                            </button>}
                        
                        
                            
                    </div>
                    
            </form>
            </div>
          

        </div>
        </>
  )
}

