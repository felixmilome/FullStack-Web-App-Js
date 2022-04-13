
import {    SearchIcon,
             
            ChatIcon, 
            BellIcon,
            ShoppingCartIcon,
            HashtagIcon,
            UserAddIcon} from '@heroicons/react/outline'
import {GiTakeMyMoney, GiMoneyStack} from 'react-icons/gi';

import HeaderRightIcon from './HeaderRightIcon.jsx'
import { useState } from 'react';
import{Search} from './Search.jsx';
import ProfileModal from '../Modals/ProfileModal.jsx';
import OutsideClickHandler from 'react-outside-click-handler';
import TipNotificationsModal from '../Modals/TipNotificationsModal.jsx';
import NotificationsModal from '../Modals/NotificationsModal.jsx';
import SavedPostsModal from '../Modals/SavedPostsModal.jsx';
import CartModal from '../Modals/CartModal.jsx';
import LeftbarMob from '../Sidebars/LeftbarMob.jsx';
import RightbarMob from '../Sidebars/RightbarMob.jsx';
import {Link} from 'react-router-dom';
 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from 'react';
import {BeatLoader} from "react-spinners";


import{SignupForm, LoginForm, VerifyForm} from '../Modals/RegForms.jsx'
import {dailyPointsAction} from '../Midwares/rdx/actions/profileAction.js'
import {getConvosAction} from '../Midwares/rdx/actions/convosAction.js'
import {getNotificationsAction} from '../Midwares/rdx/actions/notificationsAction.js'
import {io} from 'socket.io-client'

//Search Area.. Go Search

