import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import{useState, useEffect} from 'react';
import { verifyAction } from "../Midwares/rdx/actions/auth";
import{useNavigate} from 'react-router-dom';
import {BeatLoader} from "react-spinners";
import {Link} from 'react-router-dom';





export const SecureVerify = () => { 

    const {userId} = useParams();
    const {uniqueStr} = useParams();
    const {change} = useParams();

    const[formData, setFormData] = useState({otp:uniqueStr, userId:userId, type:'linked'});
    const[deleteFormData, setDeleteFormData] = useState({otp:uniqueStr, userId:userId, type:'delete'});
    const[visibleError, setVisibleError] = useState (false);
    const[loading, setLoading] = useState (true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    console.log(userId);
    console.log(uniqueStr);
    console.log(change);
    
   

    const verifyFeedback = useSelector((state) => state.googleauthReducer); //theyll share

    useEffect(() => {
        if (change==='deleteAccount'){

            dispatch(verifyAction(deleteFormData, navigate, setVisibleError, setLoading));

        }else{

            dispatch(verifyAction(formData, navigate, setVisibleError, setLoading));
            
        }   
    }, [formData, deleteFormData]);

    return ( 
        <div className='flex fixed top-0 z-50 flex justify-center items-center w-full h-screen mb-40'>
           
              
           <div className=' p-10 bg-gray-100 h-screen w-screen'>

           <div className='bg-gray-200 items-center '>
                    <h1 className="text-center text-gray-400 font-bold text-lg"> Security Verification </h1>
                </div>
                       
                        {verifyFeedback !=='Security Success' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-red-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-red-100 text-xs' > 
                                <p>{verifyFeedback}</p>
                           </div>
                        </div>
                        }
                        { verifyFeedback ==='Security Success' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-green-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-green-100 text-xs' > 
                                <p>{change} Changed Successfully</p>
                           </div>
                        </div>
                        }
                         { verifyFeedback ==='Zoorura Account Deleted' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-green-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-green-100 text-xs' > 
                                <p>Hope You enjoyed your time on Zoorura. We will Miss You</p>
                           </div>
                        </div>
                        }



                <div className='m-2 flex justify-between'>
                        
                            <button onClick={(e)=>{
                                if(change === 'deleteAccount'){
                                    setVisibleError(false);
                                    localStorage.clear();
                                    window.location = "/";
                                   
                                }else{
                                     setVisibleError(false);
                                    
                                    //navigate('/');
                                    //window.location.reload();
                                    window.location = "/";
                                }
                           
                           
                        }}  type={loading === false ? 'submit' : 'button'} className="items-center px-4 py-3 mx-auto bg-gradient-to-r from-cyan-300 to-cyan-500 
                            bg-gradient-to-r hover:from-pink-500
                            hover:to-yellow-500 flex
                            mx-auto rounded-md
                                 justify-center 
                                text-white text-sm cursor-pointer
                                font-semibold p-1 mb-4">
                            
                            {loading === false ? <p>Go Home</p> : <BeatLoader size={10} color='white' loading/>}

                        </button>
                        
                      
                       
                        
                </div>
            </div>
        </div>
    )
}

