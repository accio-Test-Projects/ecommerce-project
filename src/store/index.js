/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { createSlice, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';

const logger = (store) => (next) => (action) => {
	if (process.env.NODE_ENV != 'production') {
		console.group(action.type);
		console.info('dispatching', action);
	}
	const result = next(action);
	if (process.env.NODE_ENV != 'production') {
		console.log('next state', store.getState());
		console.groupEnd();
	}

	return result;
};


let store = configureStore({
	reducer: rootReducer,
	middleware: [logger],
});


export default store;
