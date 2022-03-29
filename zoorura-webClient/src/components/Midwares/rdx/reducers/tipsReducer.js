export const tipsReducer = (tips = [], action) => {
     
    switch(action.type) {

        case 'GET_POST_TIPS':
             return tips.concat(action.payload);        
        case 'POST_TIP':
            return [...tips, action.payload];
        default: 
            return tips;  
     }
     
 }