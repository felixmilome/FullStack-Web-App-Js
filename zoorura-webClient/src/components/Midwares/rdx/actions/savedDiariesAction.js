import * as axs from './axs';

export const saveDiariesAction = (savedDiaryData, setPopSaved, setpopOptions) => async (dispatch) =>{
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
export const deleteSavedDiariesAction = (savedId, setPopDeleted, setLoading, setPopError) => async (dispatch) =>{
        try{
            const {data} = await axs.deleteSavedDiariesApi(savedId);
            console.log(data);

            if (data.message === 'Deleted'){

                dispatch({type: 'DELETE_SAVED_DIARY', payload: savedId});
                setLoading(false);
                setPopDeleted(true); 
                setTimeout( function() {setPopDeleted (false)}, 2000);

            }else {
                setPopError(true); 
                setLoading(false);
                setTimeout( function() {setPopError (false)}, 2000);
            } 

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