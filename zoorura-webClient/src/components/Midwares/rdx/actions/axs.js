import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000"});

//export const diariesUrl = 'http://localhost:5000/diaries';


API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})
//Diary
export const getDiariesApi = () => API.get('/diaries');
export const postDiariesApi =(newDiary) => API.post('/diaries', newDiary);
export const patchDiariesApi = (id, diariesEditData) => API.patch(`/diaries/${id}`, diariesEditData);
export const deleteDiariesApi = (id) => API.delete(`/diaries/${id}`);
export const tipDiariesApi = (id, tipperData) => API.patch(`/diaries/${id}/tipDiaries`, tipperData);
export const reviewDiariesApi = (id, reviewData) => API.patch(`/diaries/${id}/reviewDiaries`, reviewData);
//User Auth
export const loginApi = (formData) => API.post ('/users/login', formData);
export const registerApi = (formData) => API.post ('/users/register', formData);
export const verifyApi = (formData) => API.patch ('/users/verify', formData);
export const sendOtpApi = (email) => API.get (`/users/sendOtp/${email}`); 
//MailName Checkers 
export const checkUsernameApi = (username) => API.get (`/users/checkUsername/${username}`, username);
export const checkEmailApi = (email) => API.get (`/users/checkEmail/${email}`, email); 
//UserProfile
export const changeDpApi = (dp) => API.patch ('/users/changeDp', dp);
export const getMiniProfileApi = (profileName) => API.get (`/users/getMiniProfile/${profileName}`, profileName);
export const followApi = (followData) => API.post (`/users/follow/`, followData);
export const dailyPointsApi =(id) => API.patch (`/users/dailyPoints/${id}`, id);
    
    //Edit PROFILE
    export const editProfileApi = (profileFormData) => API.patch ('/users/editProfile', profileFormData);
    export const editSecurityApi = (securityFormData) => API.patch ('/users/editSecurity', securityFormData);
    export const forgotPasswordApi = (forgotPassFormData) => API.patch ('/users/forgotPassword', forgotPassFormData);
    export const blockApi = (blockData) => API.patch ('/users/block', blockData);
    export const unblockApi = (unblockData) => API.patch ('/users/unblock', unblockData); //has its own reducder
    export const populateBlockApi = () => API.patch ('/users/populateBlock');
    //Delete Account 
    export const deleteAccountApi = (password) => API.post('/users/deleteAccount', password); 

//System
export const getHallFameApi = () => API.get('/system/hallFame');
//Convo
export const getConvosApi = (id) => API.get(`/convos/${id}`, id); 
export const postConvosApi = (convoData) => API.post('/convos', convoData);
export const patchConvosApi = (id, convoData) => API.patch(`/convos/${id}`, convoData); 
export const deleteConvosApi = (id) => API.delete(`/convos/${id}`); 
//Message
export const getMessagesApi = (convoId) => API.get(`/messages/${convoId}`); 
export const postMessagesApi = (messageData) => API.post('/messages/', messageData); 
export const readMessagesApi = (id) => API.patch(`/messages/readMessages/${id}`); 
//Notifications
export const postNotificationsApi = (notificationData) => API.post('/notifications/', notificationData); 
export const getNotificationsApi = (id) => API.get(`/notifications/${id}`);
export const readNotificationsApi = (id) => API.patch(`/notifications/${id}`);
export const readConvoNotificationsApi = (convoId) => API.delete(`/notifications/readConvoNotifications/${convoId}`);  
//REVIEWS
export const getReviewsApi = (postId) => API.get(`/reviews/${postId}`);   
export const postReviewsApi = (reviewData) => API.post('/reviews/', reviewData);
export const deleteReviewsApi = (reviewId) => API.delete(`/reviews/${reviewId}`);
export const patchReviewsApi = (reviewData) => API.patch('/reviews/', reviewData);
//TIPS
export const getTipsApi = (postId) => API.get(`/tips/${postId}`); 
export const postTipsApi = (tipData) => API.post('/tips/', tipData);
//SAVED DIARY
export const saveDiariesApi = (savedDiaryData) => API.post('/savedDiaries/', savedDiaryData); 
export const deleteSavedDiariesApi = (savedId) => API.delete(`/savedDiaries/${savedId}`);
export const getSavedDiariesApi = () => API.get('/savedDiaries/');
//Search
export const headSearchApi = (searchData) => API.post('/search/headSearch', searchData);




