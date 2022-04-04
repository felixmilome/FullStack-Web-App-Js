import TipNotificationsRow from './TipNotificationsRow';
import {useSelector} from 'react-redux';

function TipNotificationsModal({setshowSubscribers}) { 

    const allNotifications = useSelector((state) => state.notificationsReducer);
    const tipNotifications = allNotifications.filter(notification => notification.class === 'tip' ); 

    return (
        <div className="fixed border-l-8 border-gray-200 p-4 sm:w-1/4 w-2/3 mt-4 sm:rounded-none sm:mt-2 right-0 sm:right-2 top-20 h-full z-0 flex justify-center bg-gray-200">

            <div className="overflow-scroll">

                    {/* <div className="p-1 flex justify-center items-center rounded-full mx-4 mt-2 cursor-pointer hover:bg-gray-500 hover:text-white font-light text-gray-400 bg-gray-100"
                     onClick={ () => 
                        { setshowSubscribers(false);}
                        }>
                        hide
                    </div> */}

            {/* Heading */}
           
                <div className= "cursor-pointer mx-3 p-3 space-y-2 rounded-xl hover:bg-cyan-500  bg-gray-100 items-center mt-4 mb-3 group">
                    <p className= "text-gray-500 text-center text-sm font-semibold group-hover:text-white">Tip Notifications</p> 
                </div>  
            
                <div className= "mb-60 border-gray-200 border-t">
                    {   
                        tipNotifications.sort((a, b) => a.dateRank < b.dateRank ? 1 : -1).map((notification) =>(

                            <TipNotificationsRow key= {notification._id} notification={notification}/>  
                       
                        ))
                    } 
                    </div>

            </div>

        </div>
    )
}

export default TipNotificationsModal;
