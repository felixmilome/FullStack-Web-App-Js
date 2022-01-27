export const notificationsReducer = (notifications = [], action) => {
     
    switch(action.type) {
        case 'POST_NOTIFICATIONS':
            return notifications;
        case 'GET_NOTIFICATIONS': 
            return action.payload;      
        case 'SOCKET_GOT_NOTIFICATION':    
            return [...notifications, action.payload];
        default:
            return notifications; 
     }
     
 }

