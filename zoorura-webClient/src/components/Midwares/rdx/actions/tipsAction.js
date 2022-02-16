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


export const postTipsAction = (tipData) => async (dispatch) => {
    console.log("Tips Action Act");
    try{
        const {data} = await axs.postTipsApi(tipData);  
        dispatch ({type: 'POST_TIP', payload: data});
        
    } catch(error) {  
        console.log(error);
    }
}
