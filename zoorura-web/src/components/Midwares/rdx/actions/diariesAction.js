import * as axs from './axs';

export const getDiariesAction = () => async (dispatch) => {
    try{
        const {data} = await axs.getDiariesApi();

        dispatch ({type: 'GET_ALL_DIARIES', payload: data});
    } catch(error) {
        console.log(error);
    }
}
export const postDiariesAction = (diary, setpopPosted, navigate) => async (dispatch) => {
    try{
        const {data} = await axs.postDiariesApi(diary);

        dispatch ({type: 'POST_DIARY', payload: data});

        setpopPosted(true);
 
        navigate ('/');
        window.location.reload(true);

        //setTimeout( function() {navigate ('/')}, 1000);
    } catch(error) {
        console.log(error);
    }
}
export const patchDiariesAction = (id, diariesEditData) => async (dispatch)=>{
    try{
        const {data} = await axs.patchDiariesApi(id, diariesEditData); 
        dispatch ({type: 'PATCH_DIARY', payload: data});
    } catch(error){
        console.log(error);
        // console.log(diariesEditData);
        // console.log(id);
    }
}

export const deleteDiariesAction = (id) => async (dispatch) =>{
        try{
            await axs.deleteDiariesApi(id);
            dispatch({type: 'DELETE_DIARY', payload: id});

        } catch(error){
            console.log(error);
        }
}

export const tipDiariesAction = (id, tipperData, setpopSure, setpopTip) => async (dispatch)=>{
    try{
        const {data} = await axs.tipDiariesApi(id, tipperData);  
       
        dispatch ({type: 'TIP_DIARY', payload: data});
        // if(dispatch)
        // {
        setpopSure(false);
        setpopTip(false);
        //}
        
    } catch(error){
        console.log(error);
     
    }
}
export const reviewDiariesAction = (id, reviewData, setreviewData) => async (dispatch)=>{
    try{
        const {data} = await axs.reviewDiariesApi(id, reviewData); 
        
        dispatch ({type: 'REVIEW_DIARY', payload: data});

        setreviewData({reviewer:'', reviewerId:'', body: ''});
    } catch(error){
        console.log(error);
       
    }
}
