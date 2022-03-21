import * as axs from './axs';

 
export const getDiariesAction = () => async (dispatch) => {
    try{
        const {data} = await axs.getDiariesApi();

        dispatch ({type: 'GET_ALL_DIARIES', payload: data});
    } catch(error) {
        console.log(error); 
    }
}
export const postDiariesAction = (diary, setpopPosted, navigate, setDisplayer, setSpam) => async (dispatch) => {
    try{
        

            const {data} = await axs.postDiariesApi(diary);

            if (data === 'Spam'){
                setSpam (true);
                
            }else{
                setpopPosted(true);

                dispatch ({type: 'POST_DIARY', payload: data});            
                //navigate ('/');
                window.location = ('/') 
            }

        
    } catch(error) {
        console.log(error);
    }
}
export const postDisplayDiariesAction = (diary, setPopDisplayed, navigate, setDisplayer, setSpam) => async (dispatch) => {
    try{
        


            const {data} = await axs.postDiariesApi(diary);

            if (data === 'Spam'){
                setSpam (true);
                setTimeout( function() {setSpam (false)}, 2000); 
            }else{
            
            setPopDisplayed(true);
            navigate ('/');
            window.location.reload(true); 
            }



            // const newDisplay = data.newDisplay;
            // const displayedDiary = data.displayedDiary;

            // dispatch ({type: 'POST_DIARY', payload: newDisplay});
            // dispatch ({type: 'DIARY_DISPLAY', payload: displayedDiary});
            // setDisplayer(true);
            // setTimeout( function() {setDisplayer (false)}, 2000); 
      

        
    } catch(error) {
        console.log(error);
    }
}
export const patchDiariesAction = (id, diariesEditData, setpopPosted, setpopOptions, setSpam) => async (dispatch)=>{
    try{
        const {data} = await axs.patchDiariesApi(id, diariesEditData); 
        if (data === 'Spam'){
            setSpam (true);
            setTimeout( function() {setSpam (false)}, 2000); 
        }else{
            dispatch ({type: 'PATCH_DIARY', payload: data});
            setpopPosted(true);
            setTimeout( function() {setpopOptions(false)}, 2000);
        }
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
