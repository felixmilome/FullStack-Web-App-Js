
import {GoogleLogin} from 'react-google-login';
import {FcGoogle } from "react-icons/fc";
import {BiLogInCircle } from "react-icons/bi";



import {BsEyeFill,BsEyeSlashFill, BsCheck2Circle,BsShieldCheck} from "react-icons/bs";
import { MdOutlineCancel, MdSecurity } from "react-icons/md";
import {useDispatch, useSelector} from 'react-redux';
import{useNavigate} from 'react-router-dom';
import{useState} from 'react';
import {BeatLoader} from "react-spinners";
import {Link} from "react-router-dom"

import VideoPlayer from 'react-video-js-player';
import { Spring, animated } from 'react-spring';


// SearchArea: Agree


import {loginAction, registerAction, verifyAction} from '../Midwares/rdx/actions/auth.js';

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as axs from "../Midwares/rdx/actions/axs.js"




const signUpSchema = yup.object().shape({
    // firstName: yup.string().strict(false).trim().required('firstname required').matches(/^[aA-zZ]+$/, "letters only for firstname").min(2).max(15),
    // lastName: yup.string().strict(false).trim().required('lastname required').matches(/^[aA-zZ]+$/, "letters only for lastname").min(2).max(15),
    userName: yup.string().strict(false).trim().required('username required').matches(/^\d*[a-zA-Z][a-zA-Z\d]*$/, "letters or letters+number for username").min(2).max(30),
    email: yup.string().strict(false).trim().email().required('email required').min(3).max(40),
    password: yup.string().required('password required').matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "no spaces").min(5).max(25),
    confirmPassword: yup.string().strict(false).trim().oneOf([yup.ref("password"), null]),
}); 

const logInSchema = yup.object().shape({
    email: yup.string().strict(false).trim().email().required('email required').max(40),
    password: yup.string().strict(false).trim().required('password required').max(25),
});
const verifySchema = yup.object().shape({
    otp: yup.string().strict(false).trim().required('OTP required').matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "no spaces"),
});
 

function emailIsValid (email) {
  return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length > 3 && email.length <41); 
}
function userNameIsValid (userName) {
  return (/^\d*[a-zA-Z][a-zA-Z\d]*$/.test(userName) && userName.length > 1 && userName.length <31 );
}

                                     


