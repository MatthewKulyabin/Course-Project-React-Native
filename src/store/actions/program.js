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
import { DB } from '../../db';

// Programs
export const loadPrograms = () => async (dispatch) => {
  const programs = await DB.getFromTable('programs');
  // console.log(programs);
  // const steps = [];
  const steps = await DB.getFromTable('steps');
  console.log(steps);
  // const tasks = [];
  const tasks = await DB.getFromTable('tasks');
  console.log(tasks);
  steps.map((s) => {
    const stepId = s.id;
    return (s.tasks = tasks.filter((t) => t.step_id === stepId));
  });
  programs.map((p) => {
    const programId = p.id;
    return (p.steps = steps.filter((s) => s.program_id === programId));
  });
  console.log('programs from loadPrograms: ', programs);
  dispatch({
    type: LOAD_PROGRAMS,
    payload: programs,
  });
};

export const addProgram = (program) => async (dispatch) => {
  const id = await DB.createProgram(program);
  console.log('Adding Program');

  const payload = { ...program, id };

  dispatch({
    type: ADD_PROGRAM,
    payload,
  });
};

export const editProgram = ({ title, description, programId }) => {
  return {
    type: EDIT_PROGRAM,
    payload: { title, description, programId },
  };
};

export const removeProgram = ({ programId }) => async (dispatch) => {
  await DB.deleteProgram(programId);

  dispatch({
    type: REMOVE_PROGRAM,
    payload: { programId },
  });
};

// Steps
export const addStep = (step, programId) => async (dispatch) => {
  const id = await DB.createStep({ ...step, programId });
  step.id = id;

  dispatch({
    type: ADD_STEP,
    payload: { step, programId },
    // Параша из-за ...steps
  });
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
export const addTask = (task, programId, stepId) => async (dispatch) => {
  // console.log(DB.createTask());
  console.log(stepId);
  const id = await DB.createTask({ ...task, programId, stepId });
  task.id = id;

  dispatch({
    type: ADD_TASK,
    payload: { task, programId, stepId },
  });
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
    payload: { title, description, time: time, programId, stepId, taskId },
  };
};

export const removeTask = ({ programId, stepId, taskId }) => {
  return {
    type: REMOVE_TASK,
    payload: { programId, stepId, taskId },
  };
};
