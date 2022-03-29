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
        
        if (newTip.type === 'message'){ 
            dispatch ({type: 'TIP_MESSAGE', payload: socketMessageData});


        socket.current.emit("sendNotification", {
            socketNotificationData        
        });
        socket.current.emit("patchMessage", { 
            socketMessageData        
        });




        }

       
        setPopTip(false); 
        setTipLoading(false);

        setTipDelivery(true);
        setTimeout( function() {setTipDelivery(false)}, 2000);
        
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
        console.log(tippedPost);
         
    
        dispatch ({type: 'POST_TIP', payload: newTip});

        if (newTip.type === 'post'){ 
            dispatch ({type: 'TIP_DIARY', payload: tippedPost}); 
        }  else if (newTip.type === 'review'){ 
            dispatch ({type: 'TIP_REVIEW', payload: tippedPost});
        } else if (newTip.type === 'message'){ 
            dispatch ({type: 'TIP_MESSAGE', payload: tippedPost});
        }

        setpopSure(false);
        setpopTip(false); 
        setTipLoading(false);

        setTipDelivery(true);
        setTimeout( function() {setTipDelivery(false)}, 2000);
        
    } catch(error) {  
        console.log(error);
    }
}
