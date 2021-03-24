import React from 'react';
import {useSelector} from 'react-redux';

import {DetailList} from '../components/DetailList';
import {Icon} from '../components/Icon';

export const ProgramScreen = ({navigation, route}) => {
	const programId = route.params.programId;
	const program = useSelector(state => (
		state.program.programs
			.find(program => program.id === programId)
		)
	)
	const steps = program.steps;

	const start = () => {
		navigation.navigate('Start');
	};

	const openStepHandler = step => {
		navigation.navigate('Step', {
			programId: programId,
			stepId: step.id,
			stepTitle: step.title,
		});
	};

	return (
		<DetailList
			data={steps}
			onOpen={openStepHandler}
			onPress={start}
			description={program.description}
		/>
	);
};

ProgramScreen.options = ({navigation, route}) => {
	const {programId, programTitle} = route.params;

	return {
		title: programTitle,
		headerTitleStyle: {
			fontFamily: 'code-black',
		},
		headerRight: () => {
			return (
				<Icon
					title="Toggle Drawer"
					iconName="ios-create-outline"
					onPress={() => navigation.navigate('EditProgram', {
						programId,
						edit: true,
					})}
				/>
			);
		},
	};
};
