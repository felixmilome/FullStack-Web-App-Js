import * as axs from './axs';

export const getMessagesAction = (convoId) => async (dispatch) => {
    try{
        const {data} = await axs.getMessagesApi(convoId);
        console.log(data);

        dispatch ({type: 'GET_ALL_MESSAGES', payload: data});

        

    } catch(error) {
        console.log(error);

        return false;
    }
}


export const postMessagesAction = (messageData, socket, notifier) => async (dispatch) => {
    console.log("Message Action Act");
    try{
        const {data} = await axs.postMessagesApi(messageData);

        socket.current.emit("sendMessage", {
           messageData
        });
 
        dispatch ({type: 'POST_MESSAGE', payload: data});
        notifier();
    } catch(error) {  
        console.log(error);
    }
}