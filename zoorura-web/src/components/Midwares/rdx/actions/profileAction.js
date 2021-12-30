import * as axs from './axs';

export const dpAction = (dp) => async (dispatch, navigate) => {
    try{
        const {data} = await axs.dpApi(dp); 
        dispatch ({type: 'DP', data});
     
        navigate('/Portfolios');
        window.location.reload(true);
    } catch(error) {
        console.log(error);
    }
}