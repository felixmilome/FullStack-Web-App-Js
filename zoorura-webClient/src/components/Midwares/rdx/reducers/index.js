 import {combineReducers} from 'redux';
 import {diariesReducer, popularDiariesReducer,
         randomDiariesReducer, usersDiariesReducer} from './diariesReducer';
  import {savedDiariesReducer} from './savedDiariesReducer.js';
 import {googleauthReducer} from './googleauthReducer';
 import { hallFameReducer } from './hallFameReducer';
 import {profileResetReducer, getMiniProfileReducer,blockReducer,
         populateBlockReducer, securityResetReducer, forgotPasswordReducer} from './profileReducer';
 import {convosReducer} from './convosReducer';
 import {convoStateReducer} from './stateReducers.js';
 import {messagesReducer} from './messagesReducer';
 import {socketReducer} from './socketReducer'; 
 import {notificationsReducer} from './notificationsReducer';
 import {reviewsReducer} from './reviewsReducer';
 import {tipsReducer} from './tipsReducer';
 import {deleteAccountReducer} from './deleteAccountReducer';
 import {headSearchReducer} from './searchReducer';
 import { messagesOpenedReducer,
       reviewsOpenedReducer, tipDiaryOpenedReducer,
         tipReviewOpenedReducer} from './openedCheckReducer';
 
    export default combineReducers({

      diariesReducer, savedDiariesReducer, usersDiariesReducer,
      randomDiariesReducer, popularDiariesReducer,
      convoStateReducer, googleauthReducer,
      profileResetReducer, getMiniProfileReducer,
      hallFameReducer, convosReducer, messagesReducer,
      socketReducer, deleteAccountReducer,
      notificationsReducer, reviewsReducer, tipsReducer,
      blockReducer, populateBlockReducer, securityResetReducer,
      forgotPasswordReducer,headSearchReducer,
       messagesOpenedReducer, 
      reviewsOpenedReducer, tipDiaryOpenedReducer,
       tipReviewOpenedReducer
       
    });  