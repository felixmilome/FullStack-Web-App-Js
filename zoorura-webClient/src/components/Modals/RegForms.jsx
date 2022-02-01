
import {GoogleLogin} from 'react-google-login';
import {FcGoogle } from "react-icons/fc";
import {BsEyeFill,BsEyeSlashFill, BsCheck2Circle} from "react-icons/bs";
import { MdOutlineCancel, } from "react-icons/md";
import {useDispatch} from 'react-redux';
import{useNavigate} from 'react-router-dom';
import{useState} from 'react';

import {loginAction, registerAction, verifyAction} from '../Midwares/rdx/actions/auth.js';

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as axs from "../Midwares/rdx/actions/axs.js"

const signUpSchema = yup.object().shape({
    firstName: yup.string().required('first name required').min(2).max(15),
    lastName: yup.string().required('last name required').min(2).max(15),
    userName: yup.string().required('username required').min(2).max(30),
    email: yup.string().email().required('email required').min(3).max(40),
    password: yup.string().required('password required').min(5).max(25),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

                                     


export const SignupForm = ({setpopSignup, setpopLogin}) => {
    
    
    const[visible, setVisible] = useState (false);
   // const[passInputType, setPassInputType] = useState ('password');
   // const[passIcon, setPassIcon] = useState (<BsEye/>);
   

    

    const [formData, setFormData] = useState ({firstName: '', lastName: '', userName: '', email: '', password: '', confirmPassword: '', isChecked: false});
    const dispatch = useDispatch();
   const navigate = useNavigate();
    const [emailCheck, setEmailCheck] = useState(null);
    const [userNameCheck, setUserNameCheck] = useState(null);
   const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const checkEmail = async() => {
        if(formData.email){
            try{
                console.log(formData.email);
                const {data} = await axs.checkEmailApi(formData.email);
                
                setEmailCheck (data);
                console.log(data); 
            }catch(error){
                console.log(error);
            } 
        } else{
            console.log('empty');
        } 
    } 
    const checkUsername = async () => {
        if(formData.userName.length){
            try{
               
                console.log(formData.userName);
                const {data} = await axs.checkUsernameApi(formData.userName);
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

    function switchLogin () {
        
        setpopLogin(true);

        setpopSignup(false);
        
    }

    const googleSuccess = async (res) =>{
        
        const result = res?.profileObj;

        const token = res?.tokenId;

        try{

            dispatch ({type: 'GOOGLE_SIGNUP', data: {result, token}});
            setpopSignup(false);
            navigate('/');
            window.location.reload(true);

        } catch (error){
            console.log(error);
        } 

    };
    const googleFailure = () =>{

        console.log('Google Sign In was unsuccessful');

    };
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const signUp = (data) => {
        //e.preventDefault();
        if(formData.isChecked === true && emailCheck === 'noEmail' && userNameCheck === 'noUsername'){
            
        console.log(data);
          try{ 
            dispatch(registerAction(data, navigate));
           
        } catch (error){
            console.log(error);
        }
        }
        else{
            console.log('not agreed');
        }
        
    }

    return (
        <div className="fixed text-gray-600 font-bold top-16 bg-transparent pt-8 pb-48 left-0 w-full flex justify-center z-50 max-h-screen overflow-y-scroll">
             
        {/* ============Floating FORM BOX ======== */}

        

            <div className="w-full lg:w-2/5 bg-gray-100 rounded-md shadow-xl m-2 h-full">
                 <form onSubmit={handleSubmit(signUp)}>
                        <div className= "pt-3 pb-1 flex items-center justify-around">
                            <img src="./assets/images/whitelogo.png" alt="DP" className="rounded-full h-8 w-8 sm:h-10 sm:w-10"/>
                        </div>  
                        <div className="p-1 text-center bg-transparent">
                            <p>Register New Account</p>
                            <div className="p-1 font-light text-xs flex justify-center items-center space-x-1"> 
                               <div>
                                   Already have an account?
                               </div>
                                <div onClick={switchLogin} className="bg-gray-100 border border-gray-400 text-gray-500 cursor-ponter hover:bg-white font-semibold p-1 rounded">
                                <p className="cursor-pointer"> Log In </p>
                                </div>
                            </div>
                        </div>


                        {/*========= Inputs=============== */}
                        <div className="p-3 text-sm m-1">
                    {/* First and LastNames */}
                    
                        <div className= "p-1 flex items-center justify-around">
                            <div className="w-full relative">
                             <input {...register('firstName',{
                                 onChange: (e) => {setFormData({...formData, firstName: e.target.value})}
                                })} 
                             name='firstName' className= "w-full bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "First Name" />
                                <p className='text-xs text-red-700 text-center font-light' >{errors.firstName?.message}</p>
                                {formData.firstName.length >0 && <p className='absolute top-1 right-2 text-gray-400 text-xs text-center font-light'>First Name:</p>}
                            </div> 
                            <div className= 'w-full m-1 relative'>
                                <input  {...register('lastName',{
                                 onChange: (e) => {setFormData({...formData, lastName: e.target.value})}
                                 })} 
                                name='lastName' className= "w-full bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "Last Name"/>
                                <p className='text-xs text-red-700 text-center font-light' >{errors.lastName?.message}</p>
                                {formData.lastName.length >0 && <p className='absolute top-1 right-2 text-gray-400 text-xs text-center font-light'>Last Name:</p>}
                            </div>
                        </div>

                    {/* UserName */}
                    <div className= "p-1 flex items-center justify-around">
                         <div onBlur= {checkUsername} onClick={(e)=>setUserNameCheck(null)} className="bg-transparent w-full relative">
                            <input  name='userName'
                             {...register('userName',{
                                 onChange: (e) => {setFormData({...formData, userName: e.target.value})}
                                })} 
                                 className= "w-full bg-gray-100 border border-gray-300  p-2 rounded-md" type="text" placeholder= "Username" />
                            <p className='text-xs text-red-700 text-center font-light' >{errors.userName?.message}</p>
                            {formData.userName.length >0 && <p className='absolute top-2 right-2 text-gray-400 text-xs text-center font-light'>Username:</p>}
                            
                            <div className='bg-transparent absolute top-2 right-20 text-gray-500 text-xs text-center font-light '>
                               <div className ='flex text-red-500'>{userNameCheck === "usernameExists" && <><MdOutlineCancel size ={16}/>: username taken</>}</div>
                                <>{userNameCheck === "noUsername" && <BsCheck2Circle size ={16} className= 'text-cyan-500'/>}</>   
                            </div>

                        </div>
                    </div>
                        {/* Email*/}
                    <div onBlur= {checkEmail} onClick={(e)=>setEmailCheck(null)} className= "p-1 flex items-center justify-around">
                        <div className="bg-transparent w-full relative">
                            <input 
                             {...register('email',{
                                 onChange: (e) => {setFormData({...formData, email: e.target.value})}
                                })} 
                                name='email' className= "w-full bg-gray-100 border border-gray-300 p-2 rounded-md" type="text" placeholder= "Email"  />
                            <p className='text-xs text-red-700 text-center font-light' >{errors.email?.message}</p>
                            {formData.email.length >0 && <p className='absolute top-2 right-2 text-gray-400 text-xs text-center font-light'>Email:</p>}
                           
                            <div className='bg-transparent absolute top-2 right-20 text-gray-500 text-xs text-center font-light '>
                               <div className ='flex text-red-500'>{emailCheck === "emailExists" && <><MdOutlineCancel size ={16}/>: email taken</>}</div>
                                <>{emailCheck === "noEmail" && <BsCheck2Circle size ={16} className= 'text-cyan-500'/>}</>   
                            </div>
                       
                        </div>
                    </div>
                        {/* Password*/}
                    <div className= "p-1 flex items-center justify-around">
                        <div className="w-full relative">
                            <input  {...register('password',{
                                 onChange: (e) => {setFormData({...formData, password: e.target.value})}
                                })} 
                            name='password' className= "w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                             type= {visible ? "text" : "password"} placeholder= "Password" />
                             <p className='text-xs text-red-700 text-center font-light' >{errors.password?.message}</p>
                              {formData.password.length >0 && <p className='absolute top-3 right-10 text-gray-400 text-xs text-center font-light'>Password:</p>}
                            <div onClick = {(e)=>setVisible (!visible)} className='bg-transparent absolute top-2.5 right-3 text-gray-400 text-xs text-center font-light '>{visible ? <BsEyeSlashFill size={20}/> : <BsEyeFill size={20}/>}</div>

                        </div>
                    </div>
                            {/* Confirm Password*/}
                    <div className= "p-1 flex items-center justify-around">
                        <div className="w-full relative">
                            <input 
                             {...register('confirmPassword',{
                                 onChange: (e) => {setFormData({...formData, confirmPassword: e.target.value})}
                                })} 
                            name='confirmPassword' className= "w-full bg-gray-100 border border-gray-300 p-2 rounded-md"
                             type= {visible ? "text" : "password"}  placeholder= "Confirm Password"/>
                             <p className='text-xs text-red-700 text-center font-light' >{errors.confirmPassword && "Passwords Should Match"}</p>
                             {formData.confirmPassword.length >0 && <p className='absolute top-3 right-10 text-gray-400 text-xs text-center font-light'>Confirm Password:</p>}
                            <div onClick = {(e)=>setVisible (!visible)} className='bg-transparent absolute top-2.5 right-3 text-gray-400 text-xs text-center font-light '>{visible ? <BsEyeSlashFill size={20}/> : <BsEyeFill size={20}/>}</div>
                        </div>
                    </div>
                    <div className= "p-1 font-light flex items-center justify-center space-x-0.5">
                            {formData.isChecked ===false &&
                            <p className='text-xs text-red-800 text-center font-light' >Required!</p>
                            }
                            <input
                            
                            onClick={(e) =>  {
                                console.log(e.target.value);
                                    if (formData.isChecked === true){ 
                                    setFormData({...formData, isChecked: false});
                                    } else {
                                        setFormData({...formData, isChecked: true});                             
                                    }
                                    
                                    }
                                }
                                value={formData.isChecked}
                            name='isChecked' className= "bg-gray-100" type="checkbox"/>
                            <p className="px-2 text-xs">Agree with the Terms and Conditions</p>
                            
                        </div>
                </div>
                 

                <div className= "flex justify-between">
                        <button type='submit' className="items-center px-4 py-3 mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                            bg-gradient-to-r hover:from-pink-500
                            hover:to-yellow-500 flex
                            mx-auto rounded-md
                                 justify-center 
                                text-white text-sm cursor-pointer
                                font-semibold p-1 mb-4">
                                    Create Account
                        </button>
                        <GoogleLogin
                        clientId="285886074445-79pdnit476c0enipcvt9cpnsnpn3dida.apps.googleusercontent.com"
                        render= {(renderProps) =>(

                            <button 
                            onClick={renderProps.onClick}
                            type='submit' className="items-center px-4 py-3 mx-auto border border-gray-300 
                            hover:bg-white flex
                            mx-auto rounded-md
                                    justify-center 
                                text-gray-400 text-sm cursor-pointer
                                font-semibold p-1 mb-4">
                                Register with Google
                                <FcGoogle className="mx-1"/>
                            </button>

                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                        />
                </div>
                 </form>
            </div>
      
    
    </div>
    )
}





export const LoginForm = ({setpopSignup, setpopLogin}) => {
    const dispatch = useDispatch();
    const initialState ={email: '', password: '', autologout: '1h'}
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const[user,setUser] = useState(null);
    function switchSignup () {

        setpopSignup(true);
        setpopLogin(false);
       
    };

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
     

        try{
          dispatch(loginAction(formData, navigate));
     
          console.log(user);
           
        
        } catch (error){
            console.log(error);
        }
        
    }

    return (
         <div className="fixed text-gray-600 font-bold top-16 bg-transparent pt-8 pb-48 left-0 w-full flex justify-center z-50 max-h-screen overflow-y-scroll">
                    
        {/* ============Floating Box======== */}

             
            <div className="w-full lg:w-2/5 bg-gray-100 rounded-md shadow-xl m-2 h-full">
            
            <form onSubmit={handleSubmit}>
                        <div className= "pt-3 pb-1 flex items-center justify-around">
                            <img src="./assets/images/whitelogo.png" alt="DP" className="rounded-full h-8 w-8 sm:h-10 sm:w-10"/>
                        </div>  
                        <div className="p-1 text-center bg-transparent">
                            <p>Log In</p>

                           <div className=" font-light text-xs flex justify-center items-center space-x-1"> 
                               <div>
                                   Don't have an account?
                               </div>
                                <div onClick={switchSignup} className="bg-gray-100 border border-gray-400 text-gray-500 cursor-ponter hover:bg-white font-semibold p-1 rounded">
                                   <p className="cursor-pointer"> Register</p>
                                </div>
                            </div>
                            
                        </div>


                        {/*========= Inputs=============== */}
                        <div className="p-3 text-sm ">
                        {/* Email*/}
                    <div className= "p-1 flex items-center justify-around">
                            <input onChange={handleChange} name='email' className= "w-full bg-gray-100 border border-gray-300 m-1 p-2 rounded-md" type="text" placeholder= "Email/Username"/>
                        </div>
                        {/* Password*/}
                    <div className= "p-1 flex items-center justify-around">
                            <input onChange={handleChange} name='password' className= "w-full bg-gray-100 border border-gray-300 m-1 p-2 rounded-md"
                             type="password" placeholder= "Password"/>
                        </div>
                             {/* Auto Logout Protection*/}
                    <div className= "p-1 flex items-center justify-center">
                        <p className="font-light">
                            Auto-Logout Protection:
                        </p>
                        <select 
                        name= "autologout"
                        onChange={handleChange}   
                        className="m-2 flex text-center justify-center items-center font-bold text-xs  outline-none bg-gray-200 rounded-md p-1 border-none">
                                <option value="1h"> 1 Hour </option>
                                <option value="6h"> 6 Hours </option>
                                <option value="12h"> 12 Hours </option>
                                <option value="24h"> 1 Day </option>
                                <option value="7d"> 1 Week </option>
                                <option value="365d"> Until I logout </option>
                        </select> 
                    </div>
                            
                </div>
                

                <div className='flex justify-between'>
                        <button type='submit' className="items-center px-4 py-3 mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                            bg-gradient-to-r hover:from-pink-500
                            hover:to-yellow-500 flex
                            mx-auto rounded-md
                                 justify-center 
                                text-white text-sm cursor-pointer
                                font-semibold p-1 mb-4">
                            
                             Log In
                        </button>
                      
                       
                        
                </div>
            </form>
            </div>
          

        </div>
    )
}

export const VerifyForm = ({setpopSignup, setpopLogin}) => {
    const dispatch = useDispatch();
    const initialState ={email: '', otp: ''}
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleChange = (e) =>{
        setFormData({email:user.result.email, otp: e.target.value});
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
     

        try{
           dispatch(verifyAction(formData, navigate));    
        } catch (error){
            console.log(error);
        }
        
    }

    return (
        <div className="fixed text-gray-600 font-bold top-16 bg-gray-300 pt-8 pb-48 left-0 w-full flex justify-center z-50 max-h-screen overflow-y-scroll">
                    
        {/* ============Floating Box======== */}

             
            <div className="w-full lg:w-2/5 h-1/2 bg-gray-100 rounded-md shadow-xl mt-10 mb-40 h-full">
            
            <form onSubmit={handleSubmit}>
                        <div className= "pt-3 pb-1 flex items-center justify-around">
                            <img src="./assets/images/whitelogo.png" alt="DP" className="rounded-full h-8 w-8 sm:h-20 sm:w-20"/>
                        </div>  
                        <div className="p-1 text-center font-light bg-transparent">
                           
                            <p>Hello {user.result.name}. </p> 
                            <p className= "font-bold">Enter the Verification OTP Sent to {user.result.email}</p>
                            <p> To verify your account</p>

                            
                        </div>


                        {/*========= Inputs=============== */}
                        <div className="p-3 text-sm ">
                        {/* Code*/}
                         <div className= "p-1 flex items-center justify-around">
                            <input onChange={handleChange} name='otp' className= "text-center w-1/2 font-semibold text-lg bg-gray-100 border border-gray-300 m-1 p-2 rounded-md" type="text" placeholder= "Enter OTP"/>
                        </div>
                  
                            
                </div>
                

                <div className='flex justify-between'>
                        <button type='submit' className="items-center px-4 py-3 mx-auto bg-gradient-to-r from-pink-500 to-cyan-500 
                            bg-gradient-to-r hover:from-pink-500
                            hover:to-yellow-500 flex
                            mx-auto rounded-md
                                 justify-center 
                                text-white text-sm cursor-pointer
                                font-semibold p-1 mb-4">
                            
                             Verify Me
                        </button>
                      
                       
                        
                </div>
            </form>
            </div>
          

        </div>
    )
}


