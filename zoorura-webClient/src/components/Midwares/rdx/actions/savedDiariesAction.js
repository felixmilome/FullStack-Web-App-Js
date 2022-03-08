import * as axs from './axs';

export const saveDiariesAction = (savedDiaryData, setPopSaved) => async (dispatch) =>{
        try{
            const{data}= await axs.saveDiariesApi(savedDiaryData);
            console.log(data);
            dispatch({type: 'SAVE_DIARY', payload: data});
            setPopSaved(true);
            setTimeout( function() {setPopSaved (false)}, 2000);  

        } catch(error){
            console.log(error);
        }
}
export const deleteSavedDiariesAction = (savedId, setPopDeleted) => async (dispatch) =>{
        try{
            await axs.deleteSavedDiariesApi(savedId);
            dispatch({type: 'DELETE_SAVED_DIARY', payload: savedId});
            setPopDeleted(true);
            setTimeout( function() {setPopDeleted (false)}, 2000);  

        } catch(error){
            console.log(error);
        }
}
export const getSavedDiariesAction = () => async (dispatch) =>{
        try{
           const {data}= await axs.getSavedDiariesApi();
            dispatch({type: 'GET_SAVED_DIARY', payload: data});

        } catch(error){
            console.log(error);
        }
}