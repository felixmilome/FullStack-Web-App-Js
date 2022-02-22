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


export const postTipsAction = (tipData, setpopSure, setpopTip, setTipLoading, setTipDelivery) => async (dispatch) => {
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
