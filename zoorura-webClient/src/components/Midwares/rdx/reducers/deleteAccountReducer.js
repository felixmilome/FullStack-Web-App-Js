 export const deleteAccountReducer = (state ={}, action) => { //other user editings also
     
    switch(action.type) {
        case 'DELETE_ACCOUNT':
            console.log(action?.data); 
            if (action.data.message === "error"){
                return "Something went wrong. Please try again later";
            } else if (action.data.message === "WrongPassword"){
                return "Wrong Current Password";
            }else if (action.data.message === "Success"){
                return 'Success';
            }
        default:
            return state; 
            
     }
     
 }