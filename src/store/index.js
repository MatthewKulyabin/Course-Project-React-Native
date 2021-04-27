import { createStore, combineReducers } from 'redux';
import { programReducer } from './reducers/program';
import { startProgramReducer } from './reducers/startProgram';

const rootReducer = combineReducers({
  program: programReducer,
  startProgram: startProgramReducer,
});

export default createStore(rootReducer);
