import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {useSelector} from 'react-redux';

import {THEME} from '../theme';

export const EditProgramScreen = ({navigation, route}) => {
	const {title, setTittle} = useState('');
	const {description, setDescription} = useState('');

	// Make useSelector

	if (route.params) {
		const programId = route.params.programId;
		console.log(route.params);
	}
	
	const editStep = () => {
		navigation.navigate('Edit Step');
	};

	return (
		<View style={styles.center}>
			<TextInput
				style={styles.title}
				placeholder="Enter Title of Program"
				value={title}
				onChange={setTittle}
			/>
			<TextInput
				style={styles.description}
				placeholder="Description"
				value={description}
				onChange={setDescription}
				multiline
			/>
			<Button title="Edit Step" onPress={editStep} color={THEME.MAIN_COLOR} />
		</View>
	);
};

const textStyle = {
	padding: 10,
	marginBottom: 10,
	color: '#000',
	fontFamily: 'code-black',
	borderWidth: 2,
	borderColor: THEME.MAIN_COLOR,
};

const styles = StyleSheet.create({
	center: {
		flex: 1,
		padding: 10,
	},
	title: {
		...textStyle,
	},
	description: {
		...textStyle,
	},
});

