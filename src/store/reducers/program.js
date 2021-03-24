import {LOAD_PROGRAMS} from '../types';

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
		default: return state;
	}
};
