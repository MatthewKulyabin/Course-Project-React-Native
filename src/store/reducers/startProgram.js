import {
  DECREASE_TIME,
  DELETE_STEP,
  DELETE_TASK,
  LOAD_PROGRAM,
} from '../types';

const initialState = {
  program: null,
};

export const startProgramReducer = (state = initialState, action) => {
  let taskToChange, stepToChange;
  switch (action.type) {
    case LOAD_PROGRAM:
      state.program = action.payload;
      return {
        ...state,
      };
    case DECREASE_TIME:
      stepToChange = state.program.steps.find(
        (s) => s.id === action.payload.stepId
      );
      taskToChange = stepToChange.tasks.find(
        (t) => t.id === action.payload.taskId
      );
      --taskToChange.time;
      return {
        ...state,
      };
    case DELETE_STEP:
      state.program.steps = state.program.steps.filter(
        (s) => s.id !== action.payload.stepId
      );
      return {
        ...state,
      };
    case DELETE_TASK:
      stepToChange = state.program.steps.find(
        (s) => s.id === action.payload.stepId
      );
      stepToChange.tasks = stepToChange.tasks.filter(
        (t) => t.id !== action.payload.taskId
      );
      return {
        ...state,
      };
    default:
      return state;
  }
};
