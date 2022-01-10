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
        case 'FOLLOW':
            return action?.data;
         
        default:
            return miniProfile; 
            
     }
     
 }
//  export const followReducer = (follows = {}, action) => {
     
//     switch(action.type) {
//         case 'FOLLOW':
           
//             return action?.data;
           
//         default:
//             return follows; 
            
//      }
     
//  }