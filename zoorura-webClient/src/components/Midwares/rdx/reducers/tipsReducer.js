export const tipsReducer = (tips = [], action) => {
     
    switch(action.type) {

        case 'GET_POST_TIPS':
             return tips.concat(action.payload); //array plus array use concat       
        case 'POST_TIP':
            return [...tips, action.payload]; //array plus obj use spread
        default: 
            return tips;  
     }
     
 }