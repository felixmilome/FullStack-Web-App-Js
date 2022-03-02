import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import{useState, useEffect} from 'react';
import { verifyAction } from "../Midwares/rdx/actions/auth";
import{useNavigate} from 'react-router-dom';




export const SecureVerify = () => { 

    const {userId} = useParams();
    const {uniqueStr} = useParams();

    const[formData, setFormData] = useState({otp:uniqueStr, userId:userId, type:'linked'});
    const[visibleError, setVisibleError] = useState (false);
    const[loading, setLoading] = useState (false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    console.log(userId);
    console.log(uniqueStr);
    console.log(formData);
    const verifyFeedback = useSelector((state) => state.googleauthReducer); //theyll share

    useEffect(() => {
        dispatch(verifyAction(formData, navigate, setVisibleError, setLoading));   
    }, [formData]);

    return (
        <div className='fixed top-0 z-50 flex justify-center items-center w-full h-screen mb-40'>
              {verifyFeedback !=='Registry Success' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-red-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-red-100 text-xs' > 
                                <p>{verifyFeedback}</p>
                           </div>
                        </div>
                        }
                        { verifyFeedback ==='Registry Success' && visibleError &&
                       <div className= ' bg-transparent flex justify-center items-center font-semibold text-sm text-green-700'>
                           <div className= 'flex p-2 m-2 rounded-md bg-green-100 text-xs' > 
                                <p>Verification Successful</p>
                           </div>
                        </div>
                        }
           <div className=' p-10 bg-gray-100 h-screen w-screen'>
               <div className='bg-gray-200 items-center '>
                    <h1 className="text-center text-gray-400 font-bold text-lg"> Your Changes Have Been Verified </h1>
                </div>
            </div>
        </div>
    )
}

