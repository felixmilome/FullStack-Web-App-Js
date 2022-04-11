import * as axs from './axs';


export const getTagsAction = (tags) => async (dispatch) => { 
    try{
        const {data} = await axs.getTagsApi(tags); 

        dispatch ({type: 'GET_TAGS', payload: data});

    } catch(error) {
        console.log(error);
    }
}