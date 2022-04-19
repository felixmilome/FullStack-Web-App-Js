import * as axs from './axs';

export const getWalletAction = (userId) => async (dispatch) => {
    try{
        console.log({userId});
        const {data} = await axs.getWalletApi(userId);
        console.log(data);

        dispatch ({type: 'GET_WALLET', payload: data}); 

    } catch(error) {
        console.log(error);   
    }
}