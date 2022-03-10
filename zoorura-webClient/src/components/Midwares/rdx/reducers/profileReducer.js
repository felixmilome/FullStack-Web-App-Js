export const profileResetReducer = (state ={googleauthData: null}, action) => { //other user editings also
     
    switch(action.type) {
        case 'CHANGE_DP':          ///DP REDUCER FOR ALL USER EDITTINGS
        case 'DAILY_POINTS':
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
                    return "Success"
        case 'EDIT_PROFILE':
            console.log(action?.data); 
            if (action.data.message === "error"){
                return "Something went wrong. Please try again later";
            } else if (action.data.message === "UsernameTaken"){
                return "Username Already In Use";
            }else if (action.data.message === "editedProfile"){
               
                    localStorage.setItem('profile', JSON.stringify({...action?.data}));
                    return  "Edit Success";
            }
        default:
            return state; 
            
     }
     
 }

 export const forgotPasswordReducer = (state ={googleauthData: null}, action) => { //other user editings also
     
    switch(action.type) {
        case 'FORGOT_PASSWORD':
            console.log(action?.data); 
            if (action.data.message === "error"){
                return "Something went wrong. Please try again later";
            } else if (action.data.message === "NoEmail"){
                return "Email's Account doesn't exist";
            }else if (action.data.message === "PasswordSame"){
                return "Password is Same";
            }else if (action.data.message === "Success"){
                return `Password Reset Link Sent to ${action.data.remail} inbox`;
            }
        default:
            return state; 
            
     }
     
 }

 export const securityResetReducer = (state ={googleauthData: null}, action) => { //other user editings also
     
    switch(action.type) {
        case 'EDIT_SECURITY':
            console.log(action?.data); 
            if (action.data.message === "error"){
                return "Something went wrong. Please try again later";
            } else if (action.data.message === "WrongPassword"){
                return "Incorrect Current Password";
            }else if (action.data.message === "EmailTaken"){
                return "Email Already In Use";
            }else if (action.data.message === "PasswordSame"){
                return "New Password is Same as Old one. Leave Empty is you dont want to change it.";
            }else if (action.data.message === "PasswordEdited"){                  
                    return  `Password Edit Link Sent to ${action.data.remail} Inbox`;
            }else if (action.data.message === "EmailPasswordEdited"){                         
                return  `Email Password Edit Link sent to ${action.data.remail} Inbox`;
            }else if (action.data.message === "EmailEdited"){              
                return  `Email Edit Link sent to ${action.data.remail} Inbox`;
            }
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

 export const blockReducer = (feedback = {}, action) => {
   
    switch(action.type) {
       
        
        case 'BLOCK':
        case 'UNBLOCK':
            if (action.data.message ==='error'){
                return 'error'
            }else if (action.data.message === 'Success'){

                localStorage.setItem('profile', JSON.stringify({...action?.data}))
                setTimeout( function() {window.location ='/'}, 1000);
                return 'Success'     
            }

        default:
            return feedback; 
            
     }
}
     

 export const populateBlockReducer = (populateBlock = {}, action) => {
   
    switch(action.type) {
       
        
        case 'POPULATE_BLOCK':

            return action.data;

        default:
            return populateBlock; 
            
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