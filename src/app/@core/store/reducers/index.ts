import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import sessionReducer from './session';
import userReducer from './user';
import messageReducer from './message';
//i18n: i18nReducer,
export const Reducers = combineReducers({

    sessionState: sessionReducer,
    userState: userReducer,
    messageState: messageReducer
});
