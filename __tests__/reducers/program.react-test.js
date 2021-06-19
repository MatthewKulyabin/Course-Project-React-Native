import { programReducer } from '../../src/store/reducers/program';
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
} from '../../src/store/types';

describe('LOAD & default', () => {
  it('has a default state', () => {
    expect(programReducer(undefined, { type: 'unexpected' })).toEqual({
      programs: [],
    });
  });

  it('loading programs', () => {
    const payload = {
      programs: [
        {
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
                  time: 0,
                },
              ],
            },
          ],
        },
      ],
    };
    expect(
      programReducer(undefined, {
        type: LOAD_PROGRAMS,
        payload,
      })
    ).toEqual({ programs: payload });
  });
});

describe('PROGRAMS', () => {
  const state = {
    programs: [
      {
        id: 1,
        title: '<P> Title',
        description: 'Program Description',
        time: 0,
        steps: [],
      },
    ],
  };
  it('adding new program', () => {
    const payload = state.programs[0];
    expect(programReducer(undefined, { type: ADD_PROGRAM, payload })).toEqual({
      programs: [payload],
    });
  });

  it('editting program', () => {
    const newProgramTitle = 'New Program Title';
    const newProgramDescription = 'New Program Description';
    const payload = {
      programId: 1,
      title: newProgramTitle,
      description: newProgramDescription,
    };
    expect(programReducer(state, { type: EDIT_PROGRAM, payload })).toEqual({
      programs: [
        {
          ...state.programs[0],
          title: newProgramTitle,
          description: newProgramDescription,
        },
      ],
    });
  });

  it('removing program', () => {
    const payload = {
      programId: 1,
    };
    expect(programReducer(state, { type: REMOVE_PROGRAM, payload })).toEqual({
      programs: [],
    });
  });
});

describe('STEPS', () => {
  const state = {
    programs: [
      {
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
            tasks: [],
          },
        ],
      },
    ],
  };
  it('adding new step', () => {
    state.programs[0].steps = [];
    const payload = {
      step: {
        id: 1,
        title: '<S> Title',
        description: 'Step Description',
        time: 0,
        tasks: [],
      },
      programId: 1,
    };
    expect(programReducer(state, { type: ADD_STEP, payload })).toEqual({
      programs: [
        {
          ...state.programs[0],
          steps: [payload.step],
        },
      ],
    });
  });

  it('editting step', () => {
    const newStepTitle = 'New Step Title';
    const newStepDescription = 'New Step Description';
    const payload = {
      programId: 1,
      stepId: 1,
      title: newStepTitle,
      description: newStepDescription,
    };
    expect(programReducer(state, { type: EDIT_STEP, payload })).toEqual({
      programs: [
        {
          ...state.programs[0],
          steps: [
            {
              ...state.programs[0].steps[0],
              title: newStepTitle,
              description: newStepDescription,
            },
          ],
        },
      ],
    });
  });

  it('removing step', () => {
    const payload = {
      programId: 1,
      stepId: 1,
    };
    expect(programReducer(state, { type: REMOVE_STEP, payload })).toEqual({
      programs: [{ ...state.programs[0], steps: [] }],
    });
  });
});

describe('TASKS', () => {
  const state = {
    programs: [
      {
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
                time: 0,
              },
            ],
          },
        ],
      },
    ],
  };

  it('adding new task', () => {
    state.programs[0].steps[0].tasks = [];
    const payload = {
      task: {
        id: 1,
        title: '<T> Title',
        description: 'Task Description',
        time: 0,
      },
      programId: 1,
      stepId: 1,
    };
    expect(programReducer(state, { type: ADD_TASK, payload })).toEqual({
      programs: [
        {
          ...state.programs[0],
          steps: [
            {
              ...state.programs[0].steps[0],
              tasks: [payload.task],
            },
          ],
        },
      ],
    });
  });

  it('editing', () => {
    const newTaskTitle = 'New Task Title';
    const newTaskDescription = 'New Task Description';
    const payload = {
      programId: 1,
      stepId: 1,
      taskId: 1,
      title: newTaskTitle,
      description: newTaskDescription,
      time: 10,
    };
    expect(programReducer(state, { type: EDIT_TASK, payload })).toEqual({
      programs: [
        {
          ...state.programs[0],
          time: 10,
          steps: [
            {
              ...state.programs[0].steps[0],
              time: 10,
              tasks: [
                {
                  ...state.programs[0].steps[0].tasks[0],
                  title: newTaskTitle,
                  description: newTaskDescription,
                  time: 10,
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it('removing task', () => {
    const payload = {
      programId: 1,
      stepId: 1,
      taskId: 1,
    };
    expect(programReducer(state, { type: REMOVE_TASK, payload })).toEqual({
      programs: [
        {
          ...state.programs[0],
          steps: [{ ...state.programs[0].steps[0], tasks: [] }],
        },
      ],
    });
  });
});
