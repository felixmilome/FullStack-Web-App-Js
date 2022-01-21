import * as axs from './axs';

export const getMessagesAction = (convoId) => async (dispatch) => {
    try{
        const {data} = await axs.getMessagesApi(convoId);
        console.log(data);

        dispatch ({type: 'GET_ALL_MESSAGES', payload: data});
    } catch(error) {
        console.log(error);
    }
}


export const postMessagesAction = (messageData) => async (dispatch) => {
    console.log("Message Action Act");
    try{
        const {data} = await axs.postMessagesApi(messageData);
 
        dispatch ({type: 'POST_MESSAGE', payload: data});
        
    } catch(error) {  
        console.log(error);
    }
}