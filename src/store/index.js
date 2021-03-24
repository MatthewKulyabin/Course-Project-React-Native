import {createStore, combineReducers} from 'redux';
import {programReducer} from './reducers/program';

const rootReducer = combineReducers({
	program: programReducer,
});

export default createStore(rootReducer);
