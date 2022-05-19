
import {    SearchIcon,
             
            ChatIcon, 
            BellIcon,
            ShoppingCartIcon,
            HashtagIcon,
            UserAddIcon} from '@heroicons/react/outline'
import {GiTakeMyMoney, GiMoneyStack, GiPadlock} from 'react-icons/gi';
import {BsCameraVideo, BsCameraVideoOff, BsMicMute} from 'react-icons/bs';
import {MdOutlineCancel} from 'react-icons/md';

import{RiVipCrownFill} from 'react-icons/ri';

import HeaderRightIcon from './HeaderRightIcon.jsx'
import { useState, useCallback} from 'react';
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
import {dailyPointsAction, getUserProfileAction} from '../Midwares/rdx/actions/profileAction.js'
import {getConvosAction} from '../Midwares/rdx/actions/convosAction.js'
import {getNotificationsAction} from '../Midwares/rdx/actions/notificationsAction.js'
import {getWalletAction} from '../Midwares/rdx/actions/walletAction.js'
import {CallPair} from '../Modals/CallPair';

import Ringtone from '../../sources/sounds/Bizphone.mp3';
import WaitingTone from '../../sources/sounds/Facetime.mp3';



import {io} from 'socket.io-client'
import Peer from 'simple-peer';
import {Howl, Howler} from 'howler';


//Search Area.. Go Search im Arena img follows Search CLAIM Log

