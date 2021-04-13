import {
  LOAD_PROGRAMS,
  ADD_PROGRAM,
  EDIT_PROGRAM,
  ADD_STEP,
  ADD_TASK,
  EDIT_STEP,
  EDIT_TASK,
} from '../types';
import { DATA } from '../../data';

export const loadPrograms = () => {
  return {
    type: LOAD_PROGRAMS,
    payload: DATA,
  };
};

export const addProgram = (program) => {
  return {
    type: ADD_PROGRAM,
    payload: program,
  };
};

export const editProgram = ({ title, description, programId }) => {
  return {
    type: EDIT_PROGRAM,
    payload: { title, description, programId },
  };
};

export const addStep = (step, programId) => {
  return {
    type: ADD_STEP,
    payload: { step, programId },
  };
};

export const editStep = ({ title, description, programId, stepId }) => {
  return {
    type: EDIT_STEP,
    payload: { title, description, programId, stepId },
  };
};

export const addTask = (task, programId, stepId) => {
  return {
    type: ADD_TASK,
    payload: { task, programId, stepId },
  };
};

export const editTask = ({ title, description, programId, stepId, taskId }) => {
  return {
    type: EDIT_TASK,
    payload: { title, description, programId, stepId, taskId },
  };
};