export const SignupForm = ({setpopSignup, setpopLogin}) => {
    
    
    const[visible, setVisible] = useState (false);
  
   
    const[visibleError, setVisibleError] = useState (false);
    const[visibleSuccess, setVisibleSuccess] = useState (false);
    const[loading, setLoading] = useState (false);
    const[required, setRequired] = useState (false);
    

    const [formData, setFormData] = useState ({userName: '', email: '', password: '', confirmPassword: '', isChecked: false});
    const dispatch = useDispatch();
   const navigate = useNavigate();
    const [emailCheck, setEmailCheck] = useState(null);
    
    const [userNameCheck, setUserNameCheck] = useState(null);
   const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));


     const loggedUser = useSelector((state) => state.googleauthReducer);
     

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(signUpSchema),
    });

    const checkEmail = async() => {
        if(formData.email && emailIsValid(formData.email)){
            try{

                console.log(formData.email);
                const {data} = await axs.checkEmailApi(formData.email);
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
        if(formData.userName && userNameIsValid(formData.userName)){

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
    // const handleChange = (e) =>{
    //     setFormData({...formData, [e.target.name]: e.target.value});
    // };

    const signUp = (data) => {
        
        //e.preventDefault();
        if(formData.isChecked === true){

            setLoading(true);
            
            console.log(data);
            try{ 
                
                dispatch(registerAction(data, navigate,setVisibleError,setVisibleSuccess,setLoading));
            
            } catch (error){
                console.log(error);
            }
        }
        else{
            console.log('not agreed'); //set an error message on form
        }
        
    }

    return (
        <div className="flex justify-center items-center fixed top-0 left-0 z-50 w-full h-screen overflow-y-scroll">
             
        {/* ============Floating FORM BOX ======== */}
    {/* <iframe src="https://firebasestorage.googleapis.com/v0/b/zooruraweb.appspot.com/o/diaryfiles%2Fvideo-1644936849536-62003d347a640b4c46627650?alt=media&token=84abd2ec-a45a-4aff-85a7-bfd7a0234cc0"
     allow="fullscreen" width="100%" height="700" >
    </iframe> */}
    {/* <VideoPlayer src="https://firebasestorage.googleapis.com/v0/b/zooruraweb.appspot.com/o/diaryfiles%2Fvideo-1644936849536-62003d347a640b4c46627650?alt=media&token=84abd2ec-a45a-4aff-85a7-bfd7a0234cc0"/> */}
            <div className="rounded-xl px-2  sm:px-6 w-full font-bold sm:w-3/4 h-screen flex justify-center items-center lg:w-2/5 bg-gray-100 dark:bg-gray-900
              shadow-md border dark:border-gray-700">

                 <form className='w-full' onSubmit={handleSubmit(signUp)}>
                 <Spring
                
                from={
                    { opacity: 0, x:-20}
                }
                
                to={
                { opacity: 1, x:0}
                
                }> 
                {styles => (
                <animated.div style={styles}>
                        <div className= "pt-3 pb-1 flex items-center bg-transparent justify-around">
                            <img src="./assets/images/whitelogo.png" alt="DP" className="rounded-md bg-transparent h-40 w-40 "/>
                        </div>  
                        <div className="p-1 text-center bg-transparent">
                            
                            <h1 className='text-4xl text-gray-600 dark:text-gray-300'>Join Zoorura</h1>
                            <div className="p-1 font-light text-xs flex justify-center items-center space-x-1"> 
                               <div>
                                   Already have an account?
                               </div>
                                <div onClick={switchLogin} className="cursor-ponter text-cyan-500 hover:text-teal-600 font-bold p-0.5">
                                <p className="cursor-pointer"> Log In</p>
                                </div>
                            </div>
                        </div>

                        { loggedUser !== 'Registry Success' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-red-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-red-100 text-xs' > 
                                <p>{loggedUser}</p>
                           </div>
                        </div>
                        }
                        { loggedUser ==='Registry Success' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-green-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-green-100 text-xs' > 
                                <p>{loggedUser}</p>
                           </div>
                        </div>
                        }

 
                        {/*========= Inputs=============== */}
                        <div className="p-3 text-sm m-1">
                    {/* First and LastNames */}
                    
                        {/* <div className= "p-1 space-x-1 flex items-center justify-around">
                            <div className="w-full relative">
                             <input {...register('firstName',{
                                 onChange: (e) => {setFormData({...formData, firstName: e.target.value.trim()})}
                                })} 
                             name='firstName' className= "w-full bg-gray-200 border-b border-gray-200 px-4 py-2 rounded-full" type="text" placeholder= "First Name" />
                                <p className='text-xs text-red-700 text-center font-light' >{errors.firstName?.message}</p>
                                {formData.firstName.length >0 && <p className='absolute top-1 right-2 text-gray-400 text-xs text-center font-light'>Firstname:</p>}
                            </div> 
                            <div className= 'w-full relative'>
                                <input  {...register('lastName',{
                                 onChange: (e) => {setFormData({...formData, lastName: e.target.value.trim()})}
                                 })} 
                                name='lastName' className= "w-full bg-gray-200 border-b border-gray-200 px-4 py-2 rounded-full" type="text" placeholder= "Last Name"/>
                                <p className='text-xs text-red-700 text-center font-light' >{errors.lastName?.message}</p>
                                {formData.lastName.length >0 && <p className='absolute top-1 right-2 text-gray-400 text-xs text-center font-light'>Lastname:</p>}
                            </div>
                        </div> */}

                    {/* UserName */}
                    <div className= "p-1 flex items-center justify-around">
                         <div onBlur= {checkUsername} onChange={(e)=>setUserNameCheck(null)} className=" w-full sm:w-3/4 relative">
                            <input  name='userName'
                             {...register('userName',{
                                 onChange: (e) => {setFormData({...formData, userName: e.target.value.trim().toLowerCase()})}
                                })} 
                                 className= "w-full bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full" type="text" placeholder= "Username" />
                            <p className='text-xs text-red-700 text-center font-light' >{errors.userName?.message}</p>
                            {formData.userName.length >0 && <p className='absolute top-2.5 right-2 text-gray-400 text-xs text-center font-light'>Username:</p>}
                            
                            <div className='bg-transparent absolute top-2.5 right-20 text-gray-500 text-xs text-center font-light '>
                               <div className ='flex text-red-500'>{userNameCheck === "usernameExists" && <><MdOutlineCancel size ={16}/>: username taken</>}</div>
                                <>{userNameCheck === "noUsername" && <BsCheck2Circle size ={16} className= 'text-cyan-500'/>}</>   
                            </div>

                        </div>
                    </div>
                        {/* Email*/}
                    <div onBlur= {checkEmail} onChange={(e)=>setEmailCheck(null)} className= "p-1 flex items-center justify-around">
                        <div className="w-full sm:w-3/4 relative">
                            <input 
                             {...register('email',{
                                 onChange: (e) => {setFormData({...formData, email: e.target.value.trim().toLowerCase()})}
                                })} 
                                name='email' className= "w-full bg-gray-200 dark:bg-gray-800 border dark:border-gray-700 border-gray-200 px-4 py-2 rounded-full" type="text" placeholder= "Email"  />
                            <p className='text-xs text-red-700 text-center font-light' >{errors.email?.message}</p>
                            {formData.email.length >0 && <p className='absolute top-2.5 right-2 text-gray-400 text-xs text-center font-light'>Email:</p>}
                           
                            <div className='bg-transparent absolute top-2.5 right-12 text-gray-500 text-xs text-center font-light '>
                               <div className ='flex text-red-500'>{emailCheck === "emailExists" && <><MdOutlineCancel size ={16}/>: email taken</>}</div>
                                <>{emailCheck === "noEmail" && <BsCheck2Circle size ={16} className= 'text-cyan-500'/>}</>   
                            </div>
                       
                        </div>
                    </div>
                        {/* Password*/}
                    <div className= "p-1 flex items-center justify-around">
                        <div className="w-full sm:w-3/4 relative">
                            <input {...register('password',{
                                 onChange: (e) => {setFormData({...formData, password: e.target.value})}
                                })}
                            name='password' className= "w-full bg-gray-200 dark:bg-gray-800 border dark:border-gray-700 border-gray-200 px-4 py-2 rounded-full"
                             type= {visible ? "text" : "password"} placeholder= "Password" />
                             <p className='text-xs text-red-700 text-center font-light' >{errors.password?.message}</p>
                              {formData.password.length >0 && <p className='absolute top-3 right-10 text-gray-400 text-xs text-center font-light'>Password:</p>}
                            <div onClick = {(e)=>setVisible (!visible)} className='bg-transparent absolute top-2.5 right-3 text-gray-400 cursor-pointer hover:text-cyan-500 text-xs text-center font-light '>{visible ? <BsEyeSlashFill size={20}/> : <BsEyeFill size={20}/>}</div>

                        </div>
                    </div>
                            {/* Confirm Password*/}
                    <div className= "p-1 flex items-center justify-around">
                        <div className="w-full sm:w-3/4 relative">
                            <input 
                             {...register('confirmPassword',{
                                 onChange: (e) => {setFormData({...formData, confirmPassword: e.target.value})}
                                })} 
                            name='confirmPassword' className= "w-full bg-gray-200 dark:bg-gray-800 border dark:border-gray-700 border-gray-200 px-4 py-2 rounded-full"
                             type= {visible ? "text" : "password"}  placeholder= "Confirm Password"/>
                             <p className='text-xs text-red-700 text-center font-light' >{errors.confirmPassword && "Passwords Should Match"}</p>
                             {formData.confirmPassword.length >0 && <p className='absolute top-3 right-10 text-gray-400 text-xs text-center font-light'>Confirm Password:</p>}
                            <div onClick = {(e)=>setVisible (!visible)} className='bg-transparent absolute top-2.5 right-3 text-gray-400 cursor-pointer hover:text-cyan-500 text-xs text-center font-light '>{visible ? <BsEyeSlashFill size={20}/> : <BsEyeFill size={20}/>}</div>
                        </div>
                    </div>
                    <div className= "p-1 font-light flex items-center justify-center space-x-0.5">
                            {formData.isChecked ===false && required &&
                            <p className='text-xs text-red-600 text-center font-semibold' >Required!</p>
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
                            <p className="px-0.5 text-xs">I Agree with the Terms and Conditions</p>
                            
                        </div>
                </div> 
                 

                <div className= "flex justify-between">
                        <button onClick={(e)=>{

                            setVisibleError(false);
                            setRequired(true);
                             
                            
                        }} type={loading === false ? 'submit' : 'button'} className="items-center  px-4 py-2 mx-auto bg-gradient-to-r  text-black
                        from-teal-200 to-cyan-500 hover:from-pink-400 hover:to-yellow-500   flex 
                        mx-auto rounded-full w-1/2 dark:text-black
                             justify-center 
                            text-white text-sm cursor-pointer
                            font-semibold p-1 mb-4">
                                {loading === false ? <p>Create Account</p> : <BeatLoader size={10} color='cyan' loading/>}
                        </button>
                        {/* <GoogleLogin
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
                        /> */}
                </div>

            </animated.div>
                      )}
                    </Spring>
           
                 </form>
            </div>
      
    
    </div>
    )
}





export const LoginForm = ({setpopSignup, setpopLogin}) => { 
    const dispatch = useDispatch();
    const[visible, setVisible] = useState (false);
    //const initialState ={email: '', password: '', autologout: '1h'}
    const [formData, setFormData] = useState({email: '', password: '', autologout: '300d'});
    const navigate = useNavigate();
    const[user,setUser] = useState(null);
    const[visibleError, setVisibleError] = useState (false);
    const[loading, setLoading] = useState (false);

    const loggedUser = useSelector((state) => state.googleauthReducer);

    function switchSignup () {

        setpopSignup(true);
        setpopLogin(false);
       
    };

     const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(logInSchema),
    });

    // const handleChange = (e) =>{
    //     register(e.target.name);
    //     setFormData({...formData, [e.target.name]: e.target.value});
    // };
    
  
    const logIn = async (data, navigate) => {
     
        setLoading(true);

        try{
          dispatch(loginAction(formData, navigate, setVisibleError, setLoading));
        } catch (error){
            console.log(error);
        }
        
    }

    return (
        <div className="flex justify-center items-center fixed top-0 left-0 z-50 bg-transparent w-full h-screen overflow-y-scroll">
                    
        {/* ============Floating Box======== */}

            <div className="rounded-xl px-2  sm:px-6 w-full font-bold sm:w-3/4 h-screen flex justify-center items-center lg:w-2/5 bg-gray-100 dark:bg-gray-900
              shadow-md border dark:border-gray-700">
            
            <form className='' onSubmit={handleSubmit(logIn)}>
            
            <Spring
                
                from={
                    { opacity: 0, x:-20}
                }
                
                to={
                { opacity: 1, x:0}
                
                }> 
                {styles => (
                <animated.div style={styles}>

                        <div className= "pt-3 pb-1 flex items-center bg-transparent justify-around">
                            <img src="./assets/images/whitelogo.png" alt="DP" className="rounded-md bg-transparent h-48 w-48 "/>
                        </div>  
                        <div className="p-1 text-center bg-transparent">
                            <p className='text-2xl p-1 text-gray-600'>Zoorura Log In</p>

                           <div className=" font-light text-xs flex justify-center items-center space-x-1"> 
                               <div>
                                   Don't have an account?
                               </div>
                                <div onClick={switchSignup} className="cursor-ponter text-cyan-500 hover:text-teal-600 font-bold p-0.5">
                                   <p className="cursor-pointer"> Register</p>
                                </div>
                            </div>
                            
                        </div>

                       { loggedUser ==='LoginError' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-red-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-red-100 text-xs' > 
                                <p>Incorrect Email or Password! Try Again!</p>
                           </div>
                        </div>
                        }
                        { loggedUser ==='Something went wrong. Please Try again Later' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-red-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-red-100 text-xs' > 
                                <p>{loggedUser}</p>
                           </div>
                        </div>
                        }
                        { loggedUser ==='Registry Success' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-green-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-green-100 text-xs' > 
                                <p>Log in Successful</p>
                           </div>
                        </div>
                        }


                        {/*========= Inputs=============== */}
                        <div className="p-3 text-sm ">
                        {/* Email*/}
                        <div className ='bg-transparent flex items-center justify-around'>
                            <div className= "relative w-full  my-1 ">
                                <input {...register('email',{
                                    onChange: (e) => {setFormData({...formData, email: e.target.value})}
                                    })} name='email' className= "w-full bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full" type="text" placeholder= "Email/Username"/>
                                <p className='text-xs text-red-700 text-center font-light' >{errors.email?.message}</p>
                                    {formData.email.length >0 && <p className='absolute top-1 right-2 text-gray-400 text-xs text-center font-light'>Email:</p>}
                            </div>
                        </div>
                        {/* Password*/}
                        <div className='bg-transparent flex items-center justify-around'>
                            <div className= "relative w-full  my-1 ">
                                <input {...register('password',{
                                    onChange: (e) => {setFormData({...formData, password: e.target.value})}
                                    })}  name='password' className= "w-full bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full"
                                type={visible ? "text" : "password"} placeholder= "Password"/>
                                <p className='text-xs text-red-700 text-center font-light' >{errors.password?.message}</p>
                                    {formData.password.length >0 && <p className='absolute top-2.5 right-9 text-gray-400 text-xs text-center font-light'>Password:</p>}
                                <div onClick = {(e)=>setVisible (!visible)} className='bg-transparent absolute top-2 right-3 text-gray-400 cursor-pointer hover:text-cyan-500 text-xs text-center font-light '>{visible ? <BsEyeSlashFill size={20}/> : <BsEyeFill size={20}/>}</div>
                        </div>
                        </div>

                        {/* Forgot Password */}
                        
                        <Link to= '/forgotPassword' className= 'w-full flex justify-center'>
                                <div className= ' flex w-1/2 justify-center text-xs font-light cursor-pointer rounded-full hover:text-cyan-500'>
                                <p>Forgot Password?</p>
                                </div>
                        </Link>

                             {/* Auto Logout Protection*/}
                    <div className= "p-1 flex items-center justify-center space-x-1">
                        <MdSecurity size={18} className= "text-gray-500"/>
                        <p className="font-light text-xs">
                            Stay Logged In?
                        </p>
                        <select 
                        name= "autologout"
                        onChange={(e)=>setFormData({...formData, autologout: e.target.value})}   
                        className="m-2 w-40 flex text-center justify-center items-center font-bold text-xs  outline-none bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-gray-300">
                                 <option value="300d"> Never </option>
                                 <option value="365d"> Always </option>
                                
                               
                                {/* <option value="1h"> For 1 Hour </option>
                                <option value="6h"> For 6 Hours </option>
                                <option value="12h"> For 12 Hours </option>
                                <option value="24h">For 1 Day </option>
                                <option value="7d">For 1 Week </option> */}
                                
                        </select> 
                    </div>
                            
                </div>
                
  {/* CREATE CLASS OF BLUE BORDER BUTTON */}
                <div className='flex justify-between'>
                        <button onClick={(e)=>{
                            setVisibleError(false);
                           
                           
                        }}  type={loading === false ? 'submit' : 'button'} className="items-center  px-4 py-2 mx-auto bg-gradient-to-r  text-black
                        from-teal-200 to-cyan-500 hover:from-pink-400 hover:to-yellow-500   flex 
                        mx-auto rounded-full w-1/2 dark:text-black
                             justify-center 
                            text-white text-sm cursor-pointer
                            font-semibold p-1 mb-4">
                                 
                            
                            {loading === false ? <p>Log In</p> : <BeatLoader size={10} color='cyan' loading/>}

                        </button>
                      
                       
                        
                </div>
                
                </animated.div>
                      )}
                    </Spring>

            </form>
            </div>
          

        </div>
    )
}

export const VerifyForm = ({setpopSignup, setpopLogin}) => {
    const dispatch = useDispatch();
    //const initialState ={email: '', otp: ''}
    
    const navigate = useNavigate();
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const[visibleError, setVisibleError] = useState (false);
    const[loading, setLoading] = useState (false);
    const[sendOtpReply, setsendOtpReply] = useState ('fresh');
    const [formData, setFormData] = useState({otp: '', userId:user.result._id, type:'typed'});

     const loggedUser = useSelector((state) => state.googleauthReducer);

    const handleChange = (e) =>{
        setFormData({otp: e.target.value.trim(), userId:user.result._id, type:'typed'});
    };
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(verifySchema),
    });

    const sendOtp = async () => {
        const email = user.result.email;
        const {data} = await axs.sendOtpApi(email);
        setsendOtpReply(data.message);
    }

  
    const verify = (data) => {
        
        try{
            setLoading(true);
            console.log(data);
           dispatch(verifyAction(formData, navigate, setVisibleError, setLoading));    
        } catch (error){
            console.log(error);
        }
        
    } 

    return (
        <div className="fixed text-gray-600 dark:text-gray-200 font-bold top-0 left-0 bg-gray-300 dark:bg-black w-full flex justify-center items-center z-50 h-screen overflow-y-scroll">
                    
        {/* ============Floating Box======== */}

             
            <div className="w-full lg:w-2/5 border dark:border-gray-600  dark:bg-gray-900 bg-gray-100 rounded-md shadow-xl">
            
            <form onSubmit={handleSubmit(verify)}>
                        <div className= "pt-3 pb-1 flex items-center justify-around">
                            <img src="./assets/images/whitelogo.png" alt="DP" className="rounded-full h-8 w-8 sm:h-20 sm:w-20  bg-gray-100 "/>
                        </div>  
                        <div className="p-1 text-center font-light bg-transparent">
                           
                            <p>Hello {user.result.name}. </p> 
                            <p className= "font-bold">Enter the latest OTP Sent to {user.result.email}</p>
                            <p> To verify your account</p>                     
                        </div>

                         {loggedUser !=='Registry Success' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-red-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-red-100 text-xs' > 
                                <p>{loggedUser}</p>
                           </div>
                        </div>
                        }
                        { loggedUser ==='Registry Success' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-green-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-green-100 text-xs' > 
                                <p>Verification Successful</p>
                           </div>
                        </div>
                        }

                        {/*========= Inputs=============== */}
                        {visibleError !== 'Otp Expired! Re-Register this Account' &&
                        <>
                        <div className="p-3 text-sm ">
                        {/* Code*/}
                            
                            <div onClick={(e)=>setVisibleError(false)} className= "flex items-center justify-center">
                                <input 
                                 {...register('otp',{
                                    onChange: (e) => {setFormData({otp: e.target.value.trim(), userId:user.result._id, type:'typed'})}
                                   })} name='otp' className= "text-center w-1/2 font-semibold text-lg bg-gray-100 dark:bg-gray-800 border border-gray-00 dark:border-gray-600 m-1 p-2 rounded-md" type="text" placeholder= "Enter OTP"/>
                                    
                            </div>
                            <p className='text-xs text-red-700 text-center font-light' >{errors.otp?.message}</p>
                            
                  
                            
                        </div>
                

                        <div className='flex justify-between'>
                                <button onClick={(e)=>{

                                    setVisibleError(false);
                                    
                                }} type={loading===false ? 'submit' : 'button'} className="items-center px-4 py-3 mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                                    bg-gradient-to-r hover:from-pink-500
                                    hover:to-yellow-500 flex
                                    dark:text-gray-900
                                    mx-auto rounded-md
                                        justify-center 
                                        text-white text-sm cursor-pointer
                                        font-semibold  mb-4">
                                    
                                    {loading===false ?<><BsShieldCheck size={25} className ='m-1'/> <p>Verify Me</p></>: <BeatLoader size={10} color='white' loading/>}
                                </button> 
                               
                        </div>
                        <div className='m-auto w-2/3 text-xs text-center text-gray-400 font-light bg-transparent py-8'>
                                    <p className= "font-bold text-sm">Didn't get an OTP email?</p> 
                                    <p>-Check Spam Folder</p>
                                    <p>-If none, give it 5-10 Minutes.</p>

                                <div className= "flex justify-center cursor-pointer bg-transparent font-semibold ">
                                    

                                    { loading === true ? 
                                    
                                        <div  className ='bg-transparent hover:text-cyan-600'>
                                            <p> ...loading </p> 
                                        </div>
                                        : 
                                        <>
                                           {sendOtpReply === 'fresh' &&
                                                <div onClick= {sendOtp} className ='bg-transparent hover:text-cyan-600'> 
                                                        <p>     
                                                            If None, Click Here to Resend OTP 
                                                        </p>
                                                </div>
                                            }
                                            {sendOtpReply === 'sent' &&
                                                <div className ='bg-transparent hover:text-cyan-600'> 
                                                    <p>     
                                                        Resent to {user.result.email}. Check your Email. 
                                                    </p>
                                                </div>
                                            }
                                            {sendOtpReply === 'error' &&
                                                <div className ='bg-transparent hover:text-cyan-600'> 
                                                    <p>     
                                                        An error occured. Please try later. 
                                                    </p>
                                                </div>
                                            }
                                        </>
                                    
                                    }

                                </div>     
                        </div>
                        </>
                        }
            </form>
            </div>
          

        </div>
    )
}


