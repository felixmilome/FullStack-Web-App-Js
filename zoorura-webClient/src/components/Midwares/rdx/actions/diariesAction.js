import * as axs from './axs';

export const getADiaryAction = (diaryId) => async (dispatch) => {
    try{
        console.log({diaryId});
        const {data} = await axs.getADiaryApi(diaryId);
        console.log(data);

        dispatch ({type: 'GET_VISITED_DIARY', payload: data}); 

    } catch(error) {
        console.log(error); 
    }
}
export const getUsersDiariesAction = (userId) => async (dispatch) => {
    try{
        console.log({userId});
        const {data} = await axs.getUsersDiariesApi(userId); 
        console.log(data);
 
        dispatch ({type: 'GET_USERS_DIARIES', payload: data}); 

    } catch(error) {
        console.log(error); 
    }
}
 
 
export const getDiariesAction = () => async (dispatch) => {
    try{
        const {data} = await axs.getDiariesApi();
        console.log(data);

        const {followedDiaries, popularDiaries, randomDiaries} = data;

        dispatch ({type: 'GET_FOLLOWED_DIARIES', payload: followedDiaries});
        dispatch ({type: 'GET_POPULAR_DIARIES', payload: popularDiaries}); 
        dispatch ({type: 'GET_RANDOM_DIARIES', payload: randomDiaries});  

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
export const postDisplayDiariesAction = (diary, setPopDisplayed, navigate, setSpam, socket) => async (dispatch) => {
    try{
        


            const {data} = await axs.postDiariesApi(diary); 
            
            console.log(socket);

            if (data === 'Spam'){ 

                setSpam (true);
                setTimeout( function() {setSpam (false)}, 2000); 

            }else{
                
                const socketNotificationData = data.newNotification;
                

                setPopDisplayed(true);

                socket.current.emit("sendNotification", { //put it bottom
                    socketNotificationData        
                });

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
export const patchDiariesAction = (id, diariesEditData, setpopPosted, setSpam) => async (dispatch)=>{
    try{

        //console.log('patchAction')
        const {data} = await axs.patchDiariesApi(id, diariesEditData);
        console.log(data);

        if (data === 'Spam'){
            setSpam (true);
            setTimeout( function() {setSpam (false)}, 2000);

        }else if (data === 'Success'){
          
            setpopPosted(true);
            //setTimeout( function() {setpopOptions(false)}, 2000);
            window.location = ('/') 
            
        }
    } catch(error){
        console.log(error.message);
        // console.log(diariesEditData);
        // console.log(id);
    }
}

export const deleteDiariesAction = (id) => async (dispatch) =>{
        try{
            await axs.deleteDiariesApi(id);
            window.location = ('/') 
            //dispatch({type: 'DELETE_DIARY', payload: id});

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
