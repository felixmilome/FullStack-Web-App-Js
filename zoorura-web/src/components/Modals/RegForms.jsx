
import {GoogleLogin} from 'react-google-login';
import {FcGoogle } from "react-icons/fc";
import {useDispatch} from 'react-redux';
import{useNavigate} from 'react-router-dom';
import{useState} from 'react';

import {loginAction, registerAction} from '../Midwares/rdx/actions/auth.js';







export const SignupForm = ({setpopSignup, setpopLogin}) => {
    
    const initialState = {firstName: '', lastName: '', userName: '', email: '', password: '', confirmPassword: '', isChecked: ''}
    const dispatch = useDispatch();
   const navigate = useNavigate();
   const [formData, setFormData] = useState(initialState);
   const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        try{ 
            dispatch(registerAction(formData, navigate));
           
        } catch (error){
            console.log(error);
        }
    }

    return (
        <div className="fixed text-gray-600 font-bold top-28 left-0 w-full flex justify-center z-40">
             
        {/* ============Floating FORM BOX ======== */}

        

            <div className="w-full lg:w-2/5 bg-gray-100 rounded-md shadow-xl m-2">
                 <form onSubmit={handleSubmit}>
                        <div className= "pt-3 pb-1 flex items-center justify-around">
                            <img src="./assets/images/whitelogo.png" alt="DP" className="rounded-full h-8 w-8 sm:h-10 sm:w-10"/>
                        </div>  
                        <div className="p-1 text-center bg-transparent">
                            <p>Register New Account</p>
                            <div className="p-1 font-light text-xs flex justify-center items-center space-x-1"> 
                               <div>
                                   Already have an account?
                               </div>
                                <div onClick={switchLogin} className="bg-cyan-400 text-white cursor-ponter hover:bg-pink-500 font-bold p-1 rounded-md">
                                <p className="cursor-pointer"> Log In </p>
                                </div>
                            </div>
                        </div>


                        {/*========= Inputs=============== */}
                        <div className="p-3 text-sm ">
                    {/* First and LastNames */}
                    
                        <div className= "p-1 flex items-center justify-around">
                            <input onChange={handleChange} name='firstName' className= "w-full bg-gray-100 border border-gray-300 m-1 p-2 rounded-md" type="text" placeholder= "First Name"/>
                            <input onChange={handleChange} name='lastName' className= "w-full bg-gray-100 border border-gray-300 m-1 p-2 rounded-md" type="text" placeholder= "Last Name"/>
                        </div>

                    {/* UserName */}
                    <div className= "p-1 flex items-center justify-around">
                            <input onChange={handleChange} name='userName' className= "w-full bg-gray-100 border border-gray-300 m-1 p-2 rounded-md" type="text" placeholder= "Username"/>
                        </div>
                        {/* Email*/}
                    <div className= "p-1 flex items-center justify-around">
                            <input onChange={handleChange} name='email' className= "w-full bg-gray-100 border border-gray-300 m-1 p-2 rounded-md" type="text" placeholder= "Email"/>
                        </div>
                        {/* Password*/}
                    <div className= "p-1 flex items-center justify-around">
                            <input onChange={handleChange} name='password' className= "w-full bg-gray-100 border border-gray-300 m-1 p-2 rounded-md"
                             type="password" placeholder= "Password"/>
                        </div>
                            {/* Confirm Password*/}
                    <div className= "p-1 flex items-center justify-around">
                            <input onChange={handleChange} name='confirmPassword' className= "w-full bg-gray-100 border border-gray-300 m-1 p-2 rounded-md"
                             type="password" placeholder= "Confirm Password"/>
                        </div>
                    <div className= "p-1 font-light flex items-center justify-center">
                            <input onChange={handleChange} name='isChecked' className= "bg-gray-100" type="checkbox"/>
                            <p className="px-2 text-xs">I Agree with Terms and Conditions</p>
                        </div>
                </div>
                

                <div className= "flex justify-between">
                        <button type='submit' className="items-center px-4 py-3 mx-auto bg-gradient-to-r from-pink-500 to-cyan-500 
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
    const initialState ={email: '', password: ''}
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
        <div className="fixed text-gray-600 font-bold top-28 left-0 w-full flex justify-center z-40">
                    
        {/* ============Floating Box======== */}

             
            <div className="w-full lg:w-2/5 bg-gray-100 rounded-md shadow-xl m-2">
            
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
                                <div onClick={switchSignup} className="bg-cyan-400 text-white cursor-ponter hover:bg-pink-500 font-bold p-1 rounded-md">
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
                            
                </div>
                

                <div className='flex justify-between'>
                        <button type='submit' className="items-center px-4 py-3 mx-auto bg-gradient-to-r from-pink-500 to-cyan-500 
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


