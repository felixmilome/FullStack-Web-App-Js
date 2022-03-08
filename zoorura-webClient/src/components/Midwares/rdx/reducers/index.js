 import {combineReducers} from 'redux';
 import {diariesReducer} from './diariesReducer';
  import {savedDiariesReducer} from './savedDiariesReducer.js';
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
    diariesReducer, savedDiariesReducer, googleauthReducer, profileResetReducer, getMiniProfileReducer,
     hallFameReducer, convosReducer, messagesReducer, socketReducer,
      notificationsReducer, reviewsReducer, tipsReducer, securityResetReducer, forgotPasswordReducer
 });  