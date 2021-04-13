import {
  LOAD_PROGRAMS,
  ADD_PROGRAM,
  EDIT_PROGRAM,
  ADD_STEP,
  ADD_TASK,
  EDIT_STEP,
  EDIT_TASK,
} from '../types';

const initialState = {
  programs: [],
};

export const programReducer = (state = initialState, action) => {
  switch (action.type) {
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
      const programToEdit = state.programs.find(
        (program) => program.id === action.payload.programId
      );
      programToEdit.title = action.payload.title;
      programToEdit.description = action.payload.description;
      return {
        ...state,
      };
    case ADD_STEP:
      state.programs
        .find((p) => p.id === action.payload.programId)
        .steps.push(action.payload.step);
      return {
        ...state,
      };
    case EDIT_STEP:
      const stepToEdit = state.programs
        .find((program) => program.id === action.payload.programId)
        .steps.find((s) => s.id === action.payload.stepId);
      stepToEdit.title = action.payload.title;
      stepToEdit.description = action.payload.description;
      return {
        ...state,
      };
    case ADD_TASK:
      state.programs
        .find((p) => p.id === action.payload.programId)
        .steps.find((s) => s.id === action.payload.stepId)
        .tasks.push(action.payload.task);
      return {
        ...state,
      };
    case EDIT_TASK:
      const taskToEdit = state.programs
        .find((p) => p.id === action.payload.programId)
        .steps.find((s) => s.id === action.payload.stepId)
        .tasks.find((t) => t.id === action.payload.taskId);
      taskToEdit.title = action.payload.title;
      taskToEdit.description = action.payload.description;
      return {
        ...state,
      };
    default:
      return state;
  }
};
