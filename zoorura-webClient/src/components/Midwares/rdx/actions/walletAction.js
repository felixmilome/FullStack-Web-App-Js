import * as axs from './axs';

export const getWalletAction = (setLoadingWallet) => async (dispatch) => {
    try{
      
        const {data} = await axs.getWalletApi();
        console.log(data);

        dispatch ({type: 'GET_WALLET', payload: data}); 
        setLoadingWallet(false);

    } catch(error) {
        console.log(error);   
    }
}