function Header() {

    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user);
    const[popProfile, setpopProfile] = useState(false);
    const[loadingPointer, setLoadingPointer] = useState(false);
    const[popContacts, setpopContacts] = useState(false);
    const[popSubscribers, setpopSubscribers] = useState(false);
    const[popTipNotifications, setPopTipNotifications] = useState(false);
    const[popNotifications, setpopNotifications] = useState(false);
    const[popCart, setpopCart] = useState(false);
    const[popRankings, setpopRankings] = useState(false);
   
    const[popDailyPoints, setpopDailyPoints] = useState(false);
   
    const[popLogin, setpopLogin] = useState(false);
    const[popSignup, setpopSignup] = useState(true);
    const[popSaved, setPopSaved] = useState(false);
    //const [socket, setSocket] = useState(null)
  
 
    
   const socketRef = useRef();

    const dispatch= useDispatch();
     

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
             return null; 
        }
      };    

           
                    
        //Logouter-------

            window.onbeforeunload = function (e) {

                localStorage.unloadTime = JSON.stringify(new Date());

            };

            window.onload = function () {
                 if(user){

                let loadTime = new Date();
                let unloadTime = new Date(JSON.parse(window?.localStorage?.unloadTime));
                let refreshTime = loadTime?.getTime() - unloadTime?.getTime();

               
                    if(user?.result?.jwtExpiry === "300d" && refreshTime > 10000){//10seconds
                              
                                
                                localStorage.clear();
                                window.location.reload();
                            }
            }

            };
           

                      
      //Sockets++++++++++++++++

            useEffect(() => {    
                    socketRef.current = io("ws://localhost:8900");
                    dispatch ({type: 'SOCKET_SETUP', payload:  socketRef}); 

                    
                    
                    // socketRef.current.on("getMessage", messageData =>{
                    //    if(pop) setpopContacts(true);
                    //     console.log("matureConts");  ///Add to Notifications???????????????????
                    // }) 
            }, []); 

           const socket = useSelector((state) => state.socketReducer);

           console.log(socketRef);
            console.log (socket);


            useEffect(() => {

                if(user){

                    socketRef.current.emit("addUser",  user.result._id);
                    // socketRef.current.on("getUsers", users=>{
                    //     console.log(users)
                    //     console.log(user.result._id)
                    // }); 

                }

            }, [user]); 
           
            
            useEffect(() => { 
                if(user){
                    socketRef.current.on("getConvo", socketConvoData => {
                        console.log(socketConvoData);
                        console.log('convoGotten') 
                        dispatch ({type: 'POST_CONVO', payload: socketConvoData}); 
                        dispatch ({type: 'YES_CONVO'}); 
                     
                    })
                    socketRef.current.on("getPatchedMessage", socketMessageData => {
                        console.log(socketMessageData);
                        console.log('messagePatchGotten') 
                        dispatch ({type: 'PATCH_MESSAGE', payload: socketMessageData});
                       
                    })
                }
            }, []); 


            useEffect(() => {
                if(user){
                    if (parseInt(Date.now()) > (user.result.dailyLogin + 86400000)){ //86400000
                        setpopDailyPoints(true)
                        console.log("Daily Log in")
                    }
                }
            }, [setpopDailyPoints]);

            useEffect(() => {
                if(user){
                    dispatch(getConvosAction(user.result._id));
                }
            }, [dispatch]);

            //GETSOCKETS========================


            useEffect(() => {
                if(user){

                    dispatch(getNotificationsAction(user.result._id));
 
                        socketRef.current.on("getNotification", socketNotificationData =>{
                        console.log(socketNotificationData);
                        console.log("Notification Gotten"); 
                    
                        dispatch ({type: 'SOCKET_GOT_NOTIFICATION', payload: socketNotificationData});
                        console.log(notifications); 
                        })


                }   
            }, []);

            // useEffect(() => { 
            //        //ReviewSocket
            //        socketRef.current.on("getReview", reviewData =>{
            //         console.log(reviewData);
            //         console.log("review Gotten");

            //             if(reviewData.reviewerId != user.result._id){  //prevent spam since already posted when posting  
            //             dispatch ({type: 'SOCKET_GOT_REVIEW', payload: reviewData}); //double since hasnt been dismantled
            //             console.log('now posting review');
            //             }

            //         })
            //     }, []);

            useEffect(() => { 
                socketRef.current.on("getMessage", messageData =>{
                    console.log(messageData);
                    console.log("Message Gotten");
                    dispatch ({type: 'SOCKET_GOT_MESSAGE', payload: messageData});
                    console.log(messageData);

                    })
                }, []);

            // useEffect(() => { 
            //     if(user){
            //      //ReviewReplySocket
            //      socketRef.current.on("getReplyReview", reviewData =>{
            //         console.log(reviewData);
            //         console.log("review Reply Gotten");

            //             if(reviewData.reviewerId !== user.result._id 
            //               //prevent also double reply and org later
            //                 ){  //prevent spam since already posted when posting  
            //             dispatch ({type: 'SOCKET_GOT_REVIEW', payload: reviewData}); //double since hasnt been dismantled
            //             console.log('now posting reviewreply');
            //             }

            //         }) 
            //     } 
            // }, []);


            const notifications = useSelector((state) => state.notificationsReducer);
            const unreadNotifications = notifications.filter(notification => notification.read === false);

            const unreadMessages = unreadNotifications.filter(notification => notification.class ==='message');
            const  unreadTipNotifications = unreadNotifications.filter(notification => notification?.class === 'tip');
            const  unreadNormalNotifications = unreadNotifications.filter(notification => notification?.class === 'normal');
       
            if (user) {
                const decodedJwt = parseJwt(user.token);
                console.log(decodedJwt);
                console.log('time now: ' + Date.now());
                console.log('daily Login: ' + user.result.dailyLogin);
                console.log('award after: '+ (user.result.dailyLogin + 86400000));
                if (decodedJwt.exp * 1000 < Date.now()) {
                
                        dispatch({type:"LOGOUT"});
                        window.location.reload(true);
                    
                }
              
            }
           const handlePointer = ()=>{
                setLoadingPointer(true);
                dispatch(dailyPointsAction(user.result._id, setpopDailyPoints));
                console.log('awarded');
           }

           const logout =() =>{
            dispatch({type:"LOGOUT"});
            window.location.reload(true);
            }
               
        

          
