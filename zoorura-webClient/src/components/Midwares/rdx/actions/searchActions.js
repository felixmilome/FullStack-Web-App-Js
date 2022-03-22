import * as axs from './axs'; 


export const headSearchAction = (searchData, setLoading, setError) => async (dispatch) =>{
    try{
        console.log(searchData);
        const{data}= await axs.headSearchApi(searchData);
        const {diaryResult, peopleResult, message} = data;
            
            console.log(data);
            console.log(data.message);

            dispatch({type: 'HEAD_SEARCH', payload: data});
        
            setLoading(false);
            setError(data.message);
      

    } catch(error){
        console.log(error.message);
    }
}