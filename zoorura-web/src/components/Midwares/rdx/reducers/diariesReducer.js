export const diariesReducer = (diaries = [], action) => {
     
    switch(action.type) {
        case 'DELETE_DIARY':
            return diaries.filter((diary)=> diary._id !== action.payload);
        case 'PATCH_DIARY':
        case 'REVIEW_DIARY':
        case 'TIP_DIARY':
            return diaries.map((diary) => diary._id === action.payload._id ? action.payload : diary);
        case 'GET_ALL_DIARIES':
             return action.payload;
        case 'POST_DIARY':
            return [...diaries, action.payload];
        default:
            return diaries;
     }
     
 }

