import ProfilemodalRow from "./ProfilemodalRow.jsx"
import{ImSun} from 'react-icons/im';
import {CgMoon} from 'react-icons/cg';
import {WiMoonAltFirstQuarter} from 'react-icons/wi';
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
import { useState, useEffect, } from 'react';
import { Spring, animated } from 'react-spring';





function ProfileModal({setpopProfile, setPopSaved, themer, setThemer}) { 
    
    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const[themeBox, setThemeBox] = useState(false);


    //const [themer, setThemer] = useLocalStorage('themer', localStorage.getItem("themer"));
   
  



    // function useLocalStorage(key, initialState) {
    //     const [themer, setThemer] = useState(localStorage.getItem(key) ?? initialState);
    //     const updatedSetValue = useCallback(
    //       newValue => {
    //         if (newValue === initialState || typeof newValue === 'undefined') {
    //           localStorage.removeItem(key);
    //         } else {
    //           localStorage.setItem(key, newValue);
    //         }
    //         setThemer(newValue ?? initialState);
    //       },
    //       [initialState, key]
    //     );
    //     return [themer, updatedSetValue];
    //   }

   
    console.log(themer)
    const setDarkTheme = ()=>{
        setThemer ('dark');
    }
    const setLightTheme = ()=>{
        setThemer ('light');
    }
    const setSystemTheme = ()=>{
        setThemer ('system');
    }
    

   

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
      
        <div className="fixed p-4  md:w-1/2 lg:w-1/3 xl:w-1/4 w-3/4 mt-4 rounded-md mt-6 sm:mt-0 right-3 sm:right-1.5 top-20 h-full z-0 flex justify-center bg-gray-200 dark:bg-gray-900">
               
                <Spring
                
                from={
                    { opacity: 0, x:-20}
                }
                
                to={
                { opacity: 1, x:0}
                
                }>
                {styles => (
                <animated.div style={styles}>

            <div className="overflow-scroll">

                    {/* <div className="p-1 flex justify-center items-center rounded-full mx-4 mt-2 cursor-pointer hover:bg-gray-500 hover:text-white font-light text-gray-400 bg-gray-100"
                     onClick={ () => 
                        { setshowProfile(false);}
                        }>
                        hide
                    </div> */}

            {/* Heading */}
      
                <div onClick={ profileLoader} className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-800  bg-transparent items-center mt-4 mb-3 group">
                <img src={user.result.dpUrl} alt="DP" className="mx-auto rounded-full group-hover:text-white h-8 w-8"/>
                    <p className= " leading-3 text-center text-sm font-bold">Visit Portfolio</p> 
                   {/* <div className="bg-gray-100 dark:bg-gray-800 rounded-md py-1 items-center"> 
                    <p className= " leading-4 text-center text-xs font-light">Rank: #3</p> 
                    <p className= " leading-3 text-center text-xs font-semibold">30b aps</p>
                    </div> */}
                    
                </div>  
            
                <div className= "pb-80 border-gray-300 border-t overflow-scroll max-h-screen"> 

                    <Link to= '/Wallet'>
                        <div onClick= {()=>setpopProfile(false)}>
                        <ProfilemodalRow Icon = {CreditCardIcon} title ="Wallet" walletAmount={walletAmount}/>
                        </div>
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
                    </div >  

                    <div onClick={()=>setThemeBox(!themeBox)} className=''>
                        {themeBox === true &&
                            <div className='space-y-4 m-auto  w-2/3 z-30 bg-gray-100 dark:bg-gray-800 text-xs rounded-md p-3'>
                                <div onClick={setLightTheme} className={`flex justify-center items-center space-x-1 cursor-pointer ${themer === 'light' && 'text-cyan-500'}`}> 
                                    <p>Light</p>
                                    <ImSun/>
                                </div>
                                <div onClick={setDarkTheme} className={`flex justify-center items-center space-x-1 cursor-pointer   ${themer === 'dark' && 'text-cyan-500'}`}>              
                                    <p>Dark</p>
                                    <CgMoon/>
                                </div>
                                <div onClick={setSystemTheme} className={`flex justify-center items-center space-x-1 cursor-pointer  ${themer === 'system' && 'text-cyan-500'}`}>
                                    <p>System</p> 
                                    <WiMoonAltFirstQuarter/>
                                </div>

                            </div>
                            }
                                {themer ==='light' &&
                                     <ProfilemodalRow Icon = {ImSun}  title = 'Set Theme'/>
                                }
                                {themer ==='dark' &&
                                    <ProfilemodalRow Icon = {CgMoon}  title = 'Set Theme'/>
                                }
                                {themer ==='system' &&
                                    <ProfilemodalRow Icon = {WiMoonAltFirstQuarter}  title = 'Set Theme'/>
                                }
                        </div>
{/* 
                    {themer === "light" && <div onClick={setDarkTheme}>
                        <ProfilemodalRow Icon = {CgMoon}  title = 'Set Dark-Theme'/>
                    </div>}
                    {themer === "dark" && <div onClick={setSystemTheme}>
                        <ProfilemodalRow Icon = {WiMoonAltFirstQuarter} title ='Set System-Theme'/>
                    </div>}
                    {themer === "system" && <div onClick={setLightTheme}>
                        <ProfilemodalRow Icon = {ImSun} title = 'Set Light-Theme'/>
                    </div>} */}

                    {/* <div onClick={()=>setThemer(!themer)}>
                        <ProfilemodalRow Icon = {themer ===true ? ImSun : CgMoon } title ={themer ===true ? 'Set Light-Mode' : 'Set Dark-Mode' }/>
                    </div> */}

                    <div onClick={logout}>
                        <ProfilemodalRow Icon = {LogoutIcon} title ="Logout"/>
                    </div>

                 
       
            </div>
            </div>

            </animated.div>
                )}
            </Spring>

        </div> 
      
    )
}

export default ProfileModal;
