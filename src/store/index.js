import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { programReducer } from './reducers/program';
import { startProgramReducer } from './reducers/startProgram';

const rootReducer = combineReducers({
  program: programReducer,
  startProgram: startProgramReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
