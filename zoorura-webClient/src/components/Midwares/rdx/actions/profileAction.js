import * as axs from './axs';

export const changeDpAction = (dp) => async (dispatch, navigate) => {
    try{
        const {data} = await axs.changeDpApi(dp); 
        dispatch ({type: 'CHANGE_DP', data});
     
        //navigate('/Portfolios');
        window.location.reload(true);
    } catch(error) {
        console.log(error);
    }
}

export const editProfileAction = (profileFormData, setVisibleErrorProfile, setVisibleSuccessProfile, setLoadingProfile) => async (dispatch) => {
    console.log(profileFormData);
    try{
        const {data} = await axs.editProfileApi(profileFormData);
        console.log(data); 
        
        if (data.message === 'UsernameTaken' 
            || data.message === 'error'){

            dispatch ({type: 'EDIT_PROFILE', data});
            setVisibleErrorProfile(true); 
            setLoadingProfile(false); 

        } else if (data.message === 'editedProfile'){

            console.log(data.message);  
            dispatch({type: 'EDIT_PROFILE', data});        
            setVisibleSuccessProfile(true);
            window.location.reload(true);

        } 
     
    } catch(error) {
        console.log(error);
    }
}
export const editSecurityAction = (securityFormData, setVisibleErrorSecurity, setVisibleSuccessSecurity, setLoadingSecurity) => async (dispatch) => {
    try{
        const {data} = await axs.editSecurityApi(securityFormData); 
      //  dispatch ({type: 'EDIT_SECURITY', data});
     
        if (data.message === 'error'
        || data.message === 'WrongPassword'
        || data.message === 'EmailTaken'
        || data.message === 'PasswordSame' 
        ){
            dispatch ({type: 'EDIT_SECURITY', data});
             setVisibleErrorSecurity(true); 
            setLoadingSecurity(false);  
        } else if (data.message === 'PasswordEdited'
        ||data.message === 'EmailPasswordEdited'
        || data.message === 'EmailEdited'){
            console.log(data.message);  
            dispatch({type: 'EDIT_SECURITY', data});        
            setVisibleSuccessSecurity(true);
            //window.location.reload(true);
        }
    } catch(error) {
        console.log(error);
    }
}
export const forgotPasswordAction = (forgotPassFormData, setVisibleError, setVisibleSuccess, setLoading) => async (dispatch) => {
    try{
        const {data} = await axs.forgotPasswordApi(forgotPassFormData); 
       
     
        if (data.message === 'error'
        || data.message === 'NoEmail'
        || data.message === 'PasswordSame' 
        ){
            dispatch ({type: 'FORGOT_PASSWORD', data});
             setVisibleError(true); 
            setLoading(false); 

        } else if (data.message === 'Success'){

            console.log(data.message);  
            dispatch({type: 'FORGOT_PASSWORD', data});        
            setVisibleError(false);
            setVisibleSuccess(true);

        }
    } catch(error) {
        console.log(error);
    }
}

export const getMiniProfileAction = (profileName) => async (dispatch) => {

        try{
            const {data} = await axs.getMiniProfileApi(profileName); 
            dispatch ({type: 'GET_MINI_PROFILE', data});
            console.log('miniprofile fetched');
            
        
        } catch(error) { 
            console.log(error);
        }
          
}
export const followAction = (followData) => async (dispatch) => {

    try{
        const {data} = await axs.followApi(followData); 
        dispatch ({type: 'FOLLOW', data});
        console.log('followed');
        console.log(data);
    
    } catch(error) { 
        console.log(error);
    }
      
}

export const dailyPointsAction = (id) => async (dispatch, setpopDailyPoints) => {
    try{
        const {data} = await axs.dailyPointsApi(id); 
        dispatch ({type: 'DAILY_POINTS', data});
        setpopDailyPoints(false);
        window.location.reload(true);
    } catch(error) {
        console.log(error);
    }
}