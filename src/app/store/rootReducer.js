import {combineReducers} from 'redux';
import authReducer from '../../features/auth/authReducer';
import eventReducer from '../../features/events/eventReducer';
import testReducer from '../../features/sandbox/testReducer';
import asyncReducer from '../async/asyncReducer';
import modalReducer from '../common/modals/modalReducer';
import profileReducer from '../../features/profiles/profileReducer';

const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    profile: profileReducer
})

export default rootReducer;