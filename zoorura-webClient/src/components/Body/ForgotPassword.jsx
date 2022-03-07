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

import {forgotPasswordAction} from "../Midwares/rdx/actions/profileAction.js";
import * as axs from "../Midwares/rdx/actions/axs.js"
import {Link} from 'react-router-dom';


const changePasswordSchema = yup.object().shape({
   
    email: yup.string().strict(false).trim().email("email must be valid").required('email required').min(5).max(40),
    password: yup.string().required('password required').matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "no spaces").min(5).max(25),
    confirmPassword: yup.string().strict(false).trim().oneOf([yup.ref("password"), null]),

    }

);


export const ForgotPassword = () => {
  
    const[visible, setVisible] = useState (false);
    const[visibleError, setVisibleError] = useState (false);
    const[visibleSuccess, setVisibleSuccess] = useState (false);

    const[loading, setLoading] = useState (false);

    const [forgotPassFormData, setForgotPassFormData] = useState({email:'', password: '', confirmPassword:''});
   
    const dispatch = useDispatch();
    
    const forgotPassFeedback = useSelector((state) => state.forgotPasswordReducer);

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(changePasswordSchema),
    });
  
    const forgotPassSubmit = () =>{ 
        setLoading(true);      
       dispatch(forgotPasswordAction (forgotPassFormData, setVisibleError,setVisibleSuccess, setLoading)); 
    } 

   
   
  return (
      
    
        
    <div className="fixed text-gray-600 font-bold top-12 sm:top-16 bg-gray-300 pt-8 pb-48 left-0 w-full flex justify-center z-50 h-screen overflow-y-scroll">
                    
        {/* ============Floating Box======== */}

        <div className='m-auto bg-transparent w-full'>

            <div className="m-auto p-4 w-full lg:w-2/5 bg-gray-200 rounded-md shadow-xl m-2">
            
            <form onSubmit={handleSubmit(forgotPassSubmit)}>

                     {/*========= Security Settings=============== */}
                       <div className ='pt-3 justify-center items-center'>
                                              
                             {/*========= Security Settings=============== */}
                            <div className= "flex items-center justify-around">
                                <MdSecurity size={20} className= "text-gray-500"/> 
                            </div> 
                            <div className="p-1 text-center bg-transparent">
                                    <p>Change/Forgot Password Settings</p>                                                                         
                            </div>

                            { forgotPassFeedback && visibleError && 
                        
                        <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-red-700'>
                            <div className= 'flex p-2 m-2 rounded-md bg-red-100 text-xs' > 
                                 <p>{forgotPassFeedback}</p>
                            </div>
                         </div>
                         }
                            { forgotPassFeedback && visibleSuccess && 
                        
                        <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-green-700'>
                            <div className= 'flex p-2 m-2 rounded-md bg-green-100 text-xs' > 
                                 <p>{forgotPassFeedback}</p>
                            </div>
                         </div>
                         }

                          
                        </div>


                     {/*========= Security Settings Inputs=============== */}
                    <div className="p-3 text-sm space-y-1">
            
                            

                            {/* Email*/}
                            <div className= " flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>Your Email:</p>
                                <div className='relative w-3/4'>
                                    <input  {...register('email',{
                                    onChange:(e)=>{
                                        setForgotPassFormData({...forgotPassFormData, email:e.target.value.trim()});
                                        setVisibleError(false);
                                    }
                                    })}
                                 
                                    name='email' className= "w-full bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "Email"/>
                                    <p className='text-xs text-red-700 font-light' >{errors.email?.message}</p>
                                    </div>
                                </div>
                            </div>



            
                 
                    
                            {/* Password*/}
                            <div className= "flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                <p className='text-sm font-semibold text-gray-600'>New Password:</p>
                                <div className='relative items-center w-1/2 bg-transparent'>
                                    <input  {...register('password',{ 
                                        onChange: (e)=>{
                                        setForgotPassFormData({...forgotPassFormData, password:e.target.value});
                                        setVisibleError(false);
                                    }
                                    })}
                                    name='password' className= "bg-gray-100 border border-gray-300 p-2 w-full rounded-md" type={visible ? "text" : "password"} placeholder= "Change Password"/>
                                    <p className='text-xs text-red-700 font-light' >{errors.password?.message}</p>
                                    <div onClick = {(e)=>setVisible (!visible)} className='bg-transparent absolute top-2.5 right-3 text-gray-400 cursor-pointer hover:text-cyan-500 text-xs text-center font-light '>{visible ? <BsEyeSlashFill size={20}/> : <BsEyeFill size={20}/>}</div>
                                </div>
                                </div>
                            </div>


                            {/* ConfirmPassword*/}
                             <div className= "flex justify-between relative w-full">
                                <div className='flex justify-between items-center w-full'>
                                    <p className='text-sm font-semibold text-gray-600'>Confirm New Password:</p>
                                    <div className='relative items-center w-1/2 '>
                                        <input  {...register('confirmPassword',{ 
                                            onChange: (e)=> {
                                                setVisibleError(false); 
                                                setForgotPassFormData({...forgotPassFormData, confirmPassword:e.target.value});          
                                        }
                                        })}
                                        name='confirmPassword' className= "bg-gray-100 border border-gray-300 p-2 w-full rounded-md" type={visible ? "text" : "password"} placeholder= "Confirm Password"/>
                                    <p className='text-xs text-red-700 font-light' >{forgotPassFormData.password.trim() !== forgotPassFormData.confirmPassword.trim() && "Passwords Should Match"}</p>
                                    <div onClick = {(e)=>setVisible (!visible)} className='bg-transparent absolute top-2.5 right-3 text-gray-400 cursor-pointer hover:text-cyan-500 text-xs text-center font-light '>{visible ? <BsEyeSlashFill size={20}/> : <BsEyeFill size={20}/>}</div>
                                </div>
                                </div>
                            </div>
                            
                    
                          

                      

                           
        
                    </div>
                

                    <div className='flex justify-between'>

                       <button 

                            type= {loading === false ? 'submit' : 'button'} className=" flex items-center px-4 py-2 mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                                bg-gradient-to-r hover:from-pink-500
                                hover:to-yellow-500 flex
                                mx-auto rounded-full
                                    justify-center 
                                    text-white text-sm cursor-pointer
                                    font-semibold p-1  space-x-1">
                                     <MdSecurity size={20} className= "text-gray-100"/>
                                
                                {loading === false ? <p>change Password</p> : <BeatLoader size={10} color='white' loading/>}

                            </button>
                        
                        
                            
                    </div>
                    
            </form>
            </div>
          
            </div>
        </div>
        
  )
}

