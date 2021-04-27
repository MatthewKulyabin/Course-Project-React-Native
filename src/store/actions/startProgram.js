import {
  DECREASE_TIME,
  LOAD_START,
  LOAD_PROGRAM,
  DELETE_STEP,
  DELETE_TASK,
} from '../types';

export const loadProgram = (program) => {
  return {
    type: LOAD_PROGRAM,
    payload: program,
  };
};

export const decreaseTime = (stepId, taskId) => {
  return {
    type: DECREASE_TIME,
    payload: { stepId, taskId },
  };
};

export const deleteStep = (stepId) => {
  return {
    type: DELETE_STEP,
    payload: { stepId },
  };
};

export const deleteTask = (stepId, taskId) => {
  return {
    type: DELETE_TASK,
    payload: { stepId, taskId },
  };
};
