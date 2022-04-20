import ProfilemodalRow from "./ProfilemodalRow.jsx"
import {
    AdjustmentsIcon,
    CreditCardIcon,
    LogoutIcon,
    QuestionMarkCircleIcon,
    BookmarkIcon
   
    } from '@heroicons/react/outline'
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';

import {useNavigate} from 'react-router-dom';
import {getMiniProfileAction} from "../Midwares/rdx/actions/profileAction.js"
import {getWalletAction} from "../Midwares/rdx/actions/walletAction.js"
import { useState, useEffect } from 'react';





function ProfileModal({setpopProfile, setPopSaved}) { 
    
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    

    // useEffect(() => {
    //     if(user){
    //         dispatch(getWalletAction()); 
    //     }
    // }, []); 

    const walletAmount = useSelector((state) => state.walletReducer);

    const dispatch= useDispatch();
    const navigate = useNavigate(); 

    const logout =() =>{
        dispatch({type:"LOGOUT"});
        window.location.reload(true);
    }

    const profileLoader =() =>{
        setpopProfile(false);
       // dispatch(getMiniProfileAction(user.result.userName));
        navigate('/Portfolios/' + user.result.userName);
      //  window.location.reload(true);
    }
    return (
        <div className="fixed border-l-8 border-gray-200 p-4  md:w-1/2 lg:w-1/3 xl:w-1/4 w-3/4 mt-4 rounded-md mt-6 sm:mt-0 right-3 sm:right-1.5 top-20 h-full z-0 flex justify-center bg-gray-200">

            <div className="overflow-scroll">

                    {/* <div className="p-1 flex justify-center items-center rounded-full mx-4 mt-2 cursor-pointer hover:bg-gray-500 hover:text-white font-light text-gray-400 bg-gray-100"
                     onClick={ () => 
                        { setshowProfile(false);}
                        }>
                        hide
                    </div> */}

            {/* Heading */}
      
                <div onClick={ profileLoader} className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl hover:bg-gray-300  bg-transparent items-center mt-4 mb-3 group">
                <img src={user.result.dpUrl} alt="DP" className="mx-auto rounded-full group-hover:text-white h-8 w-8"/>
                    <p className= " leading-3 text-center text-sm font-bold">Visit Portfolio</p> 
                   <div className="bg-gray-100 rounded-md py-1 items-center"> 
                    <p className= " leading-4 text-center text-xs font-light">Rank: #3</p> 
                    <p className= " leading-3 text-center text-xs font-semibold">30b aps</p>
                    </div>
                    
                </div>  
            
                <div className= "mb-60 border-gray-300 border-t">

                    <Link to= '/Wallet'>
                        <ProfilemodalRow Icon = {CreditCardIcon} title ="Wallet" walletAmount={walletAmount}/>
                    </Link>

                    <Link to= '/Settings'>
                        <div onClick= {()=>setpopProfile(false)}>
                            <ProfilemodalRow Icon = {AdjustmentsIcon} title ="Settings" />
                        </div>
                    </Link>

                    <ProfilemodalRow Icon = {QuestionMarkCircleIcon} title ="Help"/>
                    
                
                    <div onClick={()=>{
                        setPopSaved(true);
                        setpopProfile(false);
                        }}>
                        <ProfilemodalRow Icon = {BookmarkIcon} title ="Saved Posts"/>
                    </div>

                    <div onClick={logout}>
                        <ProfilemodalRow Icon = {LogoutIcon} title ="Logout"/>
                    </div>

       
            </div>
            </div>

        </div> 
    )
}

export default ProfileModal;
