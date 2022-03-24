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


export const postReviewsAction = (reviewData1, setreviewData, setReviewLoading, setReviewDelivery, socket, setSpam) => async (dispatch) => {
    console.log("postReview Action Act");
    console.log(reviewData1); 
    try{
        const {data} = await axs.postReviewsApi(reviewData1); 
        
        // dispatch ({type: 'POST_REVIEW', payload: data});

        if(data==='Spam'){
            setSpam(true);
            setTimeout( function() {setSpam(false)}, 3000);
        }else {
        console.log(data);
        const newReview = data.newReview;
        const newNotification = data.newNotification;
        const reviewedPost = data.reviewedPost;

        const socketNotificationData = data.newNotification;
        const reviewData = data.newReview;

        //reviewNotifier(data.newNotification, data.newReview);

        socket.current.emit("sendNotification", {
            socketNotificationData        
        });
        
        socket.current.emit("sendReview", {
            reviewData
        });  

        dispatch ({type: 'POST_REVIEW', payload: newReview});
        dispatch ({type: 'REVIEW_DIARY', payload: reviewedPost});
        setreviewData({reviewedId:'', reviewedPostId:'', body: ''}); 

        setReviewLoading(false);

        setReviewDelivery(true);
        setTimeout( function() {setReviewDelivery(false)}, 2000);
        }
        
        
    } catch(error) {  
        console.log(error);
    }
}
export const patchReviewsAction = (reviewData, setReviewLoading, setReviewDelivery, setReviewEditor, setSpam) => async (dispatch) => {

    console.log("patchReview Action Act");

    try{
        const {data} = await axs.patchReviewsApi(reviewData);  

        if(data==='Spam'){
            setSpam(true);
            setTimeout( function() {setSpam(false)}, 3000);
        }else {
            
            dispatch ({type: 'PATCH_REVIEW', payload: data});

            

            setReviewDelivery(true);
            setTimeout( function() {setReviewDelivery(false)}, 2000);
            setReviewLoading(false);
            setReviewEditor(false)
        } 
        
        
        
    } catch(error) {  
        console.log(error);
    }
}
export const deleteReviewsAction = (reviewId, setReviewLoading, setDeleteDelivery) => async (dispatch) => {
    try{
        
        
        setDeleteDelivery(true);
         const {data} = await axs.deleteReviewsApi(reviewId);

        // setDeleteDelivery (true); // its disturbing coz when it deletes map it deletes surePop with it also during dispatch
     
         console.log(data);

        if (data.message === 'reviewDeleted'){

         
        setDeleteDelivery (true);
        setTimeout (function () {dispatch ({type: 'DELETE_REVIEW', payload: reviewId})},2000); 
       
        //setReviewLoading(false); //Also disturbin
         
        } else{
            return;
        }
    
    } catch(error) {

        console.log(error);
        return false;
    }
}