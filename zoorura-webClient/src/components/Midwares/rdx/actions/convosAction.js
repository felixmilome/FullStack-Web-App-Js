import * as axs from './axs';

export const getConvosAction = (id) => async (dispatch) => {
    try{
        dispatch({type:"SEARCHING_CONVO"});

        const {data} = await axs.getConvosApi(id);
        console.log(data);

        dispatch ({type: 'GET_ALL_CONVOS', payload: data});
        console.log(data);
        if(data.length > 0){

            dispatch({type:"YES_CONVO"});

        }else if(data.length === 0){ 

                dispatch({type:"NO_CONVO"});
        }
    } catch(error) {
        console.log(error);
    } 
} 


export const postConvosAction = (convoData, setLoading, setpopConvoForm, socket) => async (dispatch) => {
    try{

        const {data} = await axs.postConvosApi(convoData);
        dispatch ({type: 'EDIT_MINI_PROFILE', data: data?.miniProfile});
        setLoading(false);
        setpopConvoForm(false);
       
        const socketConvoData = data?.newConvo;
        const newConvo = data?.newConvo;

        console.log(data);

         
        console.log(data);
        dispatch ({type: 'POST_CONVO', payload: newConvo}); 
        dispatch ({type: 'YES_CONVO'}); //to maark that convos exist and not 0 convos.

        socket.current.emit("sendConvo", { 
            socketConvoData        
        });
        console.log('Convo Sent'); 
        
        var socketNotificationData = data?.newMsgNotification;
       
        socket.current.emit("sendNotification", { 
            socketNotificationData        
        });  

        if (convoData.tip > 0){

            var socketNotificationData = data?.newNotification;

                socket.current.emit("sendNotification", { 
                    socketNotificationData        
                });        
        
            } 

    } catch(error) { 
        console.log(error?.message);
    }
}

export const patchConvosAction = (id, convoData) => async (dispatch) => {
    try{
        const {data} = await axs.patchConvosApi(id, convoData);

        dispatch ({type: 'PATCH_CONVO', payload: data});
    } catch(error) {
        console.log(error);
    }
}
export const deleteConvosAction = (id) => async (dispatch) => {
    try{
        const {data} = await axs.deleteConvosApi(id);

        dispatch ({type: 'DELETE_CONVO', payload: data});
    } catch(error) {
        console.log(error);
    }
}