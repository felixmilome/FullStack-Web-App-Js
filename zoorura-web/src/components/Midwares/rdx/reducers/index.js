 import {combineReducers} from 'redux';

 import {diariesReducer} from './diariesReducer';
 import {googleauthReducer} from './googleauthReducer';

 export default combineReducers({
    diariesReducer, googleauthReducer
 });