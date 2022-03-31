
 // NOT NECESSARY, ITS GETTING ALL CONVOS ON EVERY REFRESH
// export const convosOpenedReducer = (convosOpenCheck = false, action) => {
//     switch(action.type){ //getfalse or array not needed since convo rightbar is only one
                       
        
//         case 'CONVO_OPENED':
//             return true
//         default:
//             return convosOpenCheck; 
//     }
// } 
export const messagesOpenedReducer = (messagesOpenCheck = [], action) => { // use if not equal to true or let convoRow send false 
    switch(action.type){
        case 'MESSAGES_OPENED':
            return [...messagesOpenCheck, action.payload];
        default: 
            return messagesOpenCheck;
    }
}
export const reviewsOpenedReducer = (reviewsOpenCheck = [], action) => { // use if not equal to true or let diary send false 
    switch(action.type){
        case 'REVIEWS_OPENED':
            return [...reviewsOpenCheck, action.payload];
        default:
            return reviewsOpenCheck;
    }
}
export const tipDiaryOpenedReducer = (diaryTipsOpenCheck = [], action) => { // use if not equal to true or let diary s
    switch(action.type){
        case 'DIARYTIPS_OPENED':
            return [...diaryTipsOpenCheck, action.payload];
        default:
            return diaryTipsOpenCheck;
    }
}
export const tipReviewOpenedReducer = (reviewTipsOpenCheck = [], action) => { // use if not equal to true or let diary s
    switch(action.type){
        case 'REVIEWTIPS_OPENED':
            return [...reviewTipsOpenCheck, action.payload];
        default:
            return reviewTipsOpenCheck;
    }
}