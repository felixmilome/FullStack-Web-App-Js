export const reviewsReducer = (reviews = [], action) => {
     
    switch(action.type) {
        case 'DELETE_REVIEW':
            return reviews.filter((review)=> review._id !== action.payload);
        case 'PATCH_REVIEW':
            return reviews.map((review) => review._id === action.payload._id ? action.payload : review);
        case 'GET_POST_REVIEWS':
             return reviews.concat(action.payload);       
        case 'SOCKET_GOT_REVIEW':    
        case 'POST_REVIEW':
            return [...reviews, action.payload];
        default:
            return reviews;  
     }
     
 }