import * as axs from './axs';


export const getHallFameAction = () => async (dispatch) => {
    try{
        const {data} = await axs.getHallFameApi();

        dispatch ({type: 'GET_HALL_FAME', payload: data});
    } catch(error) {
        console.log(error);
    }
}