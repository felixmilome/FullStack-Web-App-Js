 import {combineReducers} from 'redux';

 import {diariesReducer} from './diariesReducer';
 import {googleauthReducer} from './googleauthReducer';
 import {dpReducer, getMiniProfileReducer} from './profileReducer';

 export default combineReducers({
    diariesReducer, googleauthReducer, dpReducer, getMiniProfileReducer
 });