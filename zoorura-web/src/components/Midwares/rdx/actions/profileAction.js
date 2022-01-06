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