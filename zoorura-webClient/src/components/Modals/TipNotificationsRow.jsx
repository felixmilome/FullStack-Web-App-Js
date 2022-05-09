
import moment from 'moment'; 
import {readNotificationsAction} from '../Midwares/rdx/actions/notificationsAction.js';
import{useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';

function TipsNotificationsRow ({notification}) {
    
    const [unread, setUnread] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));

    const dispatch = useDispatch();  

    useEffect(() => { 
        if(notification.read === false){
            setUnread(true); //Mark BLUE and keep despite object edited to read.
            console.log(notification.read);  
            dispatch(readNotificationsAction(notification._id));             
        }
    }, [notification]); 

    return (
        <div style={{wordBreak: 'break-word'}}  className= {`items-center my-1 text-gray-500 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-900 ${unread === true && 'border-b-2 border-cyan-400'} rounded-md shadow-md cursor-pointer group p-3`}>
           
            <div className="flex text-xs  items-center space-x-2 mt-2 ">
                <img src= {notification.sender.dpUrl} alt="dp" className= "inline-flex w-10 h-10 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-full "/>
            <div className="space-x-1">
                {/* <p className= "inline-flex font-bold">
                {title}</p> */}
               
               {notification.sender._id !== user.result._id &&  <p className= "inline-flex ">
                @{notification.sender.userName}
                </p> }
                {notification.sender._id === user.result._id &&  <p className= "inline-flex ">
                    You
                </p> }

            
  
                <p className= " font-bold ">

                    {notification.type ==='tipConvo' && 
                        <>
                            <p className= "font-semibold ">tipped ({notification.tipAmount}) to start a Convo with you</p>
                            <p className= "font-light text-left">"{notification.body}"</p>
                        </>
                    }
                    {notification.type ==='messageTip' && 
                        <>
                            <p className= "font-semibold ">tipped ({notification.tipAmount})  on your Message:</p>
                            <p className= "font-light text-left">"{notification.body}"</p>
                        </>          
                    }
                    {notification.type ==='diaryTip' && 
                        <>
                            <p className= "font-semibold ">tipped ({notification.tipAmount}) on your Post titled:</p>
                            <p className= "font-light text-left">"{notification.body}"</p>
                        </>      
                    }
                    {notification.type ==='reviewTip' && 
                        <>
                            <p className= "font-semibold ">tipped ({notification.tipAmount}) on your Review:</p>
                            <p className= "font-light text-left">"{notification.body}"</p>
                        </>      
                    }
                    
                    {notification.type ==='displayNotificationTip' && 
                        <>
                            <p className= "font-semibold ">tipped ({notification.tipAmount}) for endorsing the post:</p>
                            <p className= "font-light text-left">"{notification.body}"</p>
                        </>      
                    }



                     {notification.type ==='display' && 
                        <>
                            <p > endorsed your post titled:</p>
                            <p className= "font-light text-left">"{notification.body}"</p>
                        </>
                    }
                     {notification.type ==='freeConvo' && 
                        <>
                            <p >is requesting a Free Convo</p>
                            <p className= "font-light text-left">"{notification.body}"</p>
                        </>
                    }
                    
                    {notification.type ==='follow' && 'subscribed to you'}
                   
                
                </p>
               { notification.type ==='freeConvo' &&
                    <div className= 'py-1 flex items-center space-x-3 font-semibold text-white'>
                        <div className='p-2 bg-teal-400 hover:bg-teal-600 cursor-pointer rounded w-full flex justify-center'>Approve</div>
                        {/* <div className='p-2 bg-red-400 hover:bg-red-600 cursor-pointer rounded  w-12 flex justify-center'>No</div> */}
                    </div>
                }

                <p className= "font-light text-gray-500 "> 
                    {moment (notification.createdOn).fromNow()}</p>
                </div>
            </div>
        </div>
       
    )
}

export default TipsNotificationsRow; 
