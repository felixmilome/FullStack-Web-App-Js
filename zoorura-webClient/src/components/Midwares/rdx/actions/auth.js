import * as axs from './axs';


export const registerAction = (formData, navigate, setVisibleError,setVisibleSuccess,setLoading) => async (dispatch) => {
  
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
        }else{  
            dispatch({type: 'GOOGLE_SIGNUP', data});
        // navigate('/');
            window.location.reload(true);
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
        } else {
            dispatch({type: 'GOOGLE_SIGNUP', data});
            //navigate('/');
             
            window.location.reload(true);
            setVisibleError(true); //shares ui with success
           
        }

    } catch (error){
        console.log(error);
    }
} 

export const verifyAction = (formData, navigate, setVisibleError, setLoading) => async (dispatch) => {
    try{
        const {data} = await axs.verifyApi(formData);
         if (data.message === 'OtpError'){
             console.log(data.message);
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true); 
            setLoading(false);                 
        } else if (data.message === 'OtpExpired'){
            dispatch({type: 'GOOGLE_SIGNUP', data});
            setVisibleError(true); 
            setLoading(false);                 
        }else{
            dispatch({type: 'GOOGLE_SIGNUP', data});
            navigate('/');
            window.location.reload(true);
            setVisibleError(true); //shares ui with success
        }
    } catch (error){
        console.log(error);
    }
}

