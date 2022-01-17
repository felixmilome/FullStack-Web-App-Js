 import {combineReducers} from 'redux';

 import {diariesReducer} from './diariesReducer';
 import {googleauthReducer} from './googleauthReducer';
import { hallFameReducer } from './hallFameReducer';
 import {dpReducer, getMiniProfileReducer} from './profileReducer';
 import {convosReducer} from './convosReducer';

 export default combineReducers({
    diariesReducer, googleauthReducer, dpReducer, getMiniProfileReducer, hallFameReducer, convosReducer
 });