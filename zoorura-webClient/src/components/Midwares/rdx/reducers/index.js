 import {combineReducers} from 'redux';
 import {diariesReducer} from './diariesReducer';
 import {googleauthReducer} from './googleauthReducer';
 import { hallFameReducer } from './hallFameReducer';
 import {profileResetReducer, getMiniProfileReducer, securityResetReducer, forgotPasswordReducer} from './profileReducer';
 import {convosReducer} from './convosReducer';
 import {messagesReducer} from './messagesReducer';
 import {socketReducer} from './socketReducer'; 
 import {notificationsReducer} from './notificationsReducer';
 import {reviewsReducer} from './reviewsReducer';
 import {tipsReducer} from './tipsReducer';

 export default combineReducers({
    diariesReducer, googleauthReducer, profileResetReducer, getMiniProfileReducer,
     hallFameReducer, convosReducer, messagesReducer, socketReducer,
      notificationsReducer, reviewsReducer, tipsReducer, securityResetReducer, forgotPasswordReducer
 });  