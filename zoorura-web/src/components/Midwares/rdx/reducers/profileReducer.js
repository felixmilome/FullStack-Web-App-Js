export const dpReducer = (state ={googleauthData: null}, action) => {
     
    switch(action.type) {
        case 'CHANGE_DP':
            console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, googleauthData: action?.data};
        default:
            return state;
            
     }
     
 }
 export const getMiniProfileReducer = (miniProfile = {}, action) => {
     
    switch(action.type) {
        case 'GET_MINI_PROFILE':
            return action?.data;
         
        default:
            return miniProfile; 
            
     }
     
 }