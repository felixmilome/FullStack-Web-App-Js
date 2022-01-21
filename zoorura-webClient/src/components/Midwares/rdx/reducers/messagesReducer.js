export const messagesReducer = (messages = [], action) => {
     
    switch(action.type) {
        case 'DELETE_MESSAGE':
            return messages.filter((message)=> message._id !== action.payload);
        case 'PATCH_MESSAGE':
            return messages.map((message) => message._id === action.payload._id ? action.payload : message);
        case 'GET_ALL_MESSAGES':
             return action.payload;
             
        case 'POST_MESSAGE':
            return [...messages, action.payload];
        default:
            return messages; 
     }
     
 }