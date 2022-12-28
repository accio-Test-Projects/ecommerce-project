import { combineReducers } from 'redux';
import * as actionTypes from '../actions';
import UserDataReducer from './UserDataReducer';
import OpenReducer from './OpenReducer';
const appReducer = combineReducers({
	userData: UserDataReducer,
	// userData;{
	// uerInfo:{username:"",email:""..etc}
	// }
	openToAllData:OpenReducer
});

const rootReducer = (state, action) => {
	if (action.type === actionTypes.LOGOUT) {
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

export default rootReducer;
