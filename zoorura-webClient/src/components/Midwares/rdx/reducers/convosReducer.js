export const convosReducer = (convos = [], action) => {
     
    switch(action.type) {
        case 'DELETE_CONVO':
            return convos.filter((convo)=> convo._id !== action.payload);
        case 'PATCH_CONVO':
            return convos.map((convo) => convo._id === action.payload._id ? action.payload : convo);
        case 'GET_ALL_CONVOS':
             return action.payload;
             
        case 'POST_CONVO':
            return convos;
        default:
            return convos; 
     }
     
 }