 import {combineReducers} from 'redux';
 import {diariesReducer, visitedDiariesReducer, popularDiariesReducer,
         randomDiariesReducer, usersDiariesReducer} from './diariesReducer';
  import {savedDiariesReducer} from './savedDiariesReducer.js';
 import {googleauthReducer} from './googleauthReducer';
 import { hallFameReducer } from './hallFameReducer';
 import {profileResetReducer, getMiniProfileReducer,blockReducer, followsReducer,
         populateBlockReducer, securityResetReducer, forgotPasswordReducer,
        chatHuntReducer, followersReducer, followingReducer} from './profileReducer';
 import {convosReducer} from './convosReducer';
 import {convoStateReducer} from './stateReducers.js';
 import {messagesReducer} from './messagesReducer';
 import {tagsReducer} from './tagsReducer';
 import {socketReducer} from './socketReducer'; 
 import {notificationsReducer} from './notificationsReducer';
 import {reviewsReducer} from './reviewsReducer';
 import {walletReducer} from './walletReducer';
 import {tipsReducer} from './tipsReducer';
 import {deleteAccountReducer} from './deleteAccountReducer';
 import {headSearchReducer} from './searchReducer';
 import { messagesOpenedReducer,
       reviewsOpenedReducer, tipDiaryOpenedReducer, 
         tipReviewOpenedReducer} from './openedCheckReducer';
 
    export default combineReducers({ 

      diariesReducer, visitedDiariesReducer, savedDiariesReducer, usersDiariesReducer,
      randomDiariesReducer, popularDiariesReducer, 
      convoStateReducer, googleauthReducer,
      profileResetReducer, getMiniProfileReducer,
      hallFameReducer, convosReducer, messagesReducer,
      socketReducer, deleteAccountReducer,
      notificationsReducer, reviewsReducer, tipsReducer, followsReducer,
      chatHuntReducer,followersReducer,followingReducer,
      blockReducer, populateBlockReducer, securityResetReducer,
      forgotPasswordReducer,headSearchReducer,
       messagesOpenedReducer, 
      reviewsOpenedReducer, tipDiaryOpenedReducer,
       tipReviewOpenedReducer, tagsReducer, walletReducer,
       
    });  