import * as axs from './axs.js';

export const postNotificationsAction = (notificationData) => async(dispatch) =>{

    try{
    const {data} = await axs.postNotificationsApi(notificationData);
    dispatch({type:'POST_NOTIFICATIONS', payload: data});
    }
    catch(error){
        console.log(error);
    }


}

export const getNotificationsAction = (id) => async(dispatch) =>{

    try{
    const {data} = await axs.getNotificationsApi(id);
    dispatch({type:'GET_NOTIFICATIONS', payload: data});
    }
    catch(error){
        console.log(error);
    }


}