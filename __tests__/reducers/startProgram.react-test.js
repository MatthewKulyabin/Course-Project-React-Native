import { startProgramReducer } from '../../src/store/reducers/startProgram';
import {
  DECREASE_TIME,
  DELETE_STEP,
  DELETE_TASK,
  LOAD_PROGRAM,
} from '../../src/store/types';

describe('Start Program Reducer', () => {
  const state = {
    program: {
      id: 1,
      title: '<P> Title',
      description: 'Program Description',
      time: 0,
      steps: [
        {
          id: 1,
          title: '<S> Title',
          description: 'Step Description',
          time: 0,
          tasks: [
            {
              id: 1,
              title: '<T> Title',
              description: 'Task Description',
              time: 1,
            },
          ],
        },
      ],
    },
  };
  it('loading program for start', () => {
    expect(
      startProgramReducer(state, {
        type: LOAD_PROGRAM,
        payload: state.program,
      })
    ).toEqual(state);
  });

  it('decrease time', () => {
    const payload = {
      stepId: 1,
      taskId: 1,
    };
    expect(
      startProgramReducer(state, { type: DECREASE_TIME, payload })
    ).toEqual({
      program: {
        ...state.program,
        steps: [
          {
            ...state.program.steps[0],
            tasks: [{ ...state.program.steps[0].tasks[0], time: 0 }],
          },
        ],
      },
    });
  });

  it('deleting task', () => {
    const payload = { stepId: 1, taskId: 1 };
    expect(
      startProgramReducer(state, {
        type: DELETE_TASK,
        payload,
      })
    ).toEqual({
      program: {
        ...state.program,
        steps: [{ ...state.program.steps[0], tasks: [] }],
      },
    });
  });

  it('deleting step', () => {
    const payload = { stepId: 1 };
    expect(
      startProgramReducer(state, {
        type: DELETE_STEP,
        payload,
      })
    ).toEqual({
      program: {
        ...state.program,
        steps: [],
      },
    });
  });
});
