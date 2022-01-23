export const socketReducer = (socket = [], action) => {
     
    switch(action.type) {
        case 'SOCKET_SETUP':
            return action.payload
        default:
            return socket; 
     }
     
 }