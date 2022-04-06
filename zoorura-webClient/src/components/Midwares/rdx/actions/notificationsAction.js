import * as axs from './axs.js';

export const postNotificationsAction = (notificationData, socketNotificationData, socket) => async(dispatch) =>{

    try{
    const {data} = await axs.postNotificationsApi(notificationData);
    dispatch({type:'POST_NOTIFICATIONS', payload: data});

    socket.current.emit("sendNotification", {
        socketNotificationData    
     }); 
     console.log('socketpostnotify');
     
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

export const readNotificationsAction = (id) => async(dispatch) =>{

    try{
    const {data} = await axs.readNotificationsApi(id); 
    console.log(data);
   dispatch({type:'READ_NOTIFICATIONS', payload: data}); 
    } 
    catch(error){
        console.log(error.message);
    }


}
export const readConvoNotificationsAction = (convoId) => async(dispatch) =>{

    try{
    const {data} = await axs.readConvoNotificationsApi(convoId);

        console.log(data); 

        if(data === 'Success'){
            dispatch({type:'READ_CONVO_NOTIFICATIONS', payload:convoId });
        }
    } 
    catch(error){
        console.log(error.message);
    }


}