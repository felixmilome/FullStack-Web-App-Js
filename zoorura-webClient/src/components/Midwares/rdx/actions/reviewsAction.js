import * as axs from './axs';

export const getReviewsAction = (postId) => async (dispatch) => {
    try{
        const {data} = await axs.getReviewsApi(postId);
        console.log(data);

        dispatch ({type: 'GET_POST_REVIEWS', payload: data});

        

    } catch(error) {
        console.log(error);

        return false;
    }
}


export const postReviewsAction = (reviewData) => async (dispatch) => {
    console.log("postReview Action Act");
    try{
        const {data} = await axs.postReviewsApi(reviewData);  
        dispatch ({type: 'POST_REVIEW', payload: data});
        
    } catch(error) {  
        console.log(error);
    }
}
export const patchReviewsAction = (reviewData) => async (dispatch) => {
    console.log("patchReview Action Act");
    try{
        const {data} = await axs.patchReviewsApi(reviewData);  
        dispatch ({type: 'PATCH_REVIEW', payload: data});
        
    } catch(error) {  
        console.log(error);
    }
}
export const deleteReviewsAction = (postId) => async (dispatch) => {
    try{

         await axs.deleteReviewsApi(postId);
         dispatch ({type: 'DELETE_REVIEW', payload: postId}); // replace with data._Id
    
    } catch(error) {

        console.log(error);
        return false;
    }
}