import moment from 'moment'; 
import {readNotificationsAction} from '../Midwares/rdx/actions/notificationsAction.js';
import { postTipsAction } from '../Midwares/rdx/actions/tipsAction.js';
import{useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {SurePop} from '../Body/SurePop';
import{DeliveryPop} from '../Modals/DeliveryPop';

//search his

function NotificationsmodalRow ({notification}) {  

    const [unread, setUnread] = useState(false);
    const [tipDelivery, setTipDelivery] = useState(false);
    const [popTip, setPopTip] = useState(false); //this does nothing. Just coz TipAction demands
    const [tipLoading, setTipLoading] = useState(false);
    const [popSure, setPopSure] = useState(false);
    const [tipData, setTipData] = useState({receiverId:'', tippedPostId:'', type:'', amount: null});
   
    const user = JSON.parse(localStorage.getItem('profile'));

    const socket = useSelector((state) => state.socketReducer);
    
 
        const dispatch = useDispatch();  

        useEffect(() => { 
            if(notification?.read === false){
                setUnread(true); //Mark BLUE and keep despite object edited to read.
                console.log(notification?.read);  
                dispatch(readNotificationsAction(notification?._id));             
            } 
        }, [notification]);

        const prepareTip = (tipAmount, type) => {

            setTipData ({receiverId:notification?.sender?._id, tippedPostId:notification?._id, type:type, amount: tipAmount});
            setPopSure(true);
            console.log(tipData); 
    
        }
        
        
        const tipDisplayNotification = ()=> {
            setTipLoading(true);
            dispatch(postTipsAction(tipData, setPopSure, setPopTip, setTipLoading, setTipDelivery, socket)); 
        }
        const setTipFalse = ()=> {
            setPopSure(false);
        }
    //Already
    return (
        <>

          { popSure &&
            <SurePop action={'Tip'} token={tipData.amount} message={`to ${notification?.sender?.userName} for endorsing your post`} loadingFunction={tipLoading} loadingMessage ={'Verifying Tip'} yesFunction= {tipDisplayNotification} noFunction = {setTipFalse} /> 
           }
            {tipDelivery &&
                <DeliveryPop message='Tip Sent'/>
            }
           
        <div style={{wordBreak: 'break-word'}} className= {`items-center my-1 text-gray-500  dark:text-gray-300 hover:bg-white dark:hover:bg-black ${unread === true && 'border-l-2 border-cyan-400'} rounded-md shadow-md cursor-pointer group p-3`}>
             
            <div className="flex text-xs  items-center space-x-2 mt-2 ">
                <img src= {notification?.sender?.dpUrl} alt="dp" className= "inline-flex w-10 h-10 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-full "/>
                <div className="space-x-1">
                    {/* <p className= "inline-flex font-bold">
                    {title}</p> */}
                    
                    {notification.sender._id !== user.result._id &&  <p className= "inline-flex ">
                    @{notification.sender.userName}
                    </p> }
                    {notification.sender._id === user.result._id &&  <p className= "inline-flex ">
                        You
                    </p> }

                
    
                    <p className= " font-bold">

                        {notification?.type ==='review' &&  
                            <>
                                <p className= "font-semibold ">reviewed your post titled:</p>
                                <p className= "font-light text-left">"{notification?.body}"</p>
                            </>
                        }
                        {notification?.type ==='reviewReply' && 
                            <>
                                <p className= "font-semibold ">replied to your review on the post titled:</p>
                                <p className= "font-light text-left">"{notification?.body}"</p>
                            </>
                        }
                        {notification?.type ==='display' &&  
                            <>
                                <p > endorsed your post titled <span className= "font-light text-left">"{notification?.body}"</span></p>
                                
                                <p > to {notification?.sender?.followers?.length}
                                 {notification?.sender?.followers?.length === 1 ? ' person': ' people'}
                                 </p>
                                {notification?.tipped ===false 
                                && <div onClick= {()=>prepareTip(notification?.tipAmount, 'displayNotificationTip')} className='p-2 bg-teal-400 text-white hover:bg-teal-500 dark:bg-teal-600 dark:hover:bg-teal-500 cursor-pointer rounded w-max my-1 flex justify-center'>
                                      Thank with {notification?.tipAmount}
                                      {notification?.tipAmount === 1 ? ' tip': ' tips'}
                                    </div>}

                                {notification?.tipped ===true
                                 && <div className='p-2 bg-gray-400 dark:bg-gray-600 text-white rounded w-max my-1 flex justify-center'>
                                     <p>Already Tipped</p>
                                </div>}
                            </>
                        }
                        {notification?.type ==='freeConvo' && 
                            <>
                                <p >is requesting a Free Convo</p>
                                <p className= "font-light text-left">"{notification?.body}"</p>
                                <div className= 'py-1 flex items-center space-x-3 font-semibold text-white'>
                                    <div className='p-2 bg-teal-400 dark:bg-teal-600 dark:hover:bg-teal-700 hover:bg-teal-600 cursor-pointer rounded w-full flex justify-center'>
                                        Approve
                                    </div>
                                {/* <div className='p-2 bg-red-400 hover:bg-red-600 cursor-pointer rounded  w-12 flex justify-center'>
                                        No
                                    </div> */}
                                </div>
                            </>
                        }
                        
                        {notification?.type ==='follow' && 'subscribed to you'}
                    
                    
                    </p>
            
                    <p className= "font-light text-gray-500"> 
                        {moment (notification?.createdOn).fromNow()}
                    </p>
                </div>
            </div>
        </div>
       
        </>
        
       
    )
}

export default NotificationsmodalRow; 
