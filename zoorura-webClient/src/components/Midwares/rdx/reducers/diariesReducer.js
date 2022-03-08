export const diariesReducer = (diaries = [], action) => {
     
    switch(action.type) {
        case 'DELETE_DIARY': 
            return diaries.filter((diary)=> diary._id !== action.payload);
        case 'PATCH_DIARY':
        case 'REVIEW_DIARY':
        case 'TIP_DIARY':
        case 'DISPLAY_DIARY':
            return diaries.map((diary) => diary._id === action.payload._id ? action.payload : diary);   
        case 'GET_ALL_DIARIES':
             return action.payload;
               // if (diaries.length < 50){
                //return action.payload];
                // }
                // else if (diaries.length > 49){
                //     return action.payload;
                // }
        case 'POST_DIARY':
            return diaries;
        default:
            return diaries;  
     }
     
 }


