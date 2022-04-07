export const diariesReducer = (diaries = [], action) => {
     
    switch(action.type) {

        case 'GET_FOLLOWED_DIARIES':
             return action.payload;


        case 'DELETE_DIARY': 
            return diaries.filter((diary)=> diary._id !== action.payload);
        case 'PATCH_DIARY':
        case 'REVIEW_DIARY':
        case 'TIP_DIARY':
        case 'DISPLAY_DIARY':
            return diaries.map((diary) => diary._id === action.payload._id ? action.payload : diary);   
        
        case 'POST_DIARY':
            return diaries;

        default:
            return diaries;  
     }
     
 }
 export const popularDiariesReducer = (diaries = [], action) => {
     
    switch(action.type) {
         
        case 'GET_POPULAR_DIARIES':
             return action.payload;

     
        case 'DELETE_DIARY': 
             return diaries.filter((diary)=> diary._id !== action.payload);
        case 'PATCH_DIARY':
        case 'REVIEW_DIARY':
        case 'TIP_DIARY':
        case 'DISPLAY_DIARY':
            return diaries.map((diary) => diary._id === action.payload._id ? action.payload : diary); 
             return diaries;
             
             default:
                return diaries;  
       
     }
     
 }
 export const randomDiariesReducer = (diaries = [], action) => {
     
    switch(action.type) {
         
        case 'GET_RANDOM_DIARIES': 
             return action.payload;

      
        case 'DELETE_DIARY': 
             return diaries.filter((diary)=> diary._id !== action.payload);
        case 'PATCH_DIARY':
        case 'REVIEW_DIARY':
        case 'TIP_DIARY':
        case 'DISPLAY_DIARY':
            return diaries.map((diary) => diary._id === action.payload._id ? action.payload : diary); ;
     

             default:
                return diaries;  
       
     }
     
 }
 export const usersDiariesReducer = (diaries = [], action) => {
     
    switch(action.type) {
         
        case 'GET_USERS_DIARIES':
             return action.payload;

        case 'DELETE_DIARY': 
             return diaries.filter((diary)=> diary._id !== action.payload);
        case 'PATCH_DIARY':
        case 'REVIEW_DIARY':
        case 'TIP_DIARY':
        case 'DISPLAY_DIARY':
            return diaries.map((diary) => diary._id === action.payload._id ? action.payload : diary);   
        
            default:
            return diaries;  
       
     }
     
 } 


