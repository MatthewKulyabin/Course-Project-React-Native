import {LOAD_PROGRAMS} from '../types';
import {DATA} from '../../data';

export const loadPrograms = () => {
	return {
		type: LOAD_PROGRAMS,
		payload: DATA,
	};
};

export const createProgram = program => {
	return {
		type: CREATE_PROGRAM,
		payload: {},
	};
};
