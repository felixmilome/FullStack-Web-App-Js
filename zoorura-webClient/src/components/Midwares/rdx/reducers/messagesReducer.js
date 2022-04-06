export const messagesReducer = (messages = [], action) => {
     
    switch(action.type) {
        case 'DELETE_MESSAGE':
            return messages.filter((message)=> message._id !== action.payload);
        case 'PATCH_MESSAGE':
        case 'TIP_MESSAGE':
            return messages.map((message) => message._id === action.payload._id ? action.payload : message);
        case 'GET_ALL_MESSAGES':
           
             return messages.concat(action.payload);
        case 'READ_MESSAGES':
            
            const markedRead = messages.map((message) => message._id === action.payload._id ? action.payload : message);
            console.log(markedRead);
            return markedRead; 
           
        case 'SOCKET_GOT_MESSAGE':    
        case 'POST_MESSAGE':
            return [...messages, action.payload];
        default:
            return messages; 
     }
     
 }