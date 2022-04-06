export const notificationsReducer = (notifications = [], action) => {
     
    switch(action.type) {
        case 'POST_NOTIFICATIONS': 
            return notifications;
        case 'GET_NOTIFICATIONS': 
            return action.payload;
        case 'READ_NOTIFICATIONS': 

           //const remaining = notifications.filter((notification)=> notification._id !== action.payload._id);
            const markedRead = notifications.map((notification) => notification._id === action.payload._id ? action.payload : notification);
            //return [...notifications, action.payload];
            console.log(markedRead);
            //return remaining.concat(action.payload); 
            return markedRead;
       
        case 'READ_CONVO_NOTIFICATIONS': 

            const remaining = notifications.filter((notification)=> notification.postId !== action.payload);
            console.log(remaining);
            return remaining;
   
        case 'SOCKET_GOT_NOTIFICATION':     
            return [...notifications, action.payload];
        default:
            return notifications; 
     }
     
 }

