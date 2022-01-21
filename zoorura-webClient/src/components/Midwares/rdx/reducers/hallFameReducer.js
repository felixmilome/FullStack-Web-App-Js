export const hallFameReducer = (hallFame = [], action) => {
    switch(action.type){
        case 'GET_HALL_FAME':
            return action.payload;
        default:
            return hallFame;
    }
}