// text
       
   
    

    return (
        
        <div className= "sticky top-0 z-50 ">
              {/*==============SIGN UP/ LOGIN =================*/}
            {user && !user.result.verified  ? <VerifyForm popSignup ={popSignup} popLogin = {popLogin} setpopSignup = {setpopSignup}  setpopLogin ={setpopLogin}/> : <></>} 
            { popSignup && !user ? <SignupForm popSignup ={popSignup} popLogin = {popLogin} setpopSignup = {setpopSignup}  setpopLogin ={setpopLogin}/> : <></>}
            {popLogin && !user ? <LoginForm  popLogin = {popLogin} popSignup ={popSignup}  setpopLogin ={setpopLogin} setpopSignup = {setpopSignup} />: <></>}
       
        <div className= "sticky top-0 z-50 bg-gray-100 border-b border-gray-400 p-2 lg:px-6 lg:py-3 shadow-md ">
        <div className= "flex items-center  p-0  space-x-2 justify-between">
            {/*Left*/}
            { user && user.result.verified ?
            <>
            <Link to='/'>
                <div onClick ={(e)=>(setpopContacts(false))}className="cursor-pointer  rounded-full hover:bg-gray-200 bg-transparent flex items-center justify-between">
                            
                            <div className= 'rounded-full items-center text-gray-200 bg-gray-100 object-cover'>
                                <img src="./assets/images/whitelogo.png" alt="DP" className="p-0.5 rounded-full h-8 w-8 sm:h-10 sm:w-10"/>
                            </div>

                            
                            <>
                                <h1 className= "m-1 pr-2 inline-flex font-bold text-xl text-sm ">Go Home</h1>
                               
                            </>
                       
                </div>
           </Link> 
        
            {/* MID SEARCH COMP */}
                <div className="hidden lg:flex items-center rounded-full w-1/3 mx-1 bg-gray-100 sm:pr-4">
                 
                 <Search/>
            
                </div>
                </>
       
       :
       
           <div onClick ={logout} className='bg-transparent'>
                <Link to='/'>
                    <div  className="cursor-pointer  rounded-full hover:bg-gray-200 bg-transparent flex items-center justify-between">
                                
                                <div className= 'rounded-full items-center  bg-gray-100 object-cover'>
                                    <img src="./assets/images/whitelogo.png" alt="DP" className="p-0.5 rounded-full h-8 w-8 "/>
                                </div>

                            
                            
                                <> 
                                    <h1 className= "m-1 inline-flex text-sm font-bold text-xl p-1">{user && !user.result.verified && <>Go Back to  </>} Sign Up-Log In</h1> 
                                    
                                </>
                                
                    </div>
                </Link>
           </div>
       

   
        }
            
            
            

            {/*Header Right*/}
            { user && user.result.verified &&
                <div className="flex items-center  bg-transparent sm:space-x-2 justify-end">
                    
                       
                        {/* Subscribers Modal & Button */}
                        <OutsideClickHandler     
                            onOutsideClick={() => {
                                setPopTipNotifications(false);
                            }}
                            >
                            <div 
                            onClick={ () => 
                            {
                                setPopTipNotifications(!popTipNotifications);
                                setpopContacts(false);
                            }
                            }>
                            <HeaderRightIcon LgIcon = {GiMoneyStack} badge={unreadTipNotifications?.length} />
                            </div>
                            {popTipNotifications && <TipNotificationsModal setPopTipNotifications={setPopTipNotifications}/>}
                            
                        </OutsideClickHandler>

                        {/* Notifications Modal */}

                        <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopNotifications(false);
                            }}
                            >
                            <div
                            onClick={ () => 
                            {
                                setpopNotifications(!popNotifications);
                                setpopContacts(false);
                            }
                            }>
                            <HeaderRightIcon Icon = {BellIcon} badge={unreadNormalNotifications.length}/>
                            </div>
                            {popNotifications && <NotificationsModal setshowNotifications={setpopNotifications}/>}
                            
                        </OutsideClickHandler>

                            {/* Chat Modal */}
                            {/* <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopContacts(false);
                            }}
                            > */}
                            <div
                            onClick={ () => 
                            {
                                setpopContacts(!popContacts);
                                
                             }
                            }> 
                                <HeaderRightIcon Icon = {ChatIcon} badge={unreadMessages.length}/> 
                                </div>
                            {popContacts &&  <RightbarMob unreadMessages ={unreadMessages} setpopContacts={setpopContacts} user={user} socket = {socket}/>}
                            
                        {/* </OutsideClickHandler>      */}

                        {/* Cart Modal */}
                        {/* <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopCart(false);
                            }}
                            >
                            <div
                            onClick={ () => 
                            {
                                setpopCart(!popCart);
                                setpopContacts(false);
                            }
                            }>
                                <HeaderRightIcon Icon = {ShoppingCartIcon} badge="2"/>
                        </div>
                        {popCart && <CartModal setshowCart={setpopCart}/>}
                            
                        </OutsideClickHandler> */}


                          {/* SAVED Modal */}
                        <OutsideClickHandler     
                            onOutsideClick={() => {
                                setPopSaved(false);
                            }}
                            >
                         
                        {popSaved && <SavedPostsModal setPopSaved={setPopSaved}/>}
                            
                        </OutsideClickHandler>

                    {/*Profile Pic Modal && Button*/}
                  
                    <OutsideClickHandler     
                        onOutsideClick={() => {
                            setpopProfile(false); 
                        }}
                        >
                        <div className="cursor-pointer inline-flex items-center justify-center p-1 rounded-full bg-transparent  sm:hover:bg-cyan-300 mx-1"
                     onClick={ () => 
                         {
                            setpopProfile(!popProfile);
                            setpopContacts(false);
                        }
                     }>
                     
                        <img src={user.result.dpUrl}  className="rounded-full m-0.5 group-hover:text-white h-8 w-8"/>
                                             
                        <span className="hidden md:inline-flex w-full text-sm mr-2">@{user.result.userName}</span>
                        </div>

                     {popProfile && 
                     <ProfileModal setpopProfile= {setpopProfile} setPopSaved ={setPopSaved}/>}
                    
                    </OutsideClickHandler>
                    
                    
                   
                    
                    
                    
                </div>
            }
            </div>
            { user && user.result.verified &&
                <div className="xl:hidden  mx-3 items-center flex justify-around">
                    
                    {/* Rankings Leftbar Mobile Modal */}
                    <div>
                         <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopRankings(false);
                            }}
                            >
                            <div className="bg-transparent hover:bg-cyan-400 rounded-full p-2 group"
                            onClick={ () => 
                            {setpopRankings(!popRankings)}
                            }>
                            <HashtagIcon className ="h-6 group-hover:text-white cursor-pointer text-gray-400"/>
                            </div>
                            {
                            popRankings &&

                             <LeftbarMob setpopRankings={setpopRankings}/>  // HALL OF FAME=========================
                             
                             }
                            
                        </OutsideClickHandler> 
                    </div>
                

                {/* // SEARCH============ */}
                
                <div className="lg:hidden flex justify-center items-center rounded-full w-full mx-2 my-1 bg-gray-100">
                    <Search/>
                </div>

                    {/* <div>
                              <OutsideClickHandler     
                            onOutsideClick={() => {
                                setpopContacts(false);
                            }} // text
                            >
                            <div className="bg-transparent hover:bg-cyan-400 rounded-full p-2 group"
                            onClick={ () => 
                            {setpopContacts(!popContacts)}
                            }>
                            <UsersIcon className ="h-6 group-hover:text-white cursor-pointer text-gray-400"/>
                            </div>
                            {popContacts && <RightbarMob setshowContacts={setpopContacts}/>}
                            
                        </OutsideClickHandler>    
                    </div> */}
                </div>
            }

        </div>
                                    


                    {/* POINTERRRRRRRRR */}

                 {popDailyPoints &&
                    <div className="fixed border-l-8 border-gray-200 p-4  w-full rounded-xl sm:rounded-none mt-6 h-full sm:mt-2  top-0 z-0 flex justify-center bg-gray-200 opacity-80">
                            <div className="p-1 m-auto overflow-scroll">

                                <div className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl bg-gray-100 items-center mt-0 mb-3 group">
                                    <img src={user.result.dpUrl} alt="DP" className="mx-auto rounded-full group-hover:text-white h-12 w-12"/>
                                    <p className= "text-gray-500 leading-4 text-center text-sm font-bold"> CONGRATULATIONS!</p> 
                                    <div className="bg-gray-200 rounded-md p-3 items-center"> 
                                        <p className= "text-gray-800 leading-4 text-center text-xs font-light">We are happy to Award You</p> 
                                        <p className= "text-gray-600 leading-4 text-center text-sm font-bold"> 10 Daily Points </p>                                       
                                    </div>                                   
                                </div>  
                                {/* <p className= "text-gray-500 pt-3 text-center text-lg font-bold">Thank you For Logging in Today</p> */}
                               
                                {loadingPointer === false &&<div onClick= {handlePointer} className="bg-teal-400 hover:bg-teal-500 cursor-pointer w-20 mx-auto m-2 rounded-md py-1 items-center"> 
                                        <p className= "p-2 text-gray-100 leading-4 text-center font-bold"> CLAIM </p>                                       
                                    </div>}
                                    {loadingPointer === true && <div className="bg-teal-400 hover:bg-teal-500 cursor-pointer w-20 flex justify-center mx-auto m-2 rounded-md py-1 items-center"> 
                                        <BeatLoader size={7} color='white' loading/>                                      
                                    </div>}    

                                <p className= "text-gray-700 text-center text-xs font-light p-1">More in the next 24 Hours</p> 
                                
                            </div>
                        </div>
                    } 



                   
            </div>
       
    
 
       
            
        
    )
}

export default Header;
