export const notificationsReducer = (notifications = [], action) => {
     
    switch(action.type) {
        case 'POST_NOTIFICATIONS': 
            return notifications;
        case 'GET_NOTIFICATIONS': 
            return action.payload;
            
        case 'TIP_DISPLAY_NOTIFICATION':
            return notifications.map((notification) => notification._id === action.payload._id ? action.payload : notification);
       
        case 'READ_NOTIFICATIONS': 

            const markedRead = notifications.map((notification) => notification._id === action.payload._id ? action.payload : notification);
            console.log(markedRead);
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

