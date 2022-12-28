import * as actionTypes from '../actions';

const initialState = { userInfo: {} };
const UserDataReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case actionTypes.GET_USER_SUCCESS:
			newState = {
				...state,
				userInfo: action.userInfo, //{username,"",email:""..etc}
			};
			break;
		default:
			return state;
	}
	return newState;
};

export default UserDataReducer;
