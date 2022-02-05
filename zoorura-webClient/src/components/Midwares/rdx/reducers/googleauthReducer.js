export const googleauthReducer = (state ={googleauthData: null}, action) => {
    switch (action.type){
        case "GOOGLE_SIGNUP":
            console.log(action?.data.message);
            if (action.data.message === "LoginError"){
                   return "LoginError";
            } else if (action.data.message === "EmailTaken"){
                return "Email Already In Use";
            } else if (action.data.message === "UsernameTaken"){
                return "Username Already in Use";
            } else if (action.data.message === "UsernameEmailTaken"){
                return "Username and Email Already in Use";
            }else if (action.data.message === "InputError"){
                return "Error In One Field";
            }else if (action.data.message === "OtpError"){ 
                return "Wrong Otp! Confirm from the sent Email";
            }else if (action.data.message === "OtpExpired"){
                return "Otp Expired! Re-Register this Account";
            }else if (action.data.message === 'UnknownError'){
                return "Unknown Error Occured. Please Try again Later";
            }else {
                
                 localStorage.setItem('profile', JSON.stringify({...action?.data}));
                    //return {...state, googleauthData: action?.data};
                    return "Registry Success";
            }
        case "LOGOUT":
            localStorage.clear();
            return {...state, googleauthData: null }
            default:
            return state;
    } 
};