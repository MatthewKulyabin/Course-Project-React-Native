import React from 'react';
import {useSelector} from 'react-redux';

import {DetailList} from '../components/DetailList';
import {Icon} from '../components/Icon';

export const StepScreen = ({navigation, route}) => {
	const {programId, stepId} = route.params;

	const step = useSelector(state => (
		state.program.programs
			.find(program => program.id === programId).steps
			.find(step => step.id === stepId)
	));

	const tasks = step.tasks;

	const start = () => {
		navigation.navigate('Start');
	};

	const openTaskHandler = task => {
		navigation.navigate('Task', {
			programId,
			stepId: step.id,
			taskId: task.id,
			taskTitle: task.title,
		});
	};

	return (
		<DetailList
			data={tasks}
			onOpen={openTaskHandler}
			onPress={start}
			description={step.description}
		/>
	);
};

StepScreen.options = ({navigation, route}) => {
	const {stepTitle, programId, stepId} = route.params;

	return {
		title: stepTitle,
		headerTitleStyle: {
			fontFamily: 'code-black',
		},
		headerRight: () => {
			return (
				<Icon
					title="Toggle Drawer"
					iconName="ios-create-outline"
					onPress={() => navigation.navigate('EditStep', {
						programId,
						stepId,
						edit: true,
					})}
				/>
			);
		},
	};
};
