export const profileReducer = (state ={googleauthData: null}, action) => {
     
    switch(action.type) {
        case 'DP':
            console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, googleauthData: action?.data};
        default:
            return state;
            
     }
     
 }