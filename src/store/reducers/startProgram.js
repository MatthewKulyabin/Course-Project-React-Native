import {
  DECREASE_TIME,
  DELETE_STEP,
  DELETE_TASK,
  LOAD_PROGRAM,
  REMOVE_STEP,
  REMOVE_TASK,
  START_PROGRAM,
} from '../types';

const initialState = {
  program: null,
};

export const startProgramReducer = (state = initialState, action) => {
  let taskToChange,
    stepToChange,
    taskTime = null;
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
      // // console.log('taskToChange', taskToChange);
      // if (!stepToChange.tasks.length) {
      //   console.log('Tasks are up');
      //   stepToChange = state.program.steps.filter(
      //     (s) => s.id !== action.payload.stepId
      //   );
      //   return {
      //     ...state,
      //   };
      // } else if (taskToChange.time <= 0) {
      //   console.log('Time is up');
      //   stepToChange.tasks = stepToChange.tasks.filter(
      //     (t) => t.id !== action.payload.taskId
      //   );
      //   console.log(state.program);
      //   return {
      //     ...state,
      //   };
      // } else {
      //
      // }
      --taskToChange.time;
      return {
        ...state,
      };
    case DELETE_STEP:
      state.program.steps = state.program.steps.filter(
        (s) => s.id !== action.payload.stepId
      );
      console.log('remove_step');
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
      console.log('remove_task');
      return {
        ...state,
      };
    default:
      return state;
  }
};
