 import * as axs from './axs';

export const deleteAccountAction = (password, setLoadingDeleteAccount, setSurePop, setDeleteError) => async (dispatch) => {
    try{
        const {data} = await axs.deleteAccountApi(password);

        console.log(data);

             dispatch ({type: 'DELETE_ACCOUNT', data: data});
             setSurePop(false);
             setLoadingDeleteAccount(false);
             setDeleteError(true);
       
    } catch(error) {
        console.log(error);
    }
}