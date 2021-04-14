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

const initialState = {
  programs: [],
};

export const programReducer = (state = initialState, action) => {
  let programToEdit, stepToEdit, filtered;
  switch (action.type) {
    // Programs
    case LOAD_PROGRAMS:
      return {
        ...state,
        programs: action.payload,
      };
    case ADD_PROGRAM:
      return {
        ...state,
        programs: [...state.programs, action.payload],
      };
    case EDIT_PROGRAM:
      programToEdit = state.programs.find(
        (program) => program.id === action.payload.programId
      );
      programToEdit.title = '<P> ' + action.payload.title;
      programToEdit.description = action.payload.description;
      return {
        ...state,
      };
    case REMOVE_PROGRAM:
      console.log(state.programs, action.payload.programId);
      state.programs = state.programs.filter(
        (p) => p.id !== action.payload.programId
      );
      return {
        ...state,
      };
    // Steps
    case ADD_STEP:
      state.programs
        .find((p) => p.id === action.payload.programId)
        .steps.push(action.payload.step);
      return {
        ...state,
      };
    case EDIT_STEP:
      stepToEdit = state.programs
        .find((program) => program.id === action.payload.programId)
        .steps.find((s) => s.id === action.payload.stepId);
      stepToEdit.title = '<S> ' + action.payload.title;
      stepToEdit.description = action.payload.description;
      return {
        ...state,
      };
    case REMOVE_STEP:
      programToEdit = state.programs.find(
        (p) => p.id === action.payload.programId
      );
      filtered = programToEdit.steps.filter(
        (s) => s.id !== action.payload.stepId
      );
      programToEdit.steps = filtered;
      return {
        ...state,
      };
    // Tasks
    case ADD_TASK:
      state.programs
        .find((p) => p.id === action.payload.programId)
        .steps.find((s) => s.id === action.payload.stepId)
        .tasks.push(action.payload.task);
      return {
        ...state,
      };
    case EDIT_TASK:
      programToEdit = state.programs.find(
        (p) => p.id === action.payload.programId
      );
      stepToEdit = programToEdit.steps.find(
        (s) => s.id === action.payload.stepId
      );
      const taskToEdit = stepToEdit.tasks.find(
        (t) => t.id === action.payload.taskId
      );
      taskToEdit.title = '<T> ' + action.payload.title;
      taskToEdit.description = action.payload.description;
      taskToEdit.time = action.payload.time;
      stepToEdit.time = stepToEdit.tasks.reduce(
        (acc, cur) => acc + cur.time,
        0
      );
      programToEdit.time = programToEdit.steps.reduce(
        (acc, cur) => acc + cur.time,
        0
      );
      return {
        ...state,
      };
    case REMOVE_TASK:
      programToEdit = state.programs.find(
        (p) => p.id === action.payload.programId
      );
      stepToEdit = programToEdit.steps.find(
        (s) => s.id === action.payload.stepId
      );
      filtered = stepToEdit.tasks.filter((t) => t.id !== action.payload.taskId);
      stepToEdit.tasks = filtered;
      return {
        ...state,
      };
    default:
      return state;
  }
};
