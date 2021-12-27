import * as axs from './axs';


export const registerAction = (formData, navigate) => async (dispatch) => {
    try{
        const {data} = await axs.registerApi(formData);
        dispatch({type: 'GOOGLE_SIGNUP', data});
        navigate('/');
        window.location.reload(true);
    } catch (error){
        console.log(error);
    }
}





export const loginAction = (formData, navigate) => async (dispatch) => {
    try{
        const {data} = await axs.loginApi(formData);
        dispatch({type: 'GOOGLE_SIGNUP', data});
        navigate('/');
        window.location.reload(true);
    } catch (error){
        console.log(error);
    }
}

export const verifyAction = (formData, navigate) => async (dispatch) => {
    try{
        const {data} = await axs.verifyApi(formData);
        dispatch({type: 'GOOGLE_SIGNUP', data});
        navigate('/');
        window.location.reload(true);
    } catch (error){
        console.log(error);
    }
}

