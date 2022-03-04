import * as axs from './axs';


export const registerAction = (formData, navigate, setVisibleError,setVisibleSuccess,setLoading) => async (dispatch) => {
    setLoading(true);
    try{
        const {data} = await axs.registerApi(formData);
        if (data.message === 'UsernameTaken'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
             setVisibleError(true); 
            setLoading(false);  
        }else if (data.message === 'EmailTaken'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
             setVisibleError(true); 
            setLoading(false);  
        }else if (data.message === 'UsernameEmailTaken'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
             setVisibleError(true); 
            setLoading(false);  
        }else if (data.message === 'InputError'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
             setVisibleError(true); 
            setLoading(false);  
        }else if (data.message === 'RegistrySuccess'){
           
            
            dispatch({type: 'GOOGLE_SIGNUP', data});
             setVisibleError(true); 
            setLoading(false); 
            window.location.reload();     

        }else{  
            dispatch({type: 'GOOGLE_SIGNUP', data});
        
            setVisibleSuccess(true);
        }
    } catch (error){
        console.log(error); 
    }
}





export const loginAction = (formData, navigate, setVisibleError, setLoading) => async (dispatch) => {
    try{
        const {data} = await axs.loginApi(formData);
        console.log(data.message);
        if (data.message === 'LoginError'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true); 
            setLoading(false);                 
        } else if (data.message === 'RegistrySuccess'){
           // console.log('RegLogin');
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true); 
            setLoading(false);  
            window.location.reload();               
        }else {
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true); //shares ui with success
           
        }

    } catch (error){
        console.log(error);
    }
} 

export const verifyAction = (formData, navigate, setVisibleError, setLoading) => async (dispatch) => {
    try{
        const {data} = await axs.verifyApi(formData); //shares reducer with auth
        console.log(data.message);
        if (data.message === 'AlreadyVerified'){
           
           dispatch({type: 'GOOGLE_SIGNUP', data});
           setVisibleError(true); 
           setLoading(false);                 
       } else if (data.message === 'OtpError'){
             console.log(data.message);
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true); 
            setLoading(false);                 
        } else if (data.message === 'ChangeOtpExpired'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true); 
            setLoading(false);                 
        }else if (data.message === 'RegisterOtpExpired'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true); 
            setLoading(false);                 
        }else if (data.message === 'UnknownError'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true); 
            setLoading(false);                 
        }else if(data.message === 'RegistrySuccess'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setLoading(false); 
            setVisibleError(true); //shares ui with success conditions set in UI
            window.location.reload();
        }else if(data.message === 'SecuritySuccess'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setLoading(false); 
            setVisibleError(true); //shares ui with success conditions set in UI
        }else {
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true);      

        }
    } catch (error){
        console.log(error);
    }
}

