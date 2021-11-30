export const googleauthReducer = (state ={googleauthData: null}, action) => {
    switch (action.type){
        case "GOOGLE_SIGNUP":
            console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, googleauthData: action?.data};
        case "LOGOUT":
            localStorage.clear();
            return {...state,authData: null }
            default:
            return state;
    }
};