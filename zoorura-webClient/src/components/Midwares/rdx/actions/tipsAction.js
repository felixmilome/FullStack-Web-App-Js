import * as axs from './axs';

export const getTipsAction = (postId) => async (dispatch) => {
    try{
        const {data} = await axs.getTipsApi(postId);
        console.log(data);

        dispatch ({type: 'GET_POST_TIPS', payload: data});

        

    } catch(error) { 
        console.log(error); 

        return false;
    } 
}
export const messageTipsAction = (tipData, setPopTip, setTipLoading, setTipDelivery, socket) => async (dispatch) => {
    console.log("Message Tips Action Act");
    try{
        const {data} = await axs.postTipsApi(tipData); 
        console.log(data); 
        const newTip = data.newTip; 
        const socketMessageData = data.tippedMessage;
        const socketNotificationData = data.newNotification;  
        
         
    
        dispatch ({type: 'POST_TIP', payload: newTip});
        dispatch ({type: 'TIP_MESSAGE', payload: socketMessageData});


        setPopTip(false); 
        setTipLoading(false);

        setTipDelivery(true);
        setTimeout( function() {setTipDelivery(false)}, 2000);

        socket.current.emit("sendNotification", {
            socketNotificationData        
        });
        socket.current.emit("patchMessage", { 
            socketMessageData        
        });

       
        
    } catch(error) {  
        console.log(error.message);
    }
}


export const postTipsAction = (tipData, setpopSure, setpopTip, setTipLoading, setTipDelivery, socket) => async (dispatch) => {
    console.log("Tips Action Act");
    try{
        const {data} = await axs.postTipsApi(tipData); 
        const newTip = data.newTip; 
        const tippedPost = data.tippedPost;
        const socketNotificationData  = data?.newNotification; 
        console.log(tippedPost);
         
    
        dispatch ({type: 'POST_TIP', payload: newTip});

        setpopSure(false);
        setpopTip(false); 
        setTipLoading(false); 

        setTipDelivery(true);
        setTimeout( function() {setTipDelivery(false)}, 2000);

        if (newTip.type === 'post'){ 
            dispatch ({type: 'TIP_DIARY', payload: tippedPost}); 

                socket.current.emit("sendNotification", {
                    socketNotificationData        
                });
       
        }  else if (newTip.type === 'review'){

            dispatch ({type: 'TIP_REVIEW', payload: tippedPost});

                socket.current.emit("sendNotification", {
                    socketNotificationData        
                });
        }
 
       
        
    } catch(error) {  
        console.log(error.message);
    }
}
