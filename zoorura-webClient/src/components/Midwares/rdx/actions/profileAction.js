import * as axs from './axs';
//search FOLLOWS localStorage

// export const getUserDataAction = (id) => async (dispatch) => {
//     try{

//         const {data} = await axs.getUserDataApi(id); 
//         dispatch ({type: 'USER_DATA', data});
   

//     } catch(error) {
//         console.log(error); 
//     }
// }

export const getUsersAction = (user) => async (dispatch) => {
    try{
        console.log(user)
        const {data} = await axs.getUsersApi(user);
        const {users, message} = data;
        console.log(data);
      

        if (message === 'ChatHunt'){ 

             dispatch ({type: 'CHAT_HUNT', data:users}); 

        } else if (message === 'Followers'){ 

            dispatch ({type: 'FOLLOWERS', data:users});

       }else if (message === 'Following'){ 

        dispatch ({type: 'FOLLOWING', data:users});

   }
   

    } catch(error) {
        console.log(error); 
    }
}

export const changeDpAction = (dp) => async (dispatch, navigate) => {
    try{
        const {data} = await axs.changeDpApi(dp); 
        dispatch ({type: 'CHANGE_DP', data});
     
        //navigate('/Portfolios');
        window.location.reload(true);
    } catch(error) {
        console.log(error);
    }
}

export const editProfileAction = (profileFormData, setVisibleErrorProfile, setVisibleSuccessProfile, setLoadingProfile) => async (dispatch) => {
    console.log(profileFormData);
    try{
        const {data} = await axs.editProfileApi(profileFormData);
        console.log(data); 
        
        if (data.message === 'UsernameTaken' 
            || data.message === 'error'){

            dispatch ({type: 'EDIT_PROFILE', data});
            setVisibleErrorProfile(true); 
            setLoadingProfile(false); 

        } else if (data.message === 'editedProfile'){

            console.log(data.message);  
            dispatch({type: 'EDIT_PROFILE', data});        
            setVisibleSuccessProfile(true);
            window.location.reload(true);

        } 
     
    } catch(error) {
        console.log(error);
    }
}
export const editSecurityAction = (securityFormData, setVisibleErrorSecurity, setVisibleSuccessSecurity, setLoadingSecurity) => async (dispatch) => {
    try{
        const {data} = await axs.editSecurityApi(securityFormData); 
      //  dispatch ({type: 'EDIT_SECURITY', data});
     
        if (data.message === 'error'
        || data.message === 'WrongPassword'
        || data.message === 'EmailTaken'
        || data.message === 'PasswordSame' 
        ){
            dispatch ({type: 'EDIT_SECURITY', data});
             setVisibleErrorSecurity(true); 
            setLoadingSecurity(false);  
        } else if (data.message === 'PasswordEdited'
        ||data.message === 'EmailPasswordEdited'
        || data.message === 'EmailEdited'){
            console.log(data.message);  
            dispatch({type: 'EDIT_SECURITY', data});        
            setVisibleSuccessSecurity(true);
            //window.location.reload(true);
        }
    } catch(error) {
        console.log(error);
    }
}
export const forgotPasswordAction = (forgotPassFormData, setVisibleError, setVisibleSuccess, setLoading) => async (dispatch) => {
    try{
        const {data} = await axs.forgotPasswordApi(forgotPassFormData); 
       
     
        if (data.message === 'error'
        || data.message === 'NoEmail'
        || data.message === 'PasswordSame' 
        ){
            dispatch ({type: 'FORGOT_PASSWORD', data});
             setVisibleError(true); 
            setLoading(false); 

        } else if (data.message === 'Success'){

            console.log(data.message);  
            dispatch({type: 'FORGOT_PASSWORD', data});        
            setVisibleError(false);
            setVisibleSuccess(true);

        }
    } catch(error) {
        console.log(error);
    }
}

