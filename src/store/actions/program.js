import {
  LOAD_PROGRAMS,
  ADD_PROGRAM,
  EDIT_PROGRAM,
  ADD_STEP,
  ADD_TASK,
  EDIT_STEP,
  EDIT_TASK,
  REMOVE_PROGRAM,
  REMOVE_STEP,
  REMOVE_TASK,
} from '../types';
import { DATA } from '../../data';

// Programs
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

export const removeProgram = ({ programId }) => {
  return {
    type: REMOVE_PROGRAM,
    payload: { programId },
  };
};

// Steps
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

export const removeStep = ({ stepId, programId }) => {
  return {
    type: REMOVE_STEP,
    payload: { stepId, programId },
  };
};

// Tasks
export const addTask = (task, programId, stepId) => {
  return {
    type: ADD_TASK,
    payload: { task, programId, stepId },
  };
};

export const editTask = ({
  title,
  description,
  time,
  programId,
  stepId,
  taskId,
}) => {
  return {
    type: EDIT_TASK,
    payload: { title, description, time, programId, stepId, taskId },
  };
};

export const removeTask = ({ programId, stepId, taskId }) => {
  return {
    type: REMOVE_TASK,
    payload: { programId, stepId, taskId },
  };
};
