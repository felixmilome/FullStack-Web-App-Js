import * as axs from './axs';

export const getConvosAction = (id) => async (dispatch) => {
    try{
        const {data} = await axs.getConvosApi(id);

        dispatch ({type: 'GET_ALL_CONVOS', payload: data});
    } catch(error) {
        console.log(error);
    }
}


export const postConvosAction = (convoData) => async (dispatch) => {
    try{
        const {data} = await axs.postConvosApi(convoData);
 
        dispatch ({type: 'POST_CONVO', payload: data});
    } catch(error) { 
        console.log(error);
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