export const getMiniProfileAction = (profileName) => async (dispatch) => {

        try{
            const {data} = await axs.getMiniProfileApi(profileName); 
            dispatch ({type: 'GET_MINI_PROFILE', data});
            console.log('miniprofile fetched');
            
        
        } catch(error) { 
            console.log(error);
        }
          
}
export const getUserProfileAction = () => async (dispatch) => {

    try{
        const {data} = await axs.getUserProfileApi();
        console.log(data);
        const follows = data.follows;
        const spam = data.postSpam;
        const theme = data.theme;
        dispatch ({type: 'REGISTER_FOLLOWS', data:follows});
        console.log('user profile fetched');
        dispatch ({type: 'REGISTER_POST_SPAM', data:spam}); 
        //dispatch ({type: 'REGISTER_THEME', data:theme});  
      
        
    
    } catch(error) { 

        console.log(error);

    }
      
}
export const searchMiniProfileAction = (searchedName, setSearchingName, setSearchError) => async (dispatch) => {

    try{
        const {data} = await axs.getMiniProfileApi(searchedName);
       
        dispatch ({type: 'GET_MINI_PROFILE', data});
        console.log('miniprofile fetched');

        if(data === 'NO_USER'){
            setSearchError(true);
        } else if(data.userName?.length > 0){
            setSearchError(false);
        }
        setSearchingName(false);
        
    
    } catch(error) { 
        console.log(error);
    }
      
}
export const followAction = (followData, setLoadingButtons, socket, setFollowSpam) => async (dispatch) => {

    try{
        const {data} = await axs.followApi(followData);
        if(data==='Spam'){
            setFollowSpam(true);
            setTimeout( function() {setFollowSpam(false)}, 3000);
            setLoadingButtons(false);
        }else{
            const miniProfile= data.miniProfile;
            const miniProfileId = data.miniProfile._id;

            dispatch ({type: 'FOLLOW', data:miniProfile}); 

            dispatch ({type: 'FOLLOW_REDUCER', data:miniProfileId}); //actual follow reducer
            console.log('followed');
            console.log(data); 

            setLoadingButtons(false);

        // const socketNotificationData = data.newNotification;
        //     socket.current.emit("sendNotification", {
        //         socketNotificationData        
        //     });
        }
    
    } catch(error) { 
        console.log(error);
    }
      
}
export const quickFollowAction = (followData, setLoadingFollow) => async (dispatch) => {

    try{
        const {data} = await axs.followApi(followData);

        if(data==='Spam'){
          
            return;

        }else{
            const miniProfile= data.miniProfile;
            const miniProfileId = data.miniProfile._id;

            dispatch ({type: 'FOLLOW_REDUCER', data:miniProfileId}); //actual follow reducer
            console.log('follow Reducer');
            console.log(data); 

           setLoadingFollow(false);

        // const socketNotificationData = data.newNotification;
        //     socket.current.emit("sendNotification", {
        //         socketNotificationData        
        //     });
        }
    
    } catch(error) { 
        console.log(error);
    }
      
}

export const dailyPointsAction = (id) => async (dispatch, setpopDailyPoints) => {
    try{
        const {data} = await axs.dailyPointsApi(id); 
        dispatch ({type: 'DAILY_POINTS', data});
        setpopDailyPoints(false);
        window.location.reload(true);
    } catch(error) {
        console.log(error); 
    }
}
export const blockAction = (blockData, setBlockSurePop, setBlockError,  setLoading, setLoadingButtons,) => async (dispatch) => {
    try{
        const {data} = await axs.blockApi(blockData); 
        console.log(data.message);
        
            dispatch ({type: 'BLOCK', data});
            setBlockSurePop(false);
            setBlockError(true);
            setTimeout( function() {setBlockError(false)}, 2000);
            setLoading(false);
            if (data.message ==='error'){

                setLoadingButtons(false);

            }
        //window.location.reload(true);
    } catch(error) {
        console.log(error);
    }
}
export const populateBlockAction = () => async (dispatch) => {
    try{
        const {data} = await axs.populateBlockApi(); 
        console.log(data);
        
            dispatch ({type: 'POPULATE_BLOCK', data});
          
    } catch(error) {
        console.log(error);
    }
}
export const unblockAction = (unblockData, setLoadingUnblock, setBlockError) => async (dispatch) => {
    try{
        const {data} = await axs.unblockApi(unblockData);
        dispatch ({type: 'UNBLOCK', data});
        console.log(data.message);
        setBlockError(true); 
        setTimeout( function() {setBlockError(false)}, 2000);

        if(data.message==='error'){

            setLoadingUnblock(false);

        }
        
           
          
    } catch(error) {
        console.log(error);
    }
}