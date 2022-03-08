 export const savedDiariesReducer = (savedDiaries = [], action) => {
     
    switch(action.type) {
       
        case 'DELETE_SAVED_DIARY':
            return savedDiaries.filter((savedDiary)=> savedDiary._id !== action.payload); 
        case 'GET_SAVED_DIARY':
             return action.payload;
        case 'SAVE_DIARY':
            return [...savedDiaries, action.payload]; 
        default:
            return savedDiaries;
     }
     
 }