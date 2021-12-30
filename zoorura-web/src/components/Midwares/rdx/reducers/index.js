 import {combineReducers} from 'redux';

 import {diariesReducer} from './diariesReducer';
 import {googleauthReducer} from './googleauthReducer';
 import {profileReducer} from './profileReducer';

 export default combineReducers({
    diariesReducer, googleauthReducer, profileReducer
 });