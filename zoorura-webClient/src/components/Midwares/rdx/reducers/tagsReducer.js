export const tagsReducer = (tags = [], action) => {
     
    switch(action.type) { 
             
        case 'GET_TAGS': 
      
            return action.payload;
            
        default:
            return tags; 

     }
     
 } 