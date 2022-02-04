 import {combineReducers} from 'redux';

 import {diariesReducer} from './diariesReducer';
 import {googleauthReducer} from './googleauthReducer';
import { hallFameReducer } from './hallFameReducer';
 import {dpReducer, getMiniProfileReducer} from './profileReducer';
 import {convosReducer} from './convosReducer';
 import {messagesReducer} from './messagesReducer';
 import {socketReducer} from './socketReducer';
 import {notificationsReducer} from './notificationsReducer';

 export default combineReducers({
    diariesReducer, googleauthReducer, dpReducer, getMiniProfileReducer,
     hallFameReducer, convosReducer, messagesReducer, socketReducer, notificationsReducer
 }); 