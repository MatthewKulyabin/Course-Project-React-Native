import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export const EditStepScreen = ({navigation}) => {
	const editTask = () => {
		navigation.navigate('Edit Task');
	};
	
	return (
		<View style={styles.center}>
			<Text>EditStepScreen</Text>
			<Button title="Edit Task" onPress={editTask} />
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

