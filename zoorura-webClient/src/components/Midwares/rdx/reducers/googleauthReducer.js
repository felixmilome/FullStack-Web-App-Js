export const googleauthReducer = (state ={googleauthData: null}, action) => {
    switch (action.type){
        case "GOOGLE_SIGNUP":
            console.log(action?.data.message);
            if (action.data.message === "LoginError"){
                   return "LoginError";
            } else if (action.data.message === "EmailTaken"){
                return "Email Already In Use";
            }else if (action.data.message === "UsernameTaken"){
                return "Username Already in Use";
            } else if (action.data.message === "UsernameEmailTaken"){
                return "Username and Email Already in Use"; 
            }else if (action.data.message === "AlreadyVerified"){
                return "Already Verified Earlier";
            } else if (action.data.message === "InputError"){
                return "Error In One Field";
            }else if (action.data.message === "OtpError"){ 
                return "Wrong Otp! Confirm from the MOST RECENT sent Email";
            }else if (action.data.message === "RegisterOtpExpired"){
                return "Otp Expired! Re-Register this Account";
            }else if (action.data.message === "ChangeOtpExpired"){
                return "Link Expired! Security Change Failed";
            }else if (action.data.message === 'UnknownError'){
                console.log(action.data.message);
                return "Something went wrong. Please Try again Later";
            }else if (action.data.message === 'NoUser'){
                return "User No Longer Available";
            }else if (action.data.message === 'RegistrySuccess'){
                
                localStorage.setItem('profile', JSON.stringify({...action?.data}));
                return "Registry Success";
            }else if (action.data.message === 'SecuritySuccess'){
                
                localStorage.setItem('profile', JSON.stringify({...action?.data}));
                return "Security Success";

            }else if (action.data.message === 'DeleteSuccess'){
                
               // localStorage.clear();
                return 'Zoorura Account Deleted'
             

            }else {
                
                return "Unknown Error Occured. Please Try again Later";
            }
        case "LOGOUT":
            localStorage.clear();
            return {...state, googleauthData: null } ///create an action for logout so that one can refresh get messages etc

            default:
            return state;
    } 
};