export const profileReducer = (state ={googleauthData: null}, action) => {
     
    switch(action.type) {
        case 'CHANGE_DP':
            console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, googleauthData: action?.data};
        case 'GET_MINI_PROFILE':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
            
     }
     
 }