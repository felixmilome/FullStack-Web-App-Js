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
 

export const postMessagesAction = (messageData, socket, setLoading, setProgress) => async (dispatch) => {
    console.log("Message Action Act");
    try{

        console.log(messageData);
        const {data} = await axs.postMessagesApi(messageData);
        

        const socketMessageData = data.newMessage;
        const socketNotificationData = data.newNotification; 

        
    
        dispatch ({type: 'POST_MESSAGE', payload: socketMessageData});
        setLoading(false);
        setProgress(0); 
        

        socket.current.emit("sendMessage", {
            socketMessageData
         });
         socket.current.emit("sendNotification", {
             socketNotificationData        
         });
         

    } catch(error) {  
        console.log(error);
    }
}