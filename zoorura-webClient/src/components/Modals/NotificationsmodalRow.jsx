import moment from 'moment'; 
function NotificationsmodalRow ({notification}) {
    return (
        <div className= {`items-center my-1 text-gray-500 hover:bg-white ${notification.read === false && 'border-b-2 border-cyan-400'} rounded-md shadow-md cursor-pointer group p-3`}>
           
            <div className="flex text-xs  items-center space-x-2 mt-2 ">
                <img src= {notification.sender.dpUrl} alt="dp" className= "inline-flex w-10 h-10 bg-white group-hover:bg-gray-600 cursor-pointer object-cover rounded-full "/>
            <div className="space-x-1">
                {/* <p className= "inline-flex font-bold">
                {title}</p> */}
                <p className= "inline-flex ">
                @{notification.sender.userName}</p> 

            
 
                <p className= "sm:text-center font-bold ">

                    {notification.type ==='review' &&  
                        <>
                            <p className= "font-semibold ">reviewed your post titled:</p>
                            <p className= "font-light text-left">"{notification.body}"</p>
                        </>
                    }
                    {notification.type ==='reviewReply' && 
                        <>
                            <p className= "font-semibold ">replied to your review on the post titled:</p>
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
                            <div className= 'py-1 flex items-center space-x-3 font-semibold text-white'>
                                <div className='p-2 bg-teal-400 hover:bg-teal-600 cursor-pointer rounded w-full flex justify-center'>
                                    Approve
                                </div>
                            {/* <div className='p-2 bg-red-400 hover:bg-red-600 cursor-pointer rounded  w-12 flex justify-center'>
                                    No
                                </div> */}
                            </div>
                        </>
                    }
                    
                    {notification.type ==='follow' && 'subscribed to you'}
                   
                
                </p>
        
                <p className= "font-light text-gray-500"> 
                    {moment (notification.createdOn).fromNow()}</p>
                </div>
            </div>
        </div>

        
       
    )
}

export default NotificationsmodalRow; 