function Header({themer, setThemer}) {

    const[user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const[popProfile, setpopProfile] = useState(false);
    const[loadingPointer, setLoadingPointer] = useState(false);
    const[popContacts, setpopContacts] = useState(false);
    const[popSubscribers, setpopSubscribers] = useState(false);
    const[popTipNotifications, setPopTipNotifications] = useState(false);
    const[popNotifications, setpopNotifications] = useState(false);
    const[popCart, setpopCart] = useState(false);
    //const [themer, setThemer] = useLocalStorage('themer', localStorage.getItem("themer"));

    const[popRankings, setpopRankings] = useState(false);
   
    const[popDailyPoints, setpopDailyPoints] = useState(false);
   
    const[popLogin, setpopLogin] = useState(false);
    const[popSignup, setpopSignup] = useState(true);
    const[popSaved, setPopSaved] = useState(false);
    
    const[callAccepted, setCallAccepted] = useState(false);
    //const[socketCallerData, setsocketCallerData] = useState({sender:{_id:viewer._id, dpUrl:viewer.dpUrl, userName:viewer.userName}, receiver:displayed._id, signal:'',postId:convoId, type: ''});
    const [stream, setStream] = useState()
   
    const [receivingCall, setReceivingCall] =useState (false);
    const [sendingCall, setSendingCall] = useState(false);
    const [callPicked, setCallPicked] = useState(false);

    const [caller, setCaller] = useState ();
    const [called, setCalled] = useState ();

    const [callerSignal, setCallerSignal] = useState ();
    const [callEnded, setCallEnded] = useState (false); 
    const [peerState, setPeerState] = useState (false); 


  
 
    
   const socketRef = useRef();
   const myVideo = useRef();
   const myAudio = useRef();
   const userVideo = useRef();
   const connectionRef = useRef();

    const dispatch= useDispatch();

   

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

    //   console.log(themer);

    // const themeSetter =()=> {
    //     if (
    //         //localStorage.themer === 'dark' || (!('themer' in localStorage) &&       //localstorage.createItem use this 
    //     window.matchMedia('(prefers-color-scheme: dark)').matches
    //     //)
    //     ) {
    //         //document.documentElement.classList.add('dark') //work on it later
    //         setMode(''); 
    //     } else {
    //         //document.documentElement.classList.remove('dark')
    //         setMode(null);
    //     } 
    // }
    // console.log(localStorage.themer);

   

    useEffect(() => {
        localStorage.setItem('themer', 'system');
      }, [dispatch]);

      
   
     

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
             return null; 
        }
      };    

      console.log()
           
                    
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

            }, []); 

           const socket = useSelector((state) => state.socketReducer);

           console.log(socketRef);
            console.log (socket);


            useEffect(() => {

                if(user){

                    socketRef.current.emit("addUser",  user.result._id);
                }

            }, [user]); 


        //Calls++++++++++++++++++++++++++++

            //CallSomeone

            const callState = useSelector((state) => state.callsReducer); //Check Contact Mod Trigger
            
          

            useEffect(() => { //Trigger  Call Function Function 

                    const callUser =(receiverId) => { //Call Function Definition

        
                        console.log('Calling User')
                        const peer = new Peer ({
                            initiator: true,
                            trickle: false,
                            stream: stream
                        }) 
        
                    
                
                        peer.on("signal", (data) => {
                            const socketCallerData = {sender:{_id:user.result._id, dpUrl:user.result.dpUrl, userName:user.result.userName}, receiverId:receiverId, signal:data, postId:'', type: ''}
                            socket.current.emit ("callUser", {
                                socketCallerData
                            })
                        })
                        peer.on("stream", (stream) => { 

                                userVideo.current.srcObject = stream

                        })
        
        
                        socketRef.current.on("callPicked", signal => {
        
                            console.log('call Picked')
                            setCallAccepted(true)
                            peer.signal(signal) 
                        
                        }) 
                
                        connectionRef.current = peer
        
                    }

                    if(callState?.state==='calling'){

                        setSendingCall(true);
                        setCalled(callState.called)

                        navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((stream) => {
                            setStream(stream)
                            myVideo.current.srcObject = stream
                        })

                        console.log(callState)
                        const receiverId = callState?.called?._id;
                        callUser(receiverId); //Call Function
                    }
                    
            },[callState]); 

                   
        

            useEffect (() => {

                socketRef.current.on("incomingCall", (socketCallerData) =>{
                    
                    console.log('incomingCall');
                    setReceivingCall(true);
                    
                    navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((stream) => {
                        setStream(stream)
                        myVideo.current.srcObject = stream
                    })

                   
    
                
                    setCaller(socketCallerData.sender);
                    setReceivingCall(true);
                    setCallerSignal (socketCallerData.signal);

                    var sound = new Howl({

                        src: [Ringtone],
                        autoplay: true,
                        loop: true,
                        volume: 0.5,
                      
                      });

                      sound.play();

                })
           },[])



            //Receive Call
            const pickCall = () => {
                setCallAccepted(true)

                const peer = new Peer ({
                    initiator:false, 
                    trickle:false,
                    stream:stream
                })
             
                peer.on ("signal", data => {
                    const socketPickerData = {sender:{_id:user.result._id, dpUrl:user.result.dpUrl, userName:user.result.userName}, receiverId:caller._id, signal:data, postId:'', type: ''}
                    socketRef.current.emit("pickCall", {socketPickerData})    
                }) 

                peer.on ("stream", stream => {
                    userVideo.current.srcObject = stream;
                })

                peer.signal(callerSignal) //That was set when call arrived. 
                connectionRef.current = peer
            }

            const leaveCall =() => {
                setCallEnded (true)
                connectionRef.current.destroy()
            }

            


   
           
       //others
           
            
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

         

            useEffect(() => { 
                socketRef.current.on("getMessage", messageData =>{
                    console.log(messageData);
                    console.log("Message Gotten");
                    dispatch ({type: 'SOCKET_GOT_MESSAGE', payload: messageData});
                    console.log(messageData);

                    })
                }, []);
               
                //Wallet
                useEffect(() => {
                    if(user){
                        dispatch(getWalletAction(user.result._id));
                    }
                }, []); 

        

            //follows
            useEffect(() => {

                if(user){
                    dispatch(getUserProfileAction()); 
                //   dispatch ({type: 'REGISTER_FOLLOWS', data:user.result.follows});
                //   dispatch(registerFollowsAction(user.result._id)); 
                //   console.log(user.result.follows);

                }

            }, []); 
             
            //UserData
            //  useEffect(() => {

            //     if(user){

            //       dispatch (getUserDataAction()); 
              

            //     }

            // }, [user]); 

            const follows = useSelector((state) => state.followsReducer);
            console.log(follows);


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
       
   
    

    return (
        <>


       

          {/* <CallPair stream= {stream} myVideo={myVideo} userVideo={userVideo}/> */}
        <div className= "sticky top-0 z-50">
          
              {/*==============SIGN UP/ LOGIN =================*/}
            {user && !user.result.verified  ? <VerifyForm popSignup ={popSignup} popLogin = {popLogin} setpopSignup = {setpopSignup}  setpopLogin ={setpopLogin}/> : <></>} 
            { popSignup && !user ? <SignupForm popSignup ={popSignup} popLogin = {popLogin} setpopSignup = {setpopSignup}  setpopLogin ={setpopLogin}/> : <></>}
            {popLogin && !user ? <LoginForm  popLogin = {popLogin} popSignup ={popSignup}  setpopLogin ={setpopLogin} setpopSignup = {setpopSignup} />: <></>}
       
        <div className= {`sticky top-0 z-50 bg-gray-100 ${(popSignup || popLogin) && !user && 'bg-gradient-to-r from-teal-300 to-cyan-500 rounded-r-full w-11/12 px-3' }  dark:bg-gray-900 border-b border-cyan-400 dark:border-gray-600 p-2 lg:px-3 lg:py-3 shadow-md `}>
       
                        {/* Calling Modal */}
                    <>
                
                            {receivingCall && <div className='fixed flex items-center h-screen  w-screen top-0 left-0 z-50 bg-gray-300 dark:bg-gray-800 w-screen h-screen'>
                                <div className="relative flex w-full items-center"> 

                                            <div className= "flex justify-center items-center bg-gray-100 dark:bg-gray-900 items-center m-auto w-screen h-screen rounded-xl p-1 text-center border border-gray-300"> 
                                                <div className="flex justify-center items-center text-white dark:text-gray-900 items-center pt-4 m-auto">
                                                
                                                {stream && callAccepted && userVideo && <video playsInline ref={userVideo} autoPlay/>}

                                                   {caller && !callAccepted &&

                                                        <div className='space-y-4'>
                                                            <div className='rounded-full flex justify-center items-center  bg-green-600 h-full w-64'>
                                                                <img src={caller.dpUrl} alt="DP" className="p-0.5 object-fit rounded-full h-40 w-40 "/>
                                                            </div>

                                                        
                                                            <div className='text-gray-100 text-xl dark:text-gray-100'>
                                                                <p>Incoming call from @{caller.userName} </p>
                                                                
                                                                <BeatLoader size={16} color='teal' />

                                                                {stream && <div className= 'm-2 text-sm space-y-1'> 
                                                                    <div onClick={pickCall} className=' m-auto rounded-full flex justify-center items-center hover:bg-green-500 bg-green-600 h-16 w-16'>
                                                                        <BsCameraVideo size={32}/>
                                                                    </div>
                                                                    <p>pick</p>
                                                                </div>}
                                                            </div>
                                                        
                                                    
                                                    </div>} 
                                                
                                                </div>
                                                
                                            </div> 

                                            <div className= "absolute bottom-32 right-0 bg-gray-100 dark:bg-gray-900 items-center m-auto w-40 h-40  rounded-xl p-1 text-center border border-gray-300"> 
                                                <div className="flex justify-around text-white dark:text-gray-900 items-center pt-4 m-auto">
                                                {stream && <video playsInline ref={myVideo} autoPlay/>}
                                                </div>
                                            </div>  
                                            {callAccepted && 
                                            <div className='absolute p-4 h-min  bottom-2 w-screen flex justify-center space-x-7'>

                                                <div className='rounded-full flex justify-center items-center hover:bg-green-500 bg-green-600 h-12 w-12'>
                                                    <BsCameraVideo size={28}/>
                                                </div>
                                                <div className='rounded-full flex justify-center items-center hover:bg-gray-500 bg-gray-600 h-12 w-12'>
                                                    <BsCameraVideoOff size={28}/>
                                                </div>
                                                <div className='rounded-full flex justify-center items-center hover:bg-gray-500 bg-gray-600 h-12 w-12'>
                                                    <BsMicMute size={28}/>
                                                </div>
                                                <div className='rounded-full flex justify-center items-center hover:bg-red-500 bg-red-600 h-12 w-12'>
                                                    <MdOutlineCancel size={28}/>
                                                </div>
                                            

                                            </div> }       
                                    
                                    </div>  
                            </div>}

                            {sendingCall && <div className='fixed flex items-center h-screen  w-screen top-0 left-0 z-50 bg-gray-300 dark:bg-gray-800 w-screen h-screen'>
                                <div className="relative flex w-full items-center"> 

                                            <div className= "flex justify-center items-center bg-gray-100 dark:bg-gray-900 items-center m-auto w-screen h-screen rounded-xl p-1 text-center border border-gray-300"> 
                                                <div className="flex justify-center items-center text-white dark:text-gray-900 items-center pt-4 m-auto">
                                                {stream && <video ref={userVideo} autoPlay/>}

                                                   {caller && 
                                                   <div className='space-y-4'>
                                                        <div className='rounded-full flex justify-center items-center  bg-green-600 h-full w-64'>
                                                            <img src={caller.dpUrl} alt="DP" className="p-0.5 object-fit rounded-full h-40 w-40 "/>
                                                        </div>

                                                        {
                                                        <div className='text-gray-100 text-xl dark:text-gray-100'>
                                                            <p>Incoming call from @{caller.userName} </p>
                                                            
                                                            <BeatLoader size={16} color='teal' />

                                                            {stream && <div className= 'm-2 text-sm space-y-1'> 
                                                                <div className=' m-auto rounded-full flex justify-center items-center hover:bg-green-500 bg-green-600 h-16 w-16'>
                                                                <BsCameraVideo size={32}/>
                                                                </div>
                                                                <p>pick</p>
                                                            </div>}
                                                        </div>
                                                        }
                                                    
                                                    </div>} 
                                                
                                                </div>
                                                
                                            </div> 

                                            <div className= "absolute bottom-32 right-0 bg-gray-100 dark:bg-gray-900 items-center m-auto w-40 h-40  rounded-xl p-1 text-center border border-gray-300"> 
                                                <div className="flex justify-around text-white dark:text-gray-900 items-center pt-4 m-auto">
                                                {stream && <video ref={myVideo} autoPlay/>}
                                                </div>
                                            </div>  
                                            <div className='absolute p-4 h-min  bottom-2 w-screen flex justify-center space-x-7'>

                                                <div className='rounded-full flex justify-center items-center hover:bg-green-500 bg-green-600 h-12 w-12'>
                                                    <BsCameraVideo size={28}/>
                                                </div>
                                                <div className='rounded-full flex justify-center items-center hover:bg-gray-500 bg-gray-600 h-12 w-12'>
                                                    <BsCameraVideoOff size={28}/>
                                                </div>
                                                <div className='rounded-full flex justify-center items-center hover:bg-gray-500 bg-gray-600 h-12 w-12'>
                                                    <BsMicMute size={28}/>
                                                </div>
                                                <div className='rounded-full flex justify-center items-center hover:bg-red-500 bg-red-600 h-12 w-12'>
                                                    <MdOutlineCancel size={28}/>
                                                </div>
                                            

                                            </div>        
                                    
                                    </div>  
                            </div>}

                  
                    </>

       
        <div className= "flex items-center  p-0  space-x-2 justify-between">
            {/*Left*/}
            { user && user.result.verified ?
            <>
            <Link to='/'>
                <div onClick ={(e)=>(setpopContacts(false))}className="cursor-pointer  rounded-full hover:bg-gray-300 dark:hover:bg-cyan-500 dark:hover:text-gray-900 delay-100 bg-transparent flex items-center justify-between">
                            
                            <div className= 'rounded-full items-center text-gray-200 bg-gray-100 object-cover'>
                                <img src="./assets/images/whitelogo.png" alt="DP" className="p-0.5 rounded-full h-8 w-8 sm:h-10 sm:w-10"/>
                            </div>

                            
                            <>
                                <h1 className= "m-1 pr-2 inline-flex font-bold text-sm ">Go Home</h1>
                               
                            </>
                       
                </div>
           </Link> 
        
            {/* MID SEARCH COMP */}
                <div className="hidden lg:flex items-center rounded-full w-1/2 mx-1  sm:pr-4">
                 
                 <Search/>
            
                </div>
                </>
       
       :
       
           <div onClick ={logout} className='flex justify-end w-full'>
                <Link to='/'>
                    <div  className="cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 bg-transparent flex items-center justify-between">

                                <> 
                                    <h1 className= "m-1 inline-flex text-sm items-center font-light p-1"><GiPadlock/>{user && !user.result.verified && <>Go Back to  </>} User-Auth</h1> 
                                    
                                </>
                                <div className= 'rounded-full items-center  bg-gray-100 object-cover'>
                                    <img src="./assets/images/whitelogo.png" alt="DP" className="p-0.5 rounded-full h-8 w-8 "/>
                                </div>
                                
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
                            <HeaderRightIcon LgIcon = {GiMoneyStack} badge={unreadTipNotifications?.length} active={popTipNotifications}/>
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
                            <HeaderRightIcon Icon = {BellIcon} badge={unreadNormalNotifications.length} active={popNotifications}/>
                            </div>
                            {popNotifications && <NotificationsModal setshowNotifications={setpopNotifications} />}
                            
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
                                <HeaderRightIcon Icon = {ChatIcon} badge={unreadMessages.length} active={popContacts}/> 
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
                        <div className={`cursor-pointer inline-flex items-center dark:hover:text-gray-800 justify-center rounded-full bg-transparent delay-150  hover:bg-gray-300 dark:hover:bg-cyan-400 ${popProfile && 'bg-gray-300 dark:text-gray-800 dark:bg-cyan-400'} mx-1`}
                     onClick={ () => 
                         {
                            setpopProfile(!popProfile);
                            setpopContacts(false);
                        }
                     }>
                     
                        <img src={user.result.dpUrl}  className="rounded-full m-0.5 group-hover:text-white h-8 w-8"/>
                                             
                        <span className="hidden md:inline-flex w-full text-sm font-semibold mr-2">@{user.result.userName}</span>
                        </div>

                     {popProfile && 
                     <ProfileModal setpopProfile= {setpopProfile} setPopSaved ={setPopSaved} themer={themer} setThemer={setThemer} />}
                    
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
                            <div className={`${popRankings===true && 'bg-cyan-400' } ${popRankings===false && 'bg-transparent' }  bg-transparent hover:bg-cyan-400 rounded-full p-1 group`}
                            onClick={ () => 
                            {setpopRankings(!popRankings)}
                            }>
                            {/* <HashtagIcon className ="h-6 group-hover:text-white cursor-pointer text-gray-400"/> */}
                                <div className="w-8 h-8 bg-gray-800  text-white flex justify-center items-center rounded-full">
                                <RiVipCrownFill/>
                                </div>
                            </div>
                            {
                            popRankings &&

                             <LeftbarMob setpopRankings={setpopRankings}/>  // HALL OF FAME=========================
                             
                             }
                            
                        </OutsideClickHandler> 
                    </div>
                

                {/* // SEARCH============ */}
                
                <div className="lg:hidden flex justify-center items-center rounded-full w-full mx-2 my-2 ">
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
                    <div className="fixed p-4  w-full rounded-xl sm:rounded-none mt-6 h-full sm:mt-2  top-0 z-0 flex justify-center bg-gray-200 dark:bg-black">
                            <div className="p-1 m-auto overflow-scroll">

                                <div className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl bg-gray-100 dark:bg-gray-800 items-center mt-0 mb-3 group">
                                    <img src={user.result.dpUrl} alt="DP" className="mx-auto rounded-full group-hover:text-white h-12 w-12"/>
                                    <p className= "text-gray-500 dark:text-gray-300 leading-4 text-center text-sm font-bold"> CONGRATULATIONS!</p> 
                                    <div className="bg-gray-200 dark:bg-gray-900 rounded-md p-3 items-center"> 
                                        <p className= "text-gray-800 dark:text-gray-400 leading-4 text-center text-xs font-light">We are happy to Award You</p> 
                                        <p className= "text-gray-600 dark:text-gray-400 leading-4 text-center text-sm font-bold"> 10 Daily Points </p>                                       
                                    </div>                                   
                                </div>  
                                {/* <p className= "text-gray-500 pt-3 text-center text-lg font-bold">Thank you For Logging in Today</p> */}
                               
                                {loadingPointer === false &&<div onClick= {handlePointer} className="bg-teal-400 hover:bg-teal-500 cursor-pointer w-20 mx-auto m-2 rounded-md py-1 items-center"> 
                                        <p className= "p-2 text-gray-100 dark:text-gray-900 leading-4 text-center font-bold"> CLAIM </p>                                       
                                    </div>}
                                    {loadingPointer === true && <div className="bg-teal-400 hover:bg-teal-500 cursor-pointer w-20 flex justify-center mx-auto m-2 rounded-md py-1 items-center"> 
                                        <BeatLoader size={7} color='white' loading/>                                      
                                    </div>}    

                                <p className= "text-gray-700 dark:text-gray-400 text-center text-xs font-light p-1">More in the next 24 Hours</p> 
                                
                            </div>
                        </div>
                    } 



                   
            </div>
       
                    </>
 
       
            
        
    )
}

export default Header;
