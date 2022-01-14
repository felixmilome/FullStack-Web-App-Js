import * as axs from './axs';

export const changeDpAction = (dp) => async (dispatch, navigate) => {
    try{
        const {data} = await axs.changeDpApi(dp); 
        dispatch ({type: 'CHANGE_DP', data});
     
        navigate('/Portfolios');
        window.location.reload(true);
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
export const followAction = (followData) => async (dispatch) => {

    try{
        const {data} = await axs.followApi(followData); 
        dispatch ({type: 'FOLLOW', data});
        console.log('followed');
        console.log(data);
    
    } catch(error) { 
        console.log(error);
    }
      
}

export const dailyPointsAction = (id) => async (dispatch, setpopDailyPoints) => {
    try{
        const {data} = await axs.dailyPointsApi(id); 
        dispatch ({type: 'DAILY_POINTS', data});
        setpopDailyPoints(false);
       // window.location.reload(true);
    } catch(error) {
        console.log(error);
    }
}