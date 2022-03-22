export const headSearchReducer = (result = [], action) => {
     
    switch(action.type) {
       
       
        case 'HEAD_SEARCH':
             return action.payload;
     
        default:
            return result;
     }
     
 }